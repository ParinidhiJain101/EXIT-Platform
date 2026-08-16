import type { IStorageService } from './types';

export class MemoryStorageService implements IStorageService {
  private store = new Map<string, unknown>();

  async getItem<T>(key: string): Promise<T | null> {
    const item = this.store.get(key);
    return item !== undefined ? (item as T) : null;
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

export const memoryStorage = new MemoryStorageService();
