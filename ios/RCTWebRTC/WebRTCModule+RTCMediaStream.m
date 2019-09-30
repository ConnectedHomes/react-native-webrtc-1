//
//  WebRTCModule+RTCMediaStream.m
//
//  Created by one on 2015/9/24.
//  Copyright © 2015 One. All rights reserved.
//

#import <objc/runtime.h>

#import <WebRTC/RTCCameraVideoCapturer.h>
#import <WebRTC/RTCVideoTrack.h>
#import <WebRTC/RTCMediaConstraints.h>
#import <WebRTC/RTCAudioSession.h>
#import <WebRTC/RTCAudioSessionConfiguration.h>

#import <React/RCTLog.h>
#import "RTCMediaStreamTrack+React.h"
#import "WebRTCModule+RTCPeerConnection.h"

@implementation WebRTCModule (RTCMediaStream)

#pragma mark - getUserMedia

/**
 * Initializes a new {@link RTCAudioTrack} which satisfies the given constraints.
 *
 * @param constraints The {@code MediaStreamConstraints} which the new
 * {@code RTCAudioTrack} instance is to satisfy.
 */
- (RTCAudioTrack *)createAudioTrack:(NSDictionary *)constraints {
  NSString *trackId = [[NSUUID UUID] UUIDString];
  RTCAudioTrack *audioTrack
    = [self.peerConnectionFactory audioTrackWithTrackId:trackId];
  return audioTrack;
}

/**
 * Initializes a new {@link RTCVideoTrack} which satisfies the given constraints.
 */
- (RTCVideoTrack *)createVideoTrack:(NSDictionary *)constraints {
  RTCVideoSource *videoSource = [self.peerConnectionFactory videoSource];

  NSString *trackUUID = [[NSUUID UUID] UUIDString];
  RTCVideoTrack *videoTrack = [self.peerConnectionFactory videoTrackWithSource:videoSource trackId:trackUUID];

#if !TARGET_IPHONE_SIMULATOR
  RTCCameraVideoCapturer *videoCapturer = [[RTCCameraVideoCapturer alloc] initWithDelegate:videoSource];
  VideoCaptureController *videoCaptureController
        = [[VideoCaptureController alloc] initWithCapturer:videoCapturer
                                            andConstraints:constraints[@"video"]];
  videoTrack.videoCaptureController = videoCaptureController;
  [videoCaptureController startCapture];
#endif

  return videoTrack;
}

- (NSString *)getAvSessionMode:(NSInteger) mode {
    switch(mode) {
        case 1: return AVAudioSessionModeDefault;
        case 2: return AVAudioSessionModeGameChat;
        case 3: return AVAudioSessionModeMeasurement;
        case 4: return AVAudioSessionModeMoviePlayback;
        case 5: return AVAudioSessionModeSpokenAudio;
        case 6: return AVAudioSessionModeVideoChat;
        case 7: return AVAudioSessionModeVideoRecording;
        case 8: return AVAudioSessionModeVoiceChat;
        case 9: if (@available(iOS 12.0, *)) {
            return AVAudioSessionModeVoicePrompt;
        } else {
            return AVAudioSessionModeDefault;
        }
        default: return AVAudioSessionModeDefault;
    }
}

- (NSString *)getAvSessionCategory:(NSInteger) category {
    switch(category) {
       case 1: return  AVAudioSessionCategoryAmbient;
       case 2: return  AVAudioSessionCategoryMultiRoute;
       case 3: return  AVAudioSessionCategoryPlayAndRecord;
       case 4: return  AVAudioSessionCategoryPlayback;
       case 5: return  AVAudioSessionCategoryRecord;
       case 6: return  AVAudioSessionCategorySoloAmbient;
       default: return AVAudioSessionCategoryPlayAndRecord;
    }
}

