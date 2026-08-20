import { NextRequest } from 'next/server';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';
import { verifyVideoToken } from '@/lib/video-token';

export const runtime = 'nodejs';

const ROOT = path.join(process.cwd(), 'private-media', 'hero');

const FILES: Record<string, { file: string; type: string }> = {
  mp4: { file: 'silvotech-hero.mp4', type: 'video/mp4' },
  webm: { file: 'silvotech-hero.webm', type: 'video/webm' },
  poster: { file: 'silvotech-hero-poster.jpg', type: 'image/jpeg' },
};

export async function GET(req: NextRequest) {
  const v = req.nextUrl.searchParams.get('v') ?? 'mp4';
  const t = req.nextUrl.searchParams.get('t');
  const spec = FILES[v];
  if (!spec || !verifyVideoToken(t)) {
    return new Response('Forbidden', { status: 403, headers: { 'Cache-Control': 'no-store' } });
  }

  const filePath = path.join(ROOT, spec.file);
  const fileStat = await stat(filePath).catch(() => null);
  if (!fileStat) {
    return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  const headers: Record<string, string> = {
    'Content-Type': spec.type,
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
    'Accept-Ranges': 'bytes',
  };

  const range = req.headers.get('range');
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    if (!m) {
      return new Response('Bad range', { status: 416, headers: { 'Content-Range': `bytes */${fileStat.size}` } });
    }
    let start = m[1] ? parseInt(m[1], 10) : 0;
    let end = m[2] ? parseInt(m[2], 10) : fileStat.size - 1;
    if (Number.isNaN(start) || Number.isNaN(end)) {
      return new Response('Bad range', { status: 416, headers: { 'Content-Range': `bytes */${fileStat.size}` } });
    }
    if (start > end || start >= fileStat.size) {
      return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${fileStat.size}` } });
    }
    end = Math.min(end, fileStat.size - 1);
    const stream = Readable.toWeb(createReadStream(filePath, { start, end })) as ReadableStream<Uint8Array>;
    headers['Content-Range'] = `bytes ${start}-${end}/${fileStat.size}`;
    headers['Content-Length'] = String(end - start + 1);
    return new Response(stream, { status: 206, headers });
  }

  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream<Uint8Array>;
  headers['Content-Length'] = String(fileStat.size);
  return new Response(stream, { status: 200, headers });
}