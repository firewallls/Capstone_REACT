// src/pages/Marks.jsx
import { useEffect } from "react";
import { GraduationCap, Trophy, Target, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardStore } from "@/store/useDashboardStore";
import { gradePoints, subjects } from "@/data/mock";
import { cn } from "@/lib/utils";


function PageHeader({ eyebrow, title, subtitle, icon: Icon }) {
    return (
        <div className="mb-8 space-y-1">
            <div className="flex items-center gap-2">
                {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
    );
}


function SectionHeader({ title, subtitle }) {
    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
    );
}


function PlatformBadge({ platform }) {
    const colors = {
        newton: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
        rishiverse: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
        canvas: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
    };
    return (
        <Badge variant="outline" className={cn(colors[platform], "font-mono")}>
            {platform}
        </Badge>
    );
}

// ---- Marks Card (replaces external MarksCard) ----
function SubjectCard({ subject, index }) {
    const setSelected = useDashboardStore((s) => s.setSelectedSubject);
    const { name, platform, marks, credits } = subject;
    const gradePoint = gradePoints[marks.grade] ?? 0;

    return (
        <Card className="glass shadow-card p-5 card-hover cursor-pointer">
            <CardContent className="p-0 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PlatformBadge platform={platform} />
                        <h3 className="text-sm font-semibold">{name}</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto py-1 px-2 text-xs"
                        onClick={() => setSelected(subject.id)}
                    >
                        Simulate
                    </Button>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-secondary/80 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-cool rounded-full transition-all"
                        style={{ width: `${marks.current}%` }}
                    />
                </div>

                <div className="flex items-end justify-between">
                    <div>
                        <div className="text-2xl font-bold tabular-nums">{marks.current}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-semibold">{marks.grade}</div>
                        <div className="text-xs text-muted-foreground">Grade</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-semibold">{gradePoint}</div>
                        <div className="text-xs text-muted-foreground">Points</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

/* ==============================
   Main Page Component
   ============================== */

export default function Marks() {
    const setSelected = useDashboardStore((s) => s.setSelectedSubject);

    useEffect(() => {
        document.title = "Marks — Synapse";
    }, []);

    // Calculate CGPA
    const totalPoints = subjects.reduce(
        (acc, s) => acc + (gradePoints[s.marks.grade] ?? 0) * s.credits,
        0
    );
    const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);
    const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    // Top 3 performers
    const top = [...subjects]
        .sort((a, b) => b.marks.current - a.marks.current)
        .slice(0, 3);

    // Weakest subject
    const weakest = [...subjects].sort(
        (a, b) => a.marks.current - b.marks.current
    )[0];

    return (
        <>
            <PageHeader
                eyebrow="Marks"
                title={
                    <>
                        Your CGPA, <span className="text-gradient-hot">decoded</span>
                    </>
                }
                subtitle="See what's pulling you up, what's dragging you down — and simulate the next exam."
                icon={GraduationCap}
            />

            {/* Hero CGPA & Top Performers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="md:col-span-1 relative overflow-hidden glass shadow-card p-6">
                    <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
                    <CardContent className="relative p-0">
                        <div className="text-xs font-medium text-muted-foreground">
                            Current CGPA
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <div className="text-6xl font-extrabold tracking-tight text-gradient">
                                {cgpa.toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">/ 10.00</div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 text-[11px] text-safe">
                            <Sparkles className="h-3 w-3" /> Trending up vs last sem
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 glass shadow-card p-6">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="h-4 w-4 text-warning" />
                            <h3 className="text-sm font-bold tracking-tight">Top performers</h3>
                        </div>
                        <div className="space-y-3">
                            {top.map((s, i) => (
                                <div key={s.id} className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "h-7 w-7 rounded-full grid place-items-center text-[11px] font-bold shrink-0",
                                            i === 0
                                                ? "bg-warning/20 text-warning"
                                                : i === 1
                                                    ? "bg-canvas/20 text-canvas"
                                                    : "bg-secondary text-muted-foreground"
                                        )}
                                    >
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold truncate">
                        {s.name}
                      </span>
                                            <PlatformBadge platform={s.platform} />
                                        </div>
                                        <div className="h-1.5 mt-1.5 bg-secondary/80 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-cool rounded-full"
                                                style={{ width: `${s.marks.current}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-sm font-bold tabular-nums">
                                            {s.marks.current}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground">
                                            {s.marks.grade}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Weakest Alert */}
            {weakest && (
                <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 flex items-center gap-3 mb-6">
                    <Target className="h-4 w-4 text-warning shrink-0" />
                    <div className="flex-1 text-sm">
                        <span className="font-semibold">{weakest.name}</span>{" "}
                        <span className="text-muted-foreground">
              is your lowest at {weakest.marks.current}. Score 85+ next exam to
              bump it to A.
            </span>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="bg-warning/20 text-warning hover:bg-warning/30"
                        onClick={() => setSelected(weakest.id)}
                    >
                        Simulate
                    </Button>
                </div>
            )}

            {/* All Subjects */}
            <SectionHeader
                title="All subjects"
                subtitle="Tap a card to open the simulator"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {subjects.map((s, i) => (
                    <SubjectCard key={s.id} subject={s} index={i} />
                ))}
            </div>
        </>
    );
}