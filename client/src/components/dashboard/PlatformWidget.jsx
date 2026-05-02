import { Eye, EyeOff } from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PlatformWidget({ p }) {
  const toggle = useDashboardStore((s) => s.togglePlatform);
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
        <div className="text-2xl font-bold tracking-tight">{p.value}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{p.metric}</div>
        <div className="text-[11px] text-emerald-500 mt-2 font-medium">{p.delta}</div>
      </CardContent>
    </Card>
  );
}
