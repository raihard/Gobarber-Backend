import Redis, { Redis as RedisType } from 'ioredis';
import cacheConfig from '@config/cache';
import ICaches from '../models/ICaches';

export default class RedisCache implements ICaches {
  private redis: RedisType;

  constructor() {
    this.redis = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.redis.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);

    if (!data) return null;

    const paserdata = JSON.parse(data);
    return paserdata as T;
  }

  public async invalidate(key: string): Promise<void> {
    this.redis.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.redis.keys(`${prefix}:*`);

    const pipeline = this.redis.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
