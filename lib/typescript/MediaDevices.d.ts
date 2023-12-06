import { EventTarget, Event } from 'event-target-shim';
declare type MediaDevicesEventMap = {
    devicechange: Event<'devicechange'>;
};
export declare const AudioUsageAndroid: {
    USAGE_ALARM: number;
    USAGE_ASSISTANCE_ACCESSIBILITY: number;
    USAGE_ASSISTANCE_NAVIGATION_GUIDANCE: number;
    USAGE_ASSISTANCE_SONIFICATION: number;
    USAGE_ASSISTANT: number;
    USAGE_GAME: number;
    USAGE_MEDIA: number;
    USAGE_NOTIFICATION: number;
    USAGE_NOTIFICATION_COMMUNICATION_DELAYED: number;
    USAGE_NOTIFICATION_COMMUNICATION_INSTANT: number;
    USAGE_NOTIFICATION_COMMUNICATION_REQUEST: number;
    USAGE_NOTIFICATION_EVENT: number;
    USAGE_NOTIFICATION_RINGTONE: number;
    USAGE_UNKNOWN: number;
    USAGE_VOICE_COMMUNICATION: number;
    USAGE_VOICE_COMMUNICATION_SIGNALLING: number;
};
export declare const AvAudioSessionMode: {
    Default: number;
    GameChat: number;
    Measurement: number;
    MoviePlayback: number;
    SpokenAudio: number;
    VideoChat: number;
    VideoRecording: number;
    VoiceChat: number;
    VoicePrompt: number;
};
export declare const AvAudioSessionCategory: {
    Ambient: number;
    MultiRoute: number;
    PlayAndRecord: number;
    Playback: number;
    Record: number;
};
export declare const AvAudioSessionCategoryOptions: {
    MixWithOthers: number;
    DuckOthers: number;
    InterruptSpokenAudioAndMixWithOthers: number;
    AllowBluetooth: number;
    AllowBluetoothA2DP: number;
    AllowAirPlay: number;
    DefaultToSpeaker: number;
};
declare class MediaDevices extends EventTarget<MediaDevicesEventMap> {
    /**
     * W3C "Media Capture and Streams" compatible {@code enumerateDevices}
     * implementation.
     */
    enumerateDevices(): Promise<unknown>;
    /**
     * W3C "Screen Capture" compatible {@code getDisplayMedia} implementation.
     * See: https://w3c.github.io/mediacapture-screen-share/
     *
     * @returns {Promise}
     */
    getDisplayMedia(): Promise<import("./MediaStream").default>;
    /**
     * W3C "Media Capture and Streams" compatible {@code getUserMedia}
     * implementation.
     * See: https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-enumeratedevices
     *
     * @param {*} constraints
     * @returns {Promise}
     */
    getUserMedia(constraints: any): Promise<import("./MediaStream").default>;
    useAudioOutput(audioUsageAndroid: any, audioUsageIos: any): void;
}
declare const _default: MediaDevices;
export default _default;
