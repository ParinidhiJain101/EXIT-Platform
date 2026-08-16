/**
 * EncryptedLocalStorageService — Prototype browser-side encrypted storage.
 *
 * Implementation approach (prototype — suitable for MVP/hackathon):
 *   - Encryption: AES-GCM, 256-bit key, random 12-byte IV per write.
 *   - Key derivation: PBKDF2-SHA-256, 200 000 iterations over a
 *     passphrase supplied by the caller at construction time.
 *   - A random 16-byte salt is generated once per session and stored
 *     in memory only; the derived key is NOT persisted to localStorage.
 *   - Every stored value is: base64(salt):base64(iv):base64(ciphertext).
 *
 * Production-readiness gap (must be resolved before real survivor data):
 *   - The passphrase must come from the user (e.g. a PIN or strong password)
 *     and must never be stored in plaintext.
 *   - The salt must be persisted separately from the ciphertext in a
 *     production implementation to allow key re-derivation across sessions.
 *   - A production implementation requires independent security review.
 *
 * This class is exported for future use. SessionContext currently defaults
 * to MemoryStorageService (no persistence) for the MVP.
 */

import type { IStorageService } from './types';

const PBKDF2_ITERATIONS = 200_000;
const KEY_LENGTH = 256;
const IV_BYTES = 12;
const SALT_BYTES = 16;

function encodeBase64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function decodeBase64(str: string): ArrayBuffer {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  // Slice returns a proper ArrayBuffer (not ArrayBufferLike)
  return bytes.buffer.slice(0);
}

export class EncryptedLocalStorageService implements IStorageService {
  private readonly passphrase: string;
  /** Salt is generated fresh each session and held in memory only. */
  private readonly sessionSalt: ArrayBuffer;
  private derivedKey: CryptoKey | null = null;

  constructor(passphrase: string) {
    this.passphrase = passphrase;
    // crypto.getRandomValues returns Uint8Array<ArrayBufferLike>.
    // Slice to get a plain ArrayBuffer so Web Crypto APIs accept it.
    const raw = new Uint8Array(SALT_BYTES);
    crypto.getRandomValues(raw);
    this.sessionSalt = raw.buffer.slice(0);
  }

  private async getKey(): Promise<CryptoKey> {
    if (this.derivedKey) return this.derivedKey;

    const rawKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.passphrase),
      'PBKDF2',
      false,
      ['deriveKey'],
    );

    this.derivedKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: this.sessionSalt,
        iterations: PBKDF2_ITERATIONS,
        hash: 'SHA-256',
      },
      rawKey,
      { name: 'AES-GCM', length: KEY_LENGTH },
      false,
      ['encrypt', 'decrypt'],
    );

    return this.derivedKey;
  }

  private async encrypt(plaintext: string): Promise<string> {
    const key = await this.getKey();

    const ivRaw = new Uint8Array(IV_BYTES);
    crypto.getRandomValues(ivRaw);
    const iv = ivRaw.buffer.slice(0);

    const encoded = new TextEncoder().encode(plaintext);
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded,
    );

    const saltB64 = encodeBase64(this.sessionSalt);
    const ivB64 = encodeBase64(iv);
    const ctB64 = encodeBase64(ciphertext);
    return `${saltB64}:${ivB64}:${ctB64}`;
  }

  private async decrypt(stored: string): Promise<string | null> {
    const parts = stored.split(':');
    if (parts.length !== 3) return null;

    const [, ivB64, ctB64] = parts;
    // The stored salt is bound to the session key that encrypted the data.
    // Decryption succeeds only within the same session (prototype behaviour).

    const key = await this.getKey();
    const iv = decodeBase64(ivB64);
    const ct = decodeBase64(ctB64);

    try {
      const plain = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        ct,
      );
      return new TextDecoder().decode(plain);
    } catch {
      // Decryption failed: wrong session key or tampered data
      return null;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const plain = await this.decrypt(stored);
    if (!plain) return null;

    try {
      return JSON.parse(plain) as T;
    } catch {
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    const plain = JSON.stringify(value);
    const ciphertext = await this.encrypt(plain);
    localStorage.setItem(key, ciphertext);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
    // Invalidate the derived key so the next use generates a fresh one
    this.derivedKey = null;
  }
}
