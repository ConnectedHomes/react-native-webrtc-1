"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class RTCRtcpParameters {
  constructor(init) {
    _defineProperty(this, "cname", void 0);
    _defineProperty(this, "reducedSize", void 0);
    this.cname = init.cname;
    this.reducedSize = init.reducedSize;
    Object.freeze(this);
  }
  toJSON() {
    return {
      cname: this.cname,
      reducedSize: this.reducedSize
    };
  }
}
exports.default = RTCRtcpParameters;
//# sourceMappingURL=RTCRtcpParameters.js.map