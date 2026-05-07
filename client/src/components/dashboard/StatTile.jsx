import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatTile({ label, value, sub, accent, trend }) {
  const accentMap = {
    primary: "text-primary bg-primary/10",
    safe: "text-emerald-500 bg-emerald-500/10",
    warning: "text-amber-500 bg-amber-500/10",
    critical: "text-destructive bg-destructive/10",
    rishiverse: "text-emerald-500 bg-emerald-500/10",
  };

  return (
    <Card className="relative overflow-hidden border border-border shadow-sm transition-all hover:shadow-md">
      <CardContent className="pt-5">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        <div className="flex items-baseline gap-2 mt-1">
          <div className="text-3xl font-bold tracking-tight tabular-nums">{value}</div>
          {trend !== undefined && (
            <span className={cn("inline-flex items-center text-[11px] font-semibold", trend >= 0 ? "text-emerald-500" : "text-destructive")}>
              {trend >= 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
              {Math.abs(trend).toFixed(1)}%
            </span>
          )}
        </div>
        {sub && <div className="text-[11px] text-muted-foreground mt-1 truncate">{sub}</div>}
      </CardContent>
    </Card>
  );
}
