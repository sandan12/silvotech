import 'server-only';
import { issueSignedToken, presignUrl } from '@vercel/blob';

export type HeroVideoSources = {
  mp4: string;
  webm: string;
  poster: string;
};

const PATHNAMES = {
  mp4: 'hero/silvotech-hero.mp4',
  webm: 'hero/silvotech-hero.webm',
  poster: 'hero/silvotech-hero-poster.jpg',
} as const;

/**
 * Signed URLs live well beyond the page's revalidate window, so a cached page
 * never hands out a URL that is about to expire.
 */
const URL_LIFETIME_MS = 6 * 24 * 60 * 60 * 1000;

async function signOne(pathname: string): Promise<string> {
  // Scoped per concrete pathname and to `get` only: a leaked URL cannot be
  // replayed against anything else in the store.
  const signed = await issueSignedToken({
    pathname,
    operations: ['get'],
    validUntil: Date.now() + URL_LIFETIME_MS,
  });

  const { presignedUrl } = await presignUrl(signed, {
    operation: 'get',
    pathname,
    access: 'private',
  });

  return presignedUrl;
}

/**
 * Presigned URLs for the hero clip in the private Blob store.
 *
 * Bytes are served straight off the Vercel CDN — including range requests for
 * seeking — instead of being streamed through a serverless function.
 *
 * Returns null when the Blob store is not configured, so a missing token
 * degrades to a plain colour hero rather than failing the build.
 */
export async function getHeroVideoSources(): Promise<HeroVideoSources | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn('[hero-video] BLOB_READ_WRITE_TOKEN is not set — hero video disabled');
    return null;
  }

  try {
    const [mp4, webm, poster] = await Promise.all([
      signOne(PATHNAMES.mp4),
      signOne(PATHNAMES.webm),
      signOne(PATHNAMES.poster),
    ]);
    return { mp4, webm, poster };
  } catch (error) {
    console.error('[hero-video] could not sign hero video URLs', error);
    return null;
  }
}
