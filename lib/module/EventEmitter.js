import { NativeModules, NativeEventEmitter } from 'react-native';
// @ts-ignore
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
const {
  WebRTCModule
} = NativeModules;

// This emitter is going to be used to listen to all the native events (once) and then
// re-emit them on a JS-only emitter.
const nativeEmitter = new NativeEventEmitter(WebRTCModule);
const NATIVE_EVENTS = ['peerConnectionSignalingStateChanged', 'peerConnectionStateChanged', 'peerConnectionOnRenegotiationNeeded', 'peerConnectionIceConnectionChanged', 'peerConnectionIceGatheringChanged', 'peerConnectionGotICECandidate', 'peerConnectionDidOpenDataChannel', 'peerConnectionOnRemoveTrack', 'peerConnectionOnTrack', 'dataChannelStateChanged', 'dataChannelReceiveMessage', 'dataChannelDidChangeBufferedAmount', 'mediaStreamTrackMuteChanged', 'mediaStreamTrackEnded'];
const eventEmitter = new EventEmitter();
export function setupNativeEvents() {
  for (const eventName of NATIVE_EVENTS) {
    nativeEmitter.addListener(eventName, (...args) => {
      eventEmitter.emit(eventName, ...args);
    });
  }
}
const _subscriptions = new Map();
export function addListener(listener, eventName, eventHandler) {
  var _subscriptions$get;
  if (!NATIVE_EVENTS.includes(eventName)) {
    throw new Error(`Invalid event: ${eventName}`);
  }
  if (!_subscriptions.has(listener)) {
    _subscriptions.set(listener, []);
  }
  (_subscriptions$get = _subscriptions.get(listener)) === null || _subscriptions$get === void 0 || _subscriptions$get.push(eventEmitter.addListener(eventName, eventHandler));
}
export function removeListener(listener) {
  var _subscriptions$get2;
  (_subscriptions$get2 = _subscriptions.get(listener)) === null || _subscriptions$get2 === void 0 || _subscriptions$get2.forEach(sub => {
    sub.remove();
  });
  _subscriptions.delete(listener);
}
//# sourceMappingURL=EventEmitter.js.map