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
 * @brief This class Represents internal error happening on the native side as
 * part of asynchronous invocations to synchronous web APIs.
 */
class RTCErrorEvent extends _eventTargetShim.Event {
  constructor(type, func, message) {
    super(type);
    _defineProperty(this, "func", void 0);
    _defineProperty(this, "message", void 0);
    this.func = func;
    this.message = message;
  }
}
exports.default = RTCErrorEvent;
//# sourceMappingURL=RTCErrorEvent.js.map