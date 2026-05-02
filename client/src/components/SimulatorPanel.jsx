import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { Subject, scoreToGrade, gradePoints } from "@/data/mock";
import { PlatformBadge } from "@/components/dashboard/PlatformBadge";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function SimulatorPanel({ subjects }) {
    const { simulatorOpen, setSimulatorOpen, selectedSubjectId, setSelectedSubject } = useDashboardStore();
    const subject = useMemo(() => subjects.find((s) => s.id === selectedSubjectId) ?? subjects[0], [subjects, selectedSubjectId]);

    const [skip, setSkip] = useState(0);
    const [nextScore, setNextScore] = useState(subject?.marks.current ?? 80);
    const [examWeight, setExamWeight] = useState(40);

    useEffect(() => { setSkip(0); setNextScore(subject.marks.current); }, [subject]);

    const newAtt = subject.attended;
    const newTotal = subject.total + skip;
    const newPct = (newAtt / newTotal) * 100;
    const status = newPct >= subject.threshold + 5 ? "safe" : newPct >= subject.threshold ? "warning" : "critical";

    let maxBunk = 0;
    while ((subject.attended / (subject.total + maxBunk + 1)) * 100 >= subject.threshold) maxBunk++;

    const projectedScore = Math.round(subject.marks.current * (1 - examWeight / 100) + nextScore * (examWeight / 100));
    const projectedGrade = scoreToGrade(projectedScore);

    // CGPA before/after, replacing this subject's grade
    const others = subjects.filter((s) => s.id !== subject.id);
    const totalCredits = subjects.reduce((a, s) => a + s.credits, 0);
    const cgpaBefore =
        subjects.reduce((a, s) => a + (gradePoints[s.marks.grade] ?? 0) * s.credits, 0) / totalCredits;
    const cgpaAfter =
        (others.reduce((a, s) => a + (gradePoints[s.marks.grade] ?? 0) * s.credits, 0) +
            (gradePoints[projectedGrade] ?? 0) * subject.credits) /
        totalCredits;

    const close = () => { setSelectedSubject(null); setSimulatorOpen(false); };

    return (
        <AnimatePresence>
            {simulatorOpen && (
                <>
                    <motion.div
                        key="bg"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                        className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
                    />
                    <motion.aside
                        key="panel"
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed right-0 top-0 h-screen w-full md:w-[460px] bg-elevated border-l border-border z-50 flex flex-col shadow-glow"
                    >
                        <div className="flex items-center justify-between p-5 border-b border-border">
                            <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center">
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
                            {/* Subject picker pills */}
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

                            {/* Attendance simulator */}
                            <section className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Attendance Simulator</div>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-md border text-[10px] font-semibold inline-flex items-center gap-1",
                                        status === "safe" && "bg-safe/10 text-safe border-safe/30",
                                        status === "warning" && "bg-warning/10 text-warning border-warning/30",
                                        status === "critical" && "bg-critical/10 text-critical border-critical/30",
                                    )}>
                    {status === "critical" ? <AlertTriangle className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                                        {status === "safe" ? "Safe" : status === "warning" ? "Watch" : "Below threshold"}
                  </span>
                                </div>

                                <div className="rounded-xl glass p-4">
                                    <div className="flex items-baseline justify-between mb-1">
                                        <span className="text-xs text-muted-foreground">Skip next</span>
                                        <span className="text-xs text-muted-foreground">classes</span>
                                    </div>
                                    <div className="flex items-end justify-between gap-4 mb-3">
                                        <div className="text-4xl font-bold tabular-nums">{skip}</div>
                                        <div className="text-right">
                                            <motion.div
                                                key={newPct.toFixed(1)}
                                                initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.25 }}
                                                className={cn("text-2xl font-bold tabular-nums",
                                                    status === "safe" && "text-safe",
                                                    status === "warning" && "text-warning",
                                                    status === "critical" && "text-critical")}
                                            >
                                                {newPct.toFixed(1)}%
                                            </motion.div>
                                            <div className="text-[10px] text-muted-foreground">projected</div>
                                        </div>
                                    </div>

                                    <Slider value={[skip]} onValueChange={([v]) => setSkip(v)} min={0} max={15} step={1} />

                                    <div className="relative mt-4 h-2 rounded-full bg-secondary/80 overflow-hidden">
                                        <motion.div
                                            animate={{ width: `${Math.min(newPct, 100)}%` }}
                                            transition={{ duration: 0.3 }}
                                            className={cn("absolute inset-y-0 left-0 rounded-full",
                                                status === "safe" && "bg-safe",
                                                status === "warning" && "bg-warning",
                                                status === "critical" && "bg-critical")}
                                        />
                                        <div className="absolute top-0 bottom-0 w-px bg-foreground/50" style={{ left: `${subject.threshold}%` }} />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
                                        <span>0%</span>
                                        <span>Threshold {subject.threshold}%</span>
                                        <span>100%</span>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <div className="rounded-lg bg-secondary/60 p-2.5">
                                            <div className="text-[10px] text-muted-foreground">Max safe bunks</div>
                                            <div className="text-lg font-bold tabular-nums text-safe">{maxBunk}</div>
                                        </div>
                                        <div className="rounded-lg bg-secondary/60 p-2.5">
                                            <div className="text-[10px] text-muted-foreground">After skip</div>
                                            <div className="text-lg font-bold tabular-nums">{newAtt}/{newTotal}</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Marks simulator */}
                            <section className="space-y-3">
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Marks Simulator</div>
                                <div className="rounded-xl glass p-4 space-y-4">
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
                                            <motion.div
                                                key={projectedScore}
                                                initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                                className="text-lg font-bold tabular-nums">{projectedScore}</motion.div>
                                        </div>
                                        <div className="rounded-lg bg-secondary/60 p-2.5">
                                            <div className="text-[10px] text-muted-foreground">Grade</div>
                                            <motion.div
                                                key={projectedGrade}
                                                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                                className="text-lg font-bold text-primary">{projectedGrade}</motion.div>
                                        </div>
                                        <div className="rounded-lg bg-secondary/60 p-2.5">
                                            <div className="text-[10px] text-muted-foreground">CGPA</div>
                                            <div className="text-lg font-bold tabular-nums flex items-center gap-1">
                                                {cgpaAfter.toFixed(2)}
                                                <TrendingUp className={cn("h-3 w-3", cgpaAfter >= cgpaBefore ? "text-safe" : "text-critical rotate-180")} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[11px] text-muted-foreground">
                                        Current CGPA <span className="text-foreground font-semibold">{cgpaBefore.toFixed(2)}</span> →
                                        projected <span className={cn("font-semibold", cgpaAfter >= cgpaBefore ? "text-safe" : "text-critical")}>{cgpaAfter.toFixed(2)}</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
