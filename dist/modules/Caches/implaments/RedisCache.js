"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _cache = _interopRequireDefault(require("../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RedisCache {
  constructor() {
    this.redis = void 0;
    this.redis = new _ioredis.default(_cache.default.config.redis);
  }

  async save(key, value) {
    await this.redis.set(key, JSON.stringify(value));
  }

  async recover(key) {
    const data = await this.redis.get(key);
    if (!data) return null;
    const paserdata = JSON.parse(data);
    return paserdata;
  }

  async invalidate(key) {
    this.redis.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`${prefix}:*`);
    const pipeline = this.redis.pipeline();
    keys.forEach(key => {
      pipeline.del(key);
    });
    await pipeline.exec();
  }

}

exports.default = RedisCache;