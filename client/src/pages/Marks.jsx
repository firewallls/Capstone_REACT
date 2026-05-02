import { useEffect } from "react";
import { GraduationCap, Trophy, Target, Sparkles } from "lucide-react";
import { MarksCard } from "@/components/dashboard/MarksCard";
import { StatTile } from "@/components/dashboard/StatTile";
import { gradePoints, subjects } from "@/data/mock";
import { PlatformBadge } from "@/components/dashboard/PlatformBadge";
import { useDashboardStore } from "@/store/useDashboardStore";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function Marks() {
  useEffect(() => { document.title = "Marks — Synapse"; }, []);
  const setSelected = useDashboardStore((s) => s.setSelectedSubject);

  const cgpa =
    subjects.reduce((a, s) => a + (gradePoints[s.marks.grade] ?? 0) * s.credits, 0) /
    subjects.reduce((a, s) => a + s.credits, 0);
  const top = [...subjects].sort((a, b) => b.marks.current - a.marks.current).slice(0, 3);
  const weakest = [...subjects].sort((a, b) => a.marks.current - b.marks.current)[0];

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8">
        <div className="relative flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary grid place-items-center shrink-0 shadow-sm">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-1.5">Marks</div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your CGPA, <span className="text-primary">decoded</span></h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">See what's pulling you up, what's dragging you down — and simulate the next exam.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm p-6">
          <div className="relative">
            <div className="text-xs font-medium text-muted-foreground">Current CGPA</div>
            <div className="flex items-baseline gap-2 mt-2">
              <div className="text-6xl font-extrabold tracking-tight text-primary">{cgpa.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">/ 10.00</div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-[11px] text-emerald-500">
              <Sparkles className="h-3 w-3" /> Trending up vs last sem
            </div>
          </div>
        </div>

        <div className="md:col-span-2 rounded-2xl bg-card border border-border shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-bold tracking-tight">Top performers</h3>
          </div>
          <div className="space-y-3">
            {top.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={cn(
                  "h-7 w-7 rounded-full grid place-items-center text-[11px] font-bold shrink-0",
                  i === 0 ? "bg-amber-500/20 text-amber-500" : i === 1 ? "bg-blue-500/20 text-blue-500" : "bg-secondary text-muted-foreground"
                )}>{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold truncate">{s.name}</span>
                    <PlatformBadge platform={s.platform} />
                  </div>
                  <div className="h-1.5 mt-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.marks.current}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold tabular-nums">{s.marks.current}</div>
                  <div className="text-[10px] text-muted-foreground">{s.marks.grade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {weakest && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-center gap-3">
          <Target className="h-4 w-4 text-amber-500 shrink-0" />
          <div className="flex-1 text-sm">
            <span className="font-semibold">{weakest.name}</span>{" "}
            <span className="text-muted-foreground">is your lowest at {weakest.marks.current}. Score 85+ next exam to bump it to A.</span>
          </div>
          <button onClick={() => setSelected(weakest.id)} className="text-xs font-semibold px-3 py-1.5 rounded-md bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 transition-colors">
            Simulate
          </button>
        </div>
      )}

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">All subjects</h2>
          <p className="text-sm text-muted-foreground">Tap a card to open the simulator.</p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {subjects.map((s) => <MarksCard key={s.id} subject={s} />)}
        </div>
      </section>
    </div>
  );
}