import visuals from '@/assets/generated/visuals.json';
export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(visuals).map(name => ({ name })); }
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!Object.prototype.hasOwnProperty.call(visuals, name)) return new Response('Not found', { status: 404 });
  const body = new Uint8Array(Buffer.from(visuals[name as keyof typeof visuals], 'base64'));
  return new Response(body, { headers: { 'Content-Type': 'image/avif', 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } });
}
