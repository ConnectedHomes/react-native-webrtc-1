function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class RTCSessionDescription {
  constructor(info = {
    type: null,
    sdp: ''
  }) {
    _defineProperty(this, "_sdp", void 0);
    _defineProperty(this, "_type", void 0);
    this._sdp = info.sdp;
    this._type = info.type;
  }
  get sdp() {
    return this._sdp;
  }
  get type() {
    return this._type;
  }
  toJSON() {
    return {
      sdp: this._sdp,
      type: this._type
    };
  }
}
//# sourceMappingURL=RTCSessionDescription.js.map