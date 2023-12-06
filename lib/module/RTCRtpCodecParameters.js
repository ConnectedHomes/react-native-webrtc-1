function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class RTCRtpCodecParameters {
  constructor(init) {
    _defineProperty(this, "payloadType", void 0);
    _defineProperty(this, "clockRate", void 0);
    _defineProperty(this, "mimeType", void 0);
    _defineProperty(this, "channels", void 0);
    _defineProperty(this, "sdpFmtpLine", void 0);
    this.payloadType = init.payloadType;
    this.clockRate = init.clockRate;
    this.mimeType = init.mimeType;
    this.channels = init.channels ? init.channels : null;
    this.sdpFmtpLine = init.sdpFmtpLine ? init.sdpFmtpLine : null;
    Object.freeze(this);
  }
  toJSON() {
    const obj = {
      payloadType: this.payloadType,
      clockRate: this.clockRate,
      mimeType: this.mimeType
    };
    if (this.channels !== null) {
      obj['channels'] = this.channels;
    }
    if (this.sdpFmtpLine !== null) {
      obj['sdpFmtpLine'] = this.sdpFmtpLine;
    }
    return obj;
  }
}
//# sourceMappingURL=RTCRtpCodecParameters.js.map