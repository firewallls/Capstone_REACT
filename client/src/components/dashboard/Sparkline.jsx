export function Sparkline({ data, color }) {
  const w = 120, h = 32, p = 2;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = p + (i / (data.length - 1)) * (w - p * 2);
    const y = h - p - ((v - min) / range) * (h - p * 2);
    return `${x},${y}`;
  }).join(" ");
  const areaPts = `${p},${h} ${pts} ${w - p},${h}`;
  const id = `g-${color ? color.replace(/[^a-z0-9]/gi, "") : "default"}`;
  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color || "currentColor"} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color || "currentColor"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPts} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
