import { Eye, EyeOff } from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Heatmap from "@/components/ui/heatmap";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export function PlatformWidget({ p }) {
  const toggle = useDashboardStore((s) => s.togglePlatform);

  const heatmapData = useMemo(() => {
    const data = [];
    const end = new Date();
    const start = new Date();
    // 12 weeks for a longer heatmap
    start.setDate(end.getDate() - 84);
    
    let curr = new Date(start);
    while (curr <= end) {
      const dateStr = curr.toISOString().split("T")[0];
      const val = Math.floor(Math.random() * 10);
      data.push({ date: dateStr, value: val });
      curr.setDate(curr.getDate() + 1);
    }
    return data;
  }, [p.id]);

  const startDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 84);
    return d;
  }, []);

  const endDate = useMemo(() => new Date(), []);

  return (
    <Card
      className={cn(
        "relative overflow-hidden border border-border shadow-sm transition-all hover:shadow-md group",
        !p.visible && "opacity-45"
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <div className="text-xs font-medium text-muted-foreground">{p.name}</div>
          <div className="text-[10px] text-muted-foreground/70 font-mono">{p.username}</div>
        </div>
        <button
          onClick={() => toggle(p.id)}
          className="p-1.5 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
        >
          {p.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <div className="text-2xl font-bold tracking-tight">{p.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{p.metric}</div>
            <div className="text-[11px] text-emerald-500 mt-1 font-medium">{p.delta}</div>
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col items-end">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/40 mb-1.5 text-right w-full">Activity</div>
            <div className="w-full flex justify-end overflow-hidden">
                <Heatmap
                    data={heatmapData}
                    startDate={startDate}
                    endDate={endDate}
                    cellSize={6}
                    gap={1.5}
                    daysOfTheWeek="none"
                    showMonthLabels={false}
                    className="max-w-full"
                />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
