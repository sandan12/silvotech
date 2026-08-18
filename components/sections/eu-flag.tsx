const star = (cx: number, cy: number, r: number) => {
  const inner = r * 0.382;
  const pts: string[] = [];
  for (let k = 0; k < 10; k++) {
    const ang = -Math.PI / 2 + (k * Math.PI) / 5;
    const rad = k % 2 === 0 ? r : inner;
    pts.push(`${(cx + rad * Math.cos(ang)).toFixed(2)},${(cy + rad * Math.sin(ang)).toFixed(2)}`);
  }
  return pts.join(' ');
};

export default function EUFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 810 540" className={className} aria-label="EU">
      <rect width="810" height="540" fill="#003399" />
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i} transform={`translate(405,270) rotate(${i * 30}) translate(0,-90)`}>
          <polygon points={star(0, 0, 15.9)} fill="#fc0" />
        </g>
      ))}
    </svg>
  );
}