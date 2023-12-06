"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventTargetShim = require("event-target-shim");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @eventClass
 * This event is fired whenever the icecandidate related RTC_EVENTS changed.
 * @type {RTCIceCandidateEvent} for icecandidate related.
 * @param {RTC_ICECANDIDATE_EVENTS} type - The type of event.
 * @param {IRTCDataChannelEventInitDict} eventInitDict - The event init properties.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection#events MDN} for details.
 */
class RTCIceCandidateEvent extends _eventTargetShim.Event {
  constructor(type, eventInitDict) {
    var _eventInitDict$candid;
    super(type, eventInitDict);
    /** @eventProperty */
    _defineProperty(this, "candidate", void 0);
    this.candidate = (_eventInitDict$candid = eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.candidate) !== null && _eventInitDict$candid !== void 0 ? _eventInitDict$candid : null;
  }
}
exports.default = RTCIceCandidateEvent;
//# sourceMappingURL=RTCIceCandidateEvent.js.map