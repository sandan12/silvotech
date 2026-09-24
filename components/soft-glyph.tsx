export type GlyphKind = 'product' | 'factory' | 'layers' | 'quality' | 'logistics' | 'custom';

export default function SoftGlyph({ kind = 'product', size = 46 }: { kind?: GlyphKind; size?: number }) {
  const detail = {
    product: <><path d="M14 31c8-12 21-12 30 0"/><path d="M18 24c5-7 16-7 22 0"/></>,
    factory: <><path d="M15 39V25l9 5V20l9 6V14h10v25"/><path d="M13 39h32"/></>,
    layers: <><path d="m13 24 16-9 16 9-16 9-16-9Z"/><path d="m16 31 13 7 13-7"/></>,
    quality: <><path d="M29 13c5 5 10 5 15 6v9c0 9-6 15-15 19-9-4-15-10-15-19v-9c5-1 10-1 15-6Z"/><path d="m22 29 5 5 10-11"/></>,
    logistics: <><path d="M12 19h23v20H12z"/><path d="M35 26h7l5 7v6H35"/><circle cx="20" cy="41" r="3"/><circle cx="41" cy="41" r="3"/></>,
    custom: <><path d="M16 38c0-13 8-22 21-22"/><path d="M42 18c0 13-8 22-21 22"/><circle cx="39" cy="17" r="4"/><circle cx="19" cy="40" r="4"/></>,
  }[kind];
  return <span className={`soft-glyph soft-glyph-${kind}`} aria-hidden="true" style={{ width: size, height: size }}>
    <svg viewBox="0 0 58 58" fill="none" role="img">
      <path className="glyph-blob" d="M11 16C18 5 37 6 47 17c9 10 5 27-8 34-12 7-30 0-34-13-3-8 1-16 6-22Z"/>
      <g className="glyph-line" strokeLinecap="round" strokeLinejoin="round">{detail}</g>
    </svg>
  </span>;
}
