import { cn } from "@/lib/utils";

const map = {
  newton: { label: "Newton", cls: "bg-violet-500/15 text-violet-500 border-violet-500/30", dot: "bg-violet-500" },
  rishiverse: { label: "Rishiverse", cls: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30", dot: "bg-emerald-500" },
  canvas: { label: "Canvas", cls: "bg-blue-500/15 text-blue-500 border-blue-500/30", dot: "bg-blue-500" },
};

export function PlatformBadge({ platform, className }) {
  const m = map[platform];
  if (!m) return null;
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wider",
      m.cls, className
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full shadow-sm", m.dot)} />
      {m.label}
    </span>
  );
}
