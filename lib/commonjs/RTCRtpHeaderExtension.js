"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class RTCRtpHeaderExtension {
  constructor(init) {
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "uri", void 0);
    _defineProperty(this, "encrypted", void 0);
    this.id = init.id;
    this.uri = init.uri;
    this.encrypted = init.encrypted;
    Object.freeze(this);
  }
  toJSON() {
    return {
      id: this.id,
      uri: this.uri,
      encrypted: this.encrypted
    };
  }
}
exports.default = RTCRtpHeaderExtension;
//# sourceMappingURL=RTCRtpHeaderExtension.js.map