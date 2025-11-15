// utils/jwt.utils.ts
function base64UrlEncode(obj: any): string {
  const json = JSON.stringify(obj);
  const b64 = btoa(json); // base64 normal
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): any {
  // revert base64url -> base64
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // pad with '='
  while (str.length % 4) str += '=';
  const json = atob(str);
  return JSON.parse(json);
}

export function createFakeJWT(payload: Record<string, any>, expiresInSeconds = 60 * 60): string {
  const header = { alg: 'none', typ: 'JWT' }; // 'none' para pruebas (sin firma válida)
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const fullPayload = { ...payload, iat, exp };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(fullPayload);

  // Firma vacía para pruebas (no usar en prod)
  const signature = ''; // o base64UrlEncode({}) para mantener formato
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decodeJWT(token: string): null | any {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    return base64UrlDecode(parts[1]);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
}
