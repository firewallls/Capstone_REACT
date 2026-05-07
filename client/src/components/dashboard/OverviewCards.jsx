import { Activity, GraduationCap, ShieldAlert, TrendingUp } from "lucide-react";
import { gradePoints } from "@/data/mock";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function OverviewCards({ subjects }) {
  const totalAtt = subjects.reduce((a, s) => a + s.attended, 0);
  const totalCls = subjects.reduce((a, s) => a + s.total, 0);
  const overall = (totalAtt / totalCls) * 100;
  const cgpa =
    subjects.reduce((a, s) => a + (gradePoints[s.marks.grade] ?? 0) * s.credits, 0) /
    subjects.reduce((a, s) => a + s.credits, 0);
  const atRisk = subjects.filter((s) => (s.attended / s.total) * 100 < s.threshold).length;

  const status = atRisk === 0 ? { label: "Safe", color: "emerald-500" } : atRisk <= 1 ? { label: "Warning", color: "amber-500" } : { label: "Critical", color: "destructive" };

  const cards = [
    { label: "Overall Attendance", value: `${overall.toFixed(1)}%`, sub: `${totalAtt}/${totalCls} classes`, icon: Activity, iconBg: "bg-primary/10 text-primary" },
    { label: "Current CGPA", value: cgpa.toFixed(2), sub: "out of 10.00", icon: GraduationCap, iconBg: "bg-emerald-500/10 text-emerald-500" },
    { label: "Risk Status", value: status.label, sub: `${atRisk} subject${atRisk !== 1 ? "s" : ""} at risk`, icon: ShieldAlert, iconBg: `bg-${status.color}/10 text-${status.color}` },
    { label: "Weekly Trend", value: "+2.4%", sub: "vs last week", icon: TrendingUp, iconBg: "bg-blue-500/10 text-blue-500" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card
          key={c.label}
          className="relative overflow-hidden border border-border shadow-sm transition-all hover:shadow-md group"
        >
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <span className="text-xs font-medium text-muted-foreground">{c.label}</span>
            <div className={cn("h-8 w-8 rounded-lg grid place-items-center", c.iconBg)}>
              <c.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{c.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
