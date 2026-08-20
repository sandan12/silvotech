import 'server-only';
import crypto from 'crypto';

const SECRET = process.env.VIDEO_TOKEN_SECRET || 'silvotech-hero-token-secret-9f4c2b7a';

const TTL_SECONDS = 24 * 3600;

export function signVideoToken(): string {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = `hero:${exp}`;
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  return `${exp}.${sig}`;
}

export function verifyVideoToken(token: string | null): boolean {
  if (!token) return false;
  const dot = token.indexOf('.');
  if (dot === -1) return false;
  const expStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = crypto
    .createHmac('sha256', SECRET)
    .update(`hero:${expStr}`)
    .digest('base64url');
  if (sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}