RCT_EXPORT_METHOD(useAudioOutput: (NSInteger)mode :(NSInteger) category :(NSUInteger) categoryOptions) {
    RTCAudioSessionConfiguration *configuration = [[RTCAudioSessionConfiguration alloc] init];

    configuration.mode = [self getAvSessionMode:mode];
    configuration.category = [self getAvSessionCategory:category];
    configuration.categoryOptions = categoryOptions;

    RTCAudioSession *session = [RTCAudioSession sharedInstance];
    [session lockForConfiguration];
    BOOL hasSucceeded = NO;
    NSError *error = nil;
    if (session.isActive) {
        hasSucceeded = [session setConfiguration:configuration error:&error];
    } else {
        hasSucceeded = [session setConfiguration:configuration
                                          active:YES
                                           error:&error];
    }
    if (!hasSucceeded) {
        RCTLog(@"Error setting configuration: %@", error.localizedDescription);
    }
    [session unlockForConfiguration];
}

/**
  * Implements {@code getUserMedia}. Note that at this point constraints have
  * been normalized and permissions have been granted. The constraints only
  * contain keys for which permissions have already been granted, that is,
  * if audio permission was not granted, there will be no "audio" key in
  * the constraints dictionary.
  */
RCT_EXPORT_METHOD(getUserMedia:(NSDictionary *)constraints
               successCallback:(RCTResponseSenderBlock)successCallback
                 errorCallback:(RCTResponseSenderBlock)errorCallback) {
  RTCAudioTrack *audioTrack = nil;
  RTCVideoTrack *videoTrack = nil;

  if (constraints[@"audio"]) {
      audioTrack = [self createAudioTrack:constraints];
  }
  if (constraints[@"video"]) {
      videoTrack = [self createVideoTrack:constraints];
  }

  if (audioTrack == nil && videoTrack == nil) {
    // Fail with DOMException with name AbortError as per:
    // https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-getusermedia
    errorCallback(@[ @"DOMException", @"AbortError" ]);
    return;
  }

  NSString *mediaStreamId = [[NSUUID UUID] UUIDString];
  RTCMediaStream *mediaStream
    = [self.peerConnectionFactory mediaStreamWithStreamId:mediaStreamId];
  NSMutableArray *tracks = [NSMutableArray array];

  for (RTCMediaStreamTrack *track in @[ audioTrack ? audioTrack : [NSNull null], videoTrack ? videoTrack : [NSNull null] ]) {
    if (track == [NSNull null]) {
      continue;
    }

    if ([track.kind isEqualToString:@"audio"]) {
      [mediaStream addAudioTrack:(RTCAudioTrack *)track];
    } else if([track.kind isEqualToString:@"video"]) {
      [mediaStream addVideoTrack:(RTCVideoTrack *)track];
    }

    NSString *trackId = track.trackId;

    self.localTracks[trackId] = track;
    [tracks addObject:@{
                        @"enabled": @(track.isEnabled),
                        @"id": trackId,
                        @"kind": track.kind,
                        @"label": trackId,
                        @"readyState": @"live",
                        @"remote": @(NO)
                        }];
  }

  self.localStreams[mediaStreamId] = mediaStream;
  successCallback(@[ mediaStreamId, tracks ]);
}

#pragma mark - Other stream related APIs

RCT_EXPORT_METHOD(enumerateDevices:(RCTResponseSenderBlock)callback)
{
    NSMutableArray *devices = [NSMutableArray array];
    AVCaptureDeviceDiscoverySession *videoevicesSession
        = [AVCaptureDeviceDiscoverySession discoverySessionWithDeviceTypes:@[ AVCaptureDeviceTypeBuiltInWideAngleCamera ]
                                                                 mediaType:AVMediaTypeVideo
                                                                  position:AVCaptureDevicePositionUnspecified];
    for (AVCaptureDevice *device in videoevicesSession.devices) {
        NSString *position = @"";
        if (device.position == AVCaptureDevicePositionBack) {
            position = @"environment";
        } else if (device.position == AVCaptureDevicePositionFront) {
            position = @"front";
        }
        [devices addObject:@{
                             @"facing": position,
                             @"deviceId": device.uniqueID,
                             @"groupId": @"",
                             @"label": device.localizedName,
                             @"kind": @"videoinput",
                             }];
    }
    AVCaptureDeviceDiscoverySession *audioDevicesSession
        = [AVCaptureDeviceDiscoverySession discoverySessionWithDeviceTypes:@[ AVCaptureDeviceTypeBuiltInMicrophone ]
                                                                 mediaType:AVMediaTypeAudio
                                                                  position:AVCaptureDevicePositionUnspecified];
    for (AVCaptureDevice *device in audioDevicesSession.devices) {
        [devices addObject:@{
                             @"deviceId": device.uniqueID,
                             @"groupId": @"",
                             @"label": device.localizedName,
                             @"kind": @"audioinput",
                             }];
    }
    callback(@[devices]);
}

