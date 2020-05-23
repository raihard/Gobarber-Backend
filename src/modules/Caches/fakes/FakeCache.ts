import ICaches from '../models/ICaches';

interface ICachesDTO {
  [key: string]: string;
}

export default class FakeCache implements ICaches {
  private caches: ICachesDTO = {};

  public async save(key: string, value: any): Promise<void> {
    this.caches[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.caches[key];

    if (!data) return null;

    const paserdata = JSON.parse(data);
    return paserdata as T;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.caches[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const caches = Object.keys(this.caches).filter(key =>
      key.startsWith(prefix),
    );

    caches.forEach(key => {
      delete this.caches[key];
    });
  }
}
