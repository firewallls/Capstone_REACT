import { useEffect, useMemo, useState } from "react";
import { X, Calculator, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { scoreToGrade, gradePoints } from "@/data/mock";
import { PlatformBadge } from "@/components/dashboard/PlatformBadge";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SimulatorPanel({ subjects }) {
  const { simulatorOpen, setSimulatorOpen, selectedSubjectId, setSelectedSubject } = useDashboardStore();
  const subject = useMemo(() => subjects.find((s) => s.id === selectedSubjectId) ?? subjects[0], [subjects, selectedSubjectId]);

  const [skip, setSkip] = useState(0);
  const [nextScore, setNextScore] = useState(subject?.marks.current ?? 80);
  const [examWeight, setExamWeight] = useState(40);
  const [threshold, setThreshold] = useState(subject?.threshold ?? 75);

  useEffect(() => { 
    if (subject) {
      setSkip(0); 
      setNextScore(subject.marks.current); 
      setThreshold(subject.threshold);
    }
  }, [subject]);

  if (!subject) return null;

  const newAtt = subject.attended;
  const newTotal = subject.total + skip;
  const newPct = (newAtt / newTotal) * 100;
  const status = newPct >= threshold + 5 ? "safe" : newPct >= threshold ? "warning" : "critical";

  let maxBunk = 0;
  while ((subject.attended / (subject.total + maxBunk + 1)) * 100 >= threshold) maxBunk++;

  const projectedScore = Math.round(subject.marks.current * (1 - examWeight / 100) + nextScore * (examWeight / 100));
  const projectedGrade = scoreToGrade(projectedScore);

  const others = subjects.filter((s) => s.id !== subject.id);
  const totalCredits = subjects.reduce((a, s) => a + s.credits, 0);
  const cgpaBefore =
    subjects.reduce((a, s) => a + (gradePoints[s.marks.grade] ?? 0) * s.credits, 0) / totalCredits;
  const cgpaAfter =
    (others.reduce((a, s) => a + (gradePoints[s.marks.grade] ?? 0) * s.credits, 0) +
      (gradePoints[projectedGrade] ?? 0) * subject.credits) /
    totalCredits;

  const close = () => { setSelectedSubject(null); setSimulatorOpen(false); };

  if (!simulatorOpen) return null;

  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40 transition-opacity"
      />
      <aside
        className="fixed right-0 top-0 h-screen w-full md:w-[460px] bg-card border-l border-border z-50 flex flex-col shadow-lg transition-transform"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary grid place-items-center">
              <Calculator className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">What If Simulator</div>
              <div className="text-[11px] text-muted-foreground">Real-time predictions</div>
            </div>
          </div>
          <button onClick={close} className="p-2 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="flex flex-wrap gap-1.5">
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all",
                  s.id === subject.id
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "bg-secondary/50 text-muted-foreground border-border/60 hover:text-foreground"
                )}
              >
                {s.code}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-secondary/40 border border-border/60 p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold tracking-tight">{subject.name}</h3>
              <PlatformBadge platform={subject.platform} />
            </div>
            <div className="text-[11px] text-muted-foreground font-mono">{subject.code} · {subject.credits} credits</div>
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Attendance Simulator</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Goal:</span>
                <Input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="h-7 w-14 text-[10px] text-center"
                />
                <span className={cn(
                  "px-2 py-0.5 rounded-md border text-[10px] font-semibold inline-flex items-center gap-1",
                  status === "safe" && "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
                  status === "warning" && "bg-amber-500/10 text-amber-500 border-amber-500/30",
                  status === "critical" && "bg-destructive/10 text-destructive border-destructive/30",
                )}>
                  {status === "critical" ? <AlertTriangle className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                  {status === "safe" ? "Safe" : status === "warning" ? "Watch" : "Below"}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-card border border-border p-4">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs text-muted-foreground">Skip next</span>
                <span className="text-xs text-muted-foreground">classes</span>
              </div>
              <div className="flex items-end justify-between gap-4 mb-3">
                <div className="text-4xl font-bold tabular-nums">{skip}</div>
                <div className="text-right">
                  <div className={cn("text-2xl font-bold tabular-nums",
                      status === "safe" && "text-emerald-500",
                      status === "warning" && "text-amber-500",
                      status === "critical" && "text-destructive")}
                  >
                    {newPct.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-muted-foreground">projected</div>
                </div>
              </div>

              <Slider value={[skip]} onValueChange={([v]) => setSkip(v)} min={0} max={15} step={1} />

              <div className="relative mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className={cn("absolute inset-y-0 left-0 rounded-full",
                    status === "safe" && "bg-emerald-500",
                    status === "warning" && "bg-amber-500",
                    status === "critical" && "bg-destructive")}
                  style={{ width: `${Math.min(newPct, 100)}%` }}
                />
                <div className="absolute top-0 bottom-0 w-px bg-foreground/50" style={{ left: `${threshold}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
                <span>0%</span>
                <span>Goal {threshold}%</span>
                <span>100%</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-secondary/60 p-2.5">
                  <div className="text-[10px] text-muted-foreground">Max safe bunks</div>
                  <div className="text-lg font-bold tabular-nums text-emerald-500">{maxBunk}</div>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2.5">
                  <div className="text-[10px] text-muted-foreground">After skip</div>
                  <div className="text-lg font-bold tabular-nums">{newAtt}/{newTotal}</div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Marks Simulator</div>
            <div className="rounded-xl bg-card border border-border p-4 space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Next exam score</span>
                  <span className="text-2xl font-bold tabular-nums">{nextScore}</span>
                </div>
                <Slider value={[nextScore]} onValueChange={([v]) => setNextScore(v)} min={0} max={100} step={1} />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Exam weight</span>
                  <span className="text-sm font-semibold tabular-nums">{examWeight}%</span>
                </div>
                <Slider value={[examWeight]} onValueChange={([v]) => setExamWeight(v)} min={10} max={70} step={5} />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="rounded-lg bg-secondary/60 p-2.5">
                  <div className="text-[10px] text-muted-foreground">Subject</div>
                  <div className="text-lg font-bold tabular-nums">{projectedScore}</div>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2.5">
                  <div className="text-[10px] text-muted-foreground">Grade</div>
                  <div className="text-lg font-bold text-primary">{projectedGrade}</div>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2.5">
                  <div className="text-[10px] text-muted-foreground">CGPA</div>
                  <div className="text-lg font-bold tabular-nums flex items-center gap-1">
                    {cgpaAfter.toFixed(2)}
                    <TrendingUp className={cn("h-3 w-3", cgpaAfter >= cgpaBefore ? "text-emerald-500" : "text-destructive rotate-180")} />
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Current CGPA <span className="text-foreground font-semibold">{cgpaBefore.toFixed(2)}</span> →
                projected <span className={cn("font-semibold", cgpaAfter >= cgpaBefore ? "text-emerald-500" : "text-destructive")}>{cgpaAfter.toFixed(2)}</span>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