RCT_EXPORT_METHOD(mediaStreamCreate:(nonnull NSString *)streamID)
{
    RTCMediaStream *mediaStream = [self.peerConnectionFactory mediaStreamWithStreamId:streamID];
    self.localStreams[streamID] = mediaStream;
}

RCT_EXPORT_METHOD(mediaStreamAddTrack:(nonnull NSString *)streamID : (nonnull NSString *)trackID)
{
    RTCMediaStream *mediaStream = self.localStreams[streamID];
    RTCMediaStreamTrack *track = self.localTracks[trackID];

    if (mediaStream && track) {
        if ([track.kind isEqualToString:@"audio"]) {
            [mediaStream addAudioTrack:(RTCAudioTrack *)track];
        } else if([track.kind isEqualToString:@"video"]) {
            [mediaStream addVideoTrack:(RTCVideoTrack *)track];
        }
    }
}

RCT_EXPORT_METHOD(mediaStreamRemoveTrack:(nonnull NSString *)streamID : (nonnull NSString *)trackID)
{
    RTCMediaStream *mediaStream = self.localStreams[streamID];
    RTCMediaStreamTrack *track = self.localTracks[trackID];

    if (mediaStream && track) {
        if ([track.kind isEqualToString:@"audio"]) {
            [mediaStream removeAudioTrack:(RTCAudioTrack *)track];
        } else if([track.kind isEqualToString:@"video"]) {
            [mediaStream removeVideoTrack:(RTCVideoTrack *)track];
        }
    }
}

RCT_EXPORT_METHOD(mediaStreamRelease:(nonnull NSString *)streamID)
{
  RTCMediaStream *stream = self.localStreams[streamID];
  if (stream) {
    for (RTCVideoTrack *track in stream.videoTracks) {
      track.isEnabled = NO;
      [track.videoCaptureController stopCapture];
      [self.localTracks removeObjectForKey:track.trackId];
    }
    for (RTCAudioTrack *track in stream.audioTracks) {
      track.isEnabled = NO;
      [self.localTracks removeObjectForKey:track.trackId];
    }
    [self.localStreams removeObjectForKey:streamID];
  }
}

RCT_EXPORT_METHOD(mediaStreamTrackRelease:(nonnull NSString *)trackID)
{
    RTCMediaStreamTrack *track = self.localTracks[trackID];
    if (track) {
        track.isEnabled = NO;
        [track.videoCaptureController stopCapture];
        [self.localTracks removeObjectForKey:trackID];
    }
}

RCT_EXPORT_METHOD(mediaStreamTrackSetEnabled:(nonnull NSString *)trackID : (BOOL)enabled)
{
  RTCMediaStreamTrack *track = [self trackForId:trackID];
  if (track) {
    track.isEnabled = enabled;
    if (track.videoCaptureController) {  // It could be a remote track!
      if (enabled) {
        [track.videoCaptureController startCapture];
      } else {
        [track.videoCaptureController stopCapture];
      }
    }
  }
}

RCT_EXPORT_METHOD(mediaStreamTrackSwitchCamera:(nonnull NSString *)trackID)
{
  RTCMediaStreamTrack *track = self.localTracks[trackID];
  if (track) {
    RTCVideoTrack *videoTrack = (RTCVideoTrack *)track;
    [videoTrack.videoCaptureController switchCamera];
  }
}

#pragma mark - Helpers

- (RTCMediaStreamTrack*)trackForId:(NSString*)trackId
{
  RTCMediaStreamTrack *track = self.localTracks[trackId];
  if (!track) {
    for (NSNumber *peerConnectionId in self.peerConnections) {
      RTCPeerConnection *peerConnection = self.peerConnections[peerConnectionId];
      track = peerConnection.remoteTracks[trackId];
      if (track) {
        break;
      }
    }
  }
  return track;
}

@end
