import { Calculator, AlertTriangle, ShieldCheck } from "lucide-react";
import { PlatformBadge } from "./PlatformBadge";
import { Sparkline } from "./Sparkline";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const platformColors = { 
  newton: "#8b5cf6", // violet-500
  rishiverse: "#10b981", // emerald-500
  canvas: "#3b82f6" // blue-500
};

export function AttendanceCard({ subject }) {
  const pct = (subject.attended / subject.total) * 100;
  const setSelected = useDashboardStore((s) => s.setSelectedSubject);

  let bunks = 0;
  while ((subject.attended / (subject.total + bunks + 1)) * 100 >= subject.threshold) bunks++;

  const status = pct >= subject.threshold + 10 ? "safe" : pct >= subject.threshold ? "warning" : "critical";
  const statusMap = {
    safe: { icon: ShieldCheck, label: "Safe", cls: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    warning: { icon: AlertTriangle, label: "Watch", cls: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    critical: { icon: AlertTriangle, label: "At Risk", cls: "text-destructive bg-destructive/10 border-destructive/20" },
  };
  const S = statusMap[status];

  return (
    <Card className="border-border shadow-sm transition-all hover:shadow-md group">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <PlatformBadge platform={subject.platform} />
            <span className="text-[10px] text-muted-foreground font-mono">{subject.code}</span>
          </div>
          <h3 className="font-semibold tracking-tight text-base truncate">{subject.name}</h3>
        </div>
        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-semibold", S.cls)}>
          <S.icon className="h-3 w-3" /> {S.label}
        </span>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-3xl font-bold tracking-tight tabular-nums">{pct.toFixed(1)}%</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{subject.attended}/{subject.total} classes</div>
          </div>
          <div className="-mr-1">
            <Sparkline data={subject.trend} color={platformColors[subject.platform]} />
          </div>
        </div>

        <div className="relative h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full transition-all",
              status === "safe" && "bg-emerald-500",
              status === "warning" && "bg-amber-500",
              status === "critical" && "bg-destructive"
            )}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-px bg-foreground/40"
            style={{ left: `${subject.threshold}%` }}
            title={`Threshold ${subject.threshold}%`}
          />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-0 border-t-0 pb-5">
        <div className="text-[11px] text-muted-foreground">
          Safe to skip <span className="text-foreground font-semibold">{bunks}</span> · goal {subject.threshold}%
        </div>
        <button
          onClick={() => setSelected(subject.id)}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors group/btn"
        >
          <Calculator className="h-3 w-3" />
          Simulate
        </button>
      </CardFooter>
    </Card>
  );
}
