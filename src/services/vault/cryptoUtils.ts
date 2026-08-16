/**
 * Client-side cryptographic utilities for AegisVault demo.
 * Uses Web Cryptography API (SubtleCrypto) for SHA-256 integrity and AES-GCM authenticated encryption.
 * Note: Prototype demonstration for hackathon evaluation.
 */

export async function computeSHA256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function generateDemoAESKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );
}

export async function encryptAESGCM(
  plaintext: string,
  key: CryptoKey,
): Promise<{ ciphertextBase64: string; ivHex: string }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    data,
  );

  const ciphertextArray = new Uint8Array(encryptedBuffer);
  let binaryString = '';
  for (let i = 0; i < ciphertextArray.length; i++) {
    binaryString += String.fromCharCode(ciphertextArray[i]);
  }
  const ciphertextBase64 = btoa(binaryString);

  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return { ciphertextBase64, ivHex };
}

export function simulateTamperPayload(originalContent: string): string {
  // Alter 1 character in the synthetic content to produce a mismatched integrity hash
  if (originalContent.length > 5) {
    return originalContent.slice(0, 4) + '[TAMPERED_BYTE_0xFF]' + originalContent.slice(5);
  }
  return originalContent + '_TAMPERED';
}
