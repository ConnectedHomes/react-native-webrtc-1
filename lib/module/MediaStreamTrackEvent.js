function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { Event } from 'event-target-shim';
/**
 * @eventClass
 * This event is fired whenever the MediaStreamTrack has changed in any way.
 * @param {MEDIA_STREAM_EVENTS} type - The type of event.
 * @param {IMediaStreamTrackEventInitDict} eventInitDict - The event init properties.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStream#events MDN} for details.
 */
export default class MediaStreamTrackEvent extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    /** @eventProperty */
    _defineProperty(this, "track", void 0);
    this.track = eventInitDict.track;
  }
}
//# sourceMappingURL=MediaStreamTrackEvent.js.map