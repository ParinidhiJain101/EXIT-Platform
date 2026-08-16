/**
 * PlaintextLocalStorageService — stores JSON in plaintext via window.localStorage.
 *
 * IMPORTANT: This adapter must NEVER be used to store survivor data, plan answers,
 * evidence, or any personal information. It is available as a utility for
 * non-sensitive feature flags or demonstration markers only.
 *
 * Use EncryptedLocalStorageService for any user-facing local persistence.
 */

import type { IStorageService } from './types';

export class PlaintextLocalStorageService implements IStorageService {
  async getItem<T>(key: string): Promise<T | null> {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}

/** Plaintext adapter. Do not use for survivor data. See class JSDoc. */
export const plaintextLocalStorage = new PlaintextLocalStorageService();
