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
 * This event is fired whenever the RTCDataChannel send message.
 * @param {MESSAGE_EVENTS} type - The type of event.
 * @param {IMessageEventInitDict} eventInitDict - The event init properties.
 * @see
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/message_event#event_type MDN} for details.
 */
class MessageEvent extends _eventTargetShim.Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    /** @eventProperty */
    _defineProperty(this, "data", void 0);
    this.data = eventInitDict.data;
  }
}
exports.default = MessageEvent;
//# sourceMappingURL=MessageEvent.js.map