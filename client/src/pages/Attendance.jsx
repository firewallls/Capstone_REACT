import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Filter } from "lucide-react";
import { AttendanceCard } from "@/components/dashboard/AttendanceCard";
import { StatTile } from "@/components/dashboard/StatTile";
import { subjects , filters} from "@/data/mock";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function Attendance() {
  const [filter, setFilter] = useState("all");
  useEffect(() => { document.title = "Attendance — Synapse"; }, []);

  const filtered = useMemo(
    () => subjects.filter((s) => filter === "all" || s.platform === filter),
    [filter]
  );

  const overall =
    (filtered.reduce((a, s) => a + s.attended, 0) /
      Math.max(filtered.reduce((a, s) => a + s.total, 0), 1)) * 100;
  const atRisk = filtered.filter((s) => (s.attended / s.total) * 100 < s.threshold);
  const best = [...filtered].sort((a, b) => b.attended / b.total - a.attended / a.total)[0];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8">
        <div className="relative flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary grid place-items-center shrink-0 shadow-sm">
            <CalendarCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-1.5">Attendance</div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Stay <span className="text-primary">above the line</span></h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">Track every class, simulate skips, never get stuck below 75%.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatTile label="Overall" value={`${overall.toFixed(1)}%`} accent="primary" trend={+1.2} />
        <StatTile label="At Risk" value={String(atRisk.length)} accent={atRisk.length ? "critical" : "safe"} sub={atRisk.map(s=>s.code).join(" · ") || "All clear ✨"} />
        <StatTile label="Top Subject" value={best ? `${((best.attended/best.total)*100).toFixed(0)}%` : "—"} accent="rishiverse" sub={best?.name ?? ""} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        {filters.map((f) => (
          <button
            key={f.id}
            data-active={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold border border-border bg-secondary/40 text-muted-foreground transition-all",
              f.cls
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">{filtered.length} subjects</h2>
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Goal 75%</span>
          </div>
          <p className="text-sm text-muted-foreground">Tap simulate to project skips and see your headroom.</p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => <AttendanceCard key={s.id} subject={s} />)}
        </div>
      </section>
    </div>
  );
}