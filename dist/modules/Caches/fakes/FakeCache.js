"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeCache {
  constructor() {
    this.caches = {};
  }

  async save(key, value) {
    this.caches[key] = JSON.stringify(value);
  }

  async recover(key) {
    const data = this.caches[key];
    if (!data) return null;
    const paserdata = JSON.parse(data);
    return paserdata;
  }

  async invalidate(key) {
    delete this.caches[key];
  }

  async invalidatePrefix(prefix) {
    const caches = Object.keys(this.caches).filter(key => key.startsWith(prefix));
    caches.forEach(key => {
      delete this.caches[key];
    });
  }

}

exports.default = FakeCache;