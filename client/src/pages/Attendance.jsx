import { useEffect, useMemo, useState } from "react";
import {
    CalendarCheck,
    Filter,
    TrendingDown,
    TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { subjects } from "@/data/mock";
import { cn } from "@/lib/utils";

/* ==============================
   Filter definitions
   ============================== */

const filters = [
    { id: "all", label: "All", color: "bg-primary/15 text-primary border-primary/30" },
    { id: "newton", label: "Newton", color: "bg-newton/15 text-newton border-newton/30" },
    { id: "rishiverse", label: "Rishiverse", color: "bg-rishiverse/15 text-rishiverse border-rishiverse/30" },
    { id: "canvas", label: "Canvas", color: "bg-canvas/15 text-canvas border-canvas/30" },
];

/* ==============================
   Reusable components (inline)
   ============================== */

function PageHeader({ eyebrow, title, subtitle, icon: Icon }) {
    return (
        <div className="relative overflow-hidden rounded-2xl glass shadow-card p-6 md:p-8 noise-overlay mb-8">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
            <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-gradient-hot opacity-15 blur-3xl" />
            <div className="relative flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-1.5">
                        {eyebrow}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {title}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ title, subtitle, action }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
                {subtitle && (
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

function StatTile({ label, value, sub, accent, trend }) {
    const accentBgMap = {
        primary: "from-primary/30 to-primary/0",
        safe: "from-safe/30 to-safe/0",
        warning: "from-warning/30 to-warning/0",
        critical: "from-critical/30 to-critical/0",
        rishiverse: "from-rishiverse/30 to-rishiverse/0",
    };
    const accentTextMap = {
        primary: "text-primary",
        safe: "text-safe",
        warning: "text-warning",
        critical: "text-critical",
        rishiverse: "text-rishiverse",
    };

    return (
        <Card className="relative overflow-hidden glass shadow-card p-5">
            <div
                className={cn(
                    "absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl opacity-60 bg-gradient-to-br",
                    accentBgMap[accent] || "from-primary/30 to-primary/0"
                )}
            />
            <CardContent className="relative p-0">
                <div className="text-xs font-medium text-muted-foreground">{label}</div>
                <div className="flex items-baseline gap-2 mt-1">
                    <div className="text-3xl font-bold tracking-tight tabular-nums">
                        {value}
                    </div>
                    {trend !== undefined && (
                        <span
                            className={cn(
                                "inline-flex items-center text-[11px] font-semibold",
                                trend >= 0 ? "text-safe" : "text-critical"
                            )}
                        >
              {trend >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-0.5" />
              ) : (
                  <TrendingDown className="h-3 w-3 mr-0.5" />
              )}
                            {Math.abs(trend).toFixed(1)}%
            </span>
                    )}
                </div>
                {sub && (
                    <div className="text-[11px] text-muted-foreground mt-1 truncate">
                        {sub}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function SubjectAttendanceCard({ subject }) {
    const { id, name, code, platform, attended, total, threshold } = subject;
    const attendancePct = (attended / total) * 100;
    const atRisk = attendancePct < threshold;

    return (
        <Card className="glass shadow-card p-4 card-hover">
            <CardContent className="p-0 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className={cn(
                                "font-mono",
                                platform === "newton"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                                    : platform === "rishiverse"
                                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                                        : "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300"
                            )}
                        >
                            {platform}
                        </Badge>
                        <h3 className="text-sm font-semibold">{name}</h3>
                    </div>
                    <span
                        className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-md",
                            atRisk ? "bg-critical/10 text-critical" : "bg-safe/10 text-safe"
                        )}
                    >
            {atRisk ? "At risk" : "Safe"}
          </span>
                </div>

                {/* Attendance bar */}
                <div className="relative h-2 rounded-full bg-secondary/80 overflow-hidden">
                    <div
                        className={cn(
                            "absolute inset-y-0 left-0 rounded-full transition-all",
                            atRisk ? "bg-critical" : "bg-safe"
                        )}
                        style={{ width: `${Math.min(attendancePct, 100)}%` }}
                    />
                    <div
                        className="absolute top-0 bottom-0 w-px bg-foreground/50"
                        style={{ left: `${threshold}%` }}
                    />
                </div>

                <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>
            {attended}/{total} classes
          </span>
                    <span>{attendancePct.toFixed(1)}%</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{code}</span>
                    <Button variant="secondary" size="sm" className="h-8 text-xs">
                        Simulate
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

/* ==============================
   Main Attendance Page
   ============================== */

export default function Attendance() {
    const [filter, setFilter] = useState("all"); // "all" | "newton" | "rishiverse" | "canvas"

    useEffect(() => {
        document.title = "Attendance — Synapse";
    }, []);

    const filtered = useMemo(
        () => subjects.filter((s) => filter === "all" || s.platform === filter),
        [filter]
    );

    const overall =
        (filtered.reduce((a, s) => a + s.attended, 0) /
            Math.max(filtered.reduce((a, s) => a + s.total, 0), 1)) *
        100;

    const atRisk = filtered.filter(
        (s) => (s.attended / s.total) * 100 < s.threshold
    );

    const best = [...filtered].sort(
        (a, b) => b.attended / b.total - a.attended / a.total
    )[0];

    return (
        <>
            <PageHeader
                eyebrow="Attendance"
                title={
                    <>
                        Stay <span className="text-gradient">above the line</span>
                    </>
                }
                subtitle="Track every class, simulate skips, never get stuck below 75%."
                icon={CalendarCheck}
            />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatTile label="Overall" value={`${overall.toFixed(1)}%`} accent="primary" trend={+1.2} />
                <StatTile
                    label="At Risk"
                    value={String(atRisk.length)}
                    accent={atRisk.length ? "critical" : "safe"}
                    sub={atRisk.length ? atRisk.map((s) => s.code).join(" · ") : "All clear ✨"}
                />
                <StatTile
                    label="Top Subject"
                    value={best ? `${((best.attended / best.total) * 100).toFixed(0)}%` : "—"}
                    accent="rishiverse"
                    sub={best?.name ?? ""}
                />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                {filters.map((f) => (
                    <Button
                        key={f.id}
                        variant="secondary"
                        size="sm"
                        className={cn(
                            "px-3 py-1.5 h-auto rounded-md text-xs font-semibold border border-border/60 text-muted-foreground transition-all",
                            filter === f.id && f.color
                        )}
                        onClick={() => setFilter(f.id)}
                    >
                        {f.label}
                    </Button>
                ))}
            </div>

            {/* Subject list */}
            <SectionHeader
                title={`${filtered.length} subjects`}
                subtitle="Tap simulate to project skips"
                action={<span className="text-[11px] text-muted-foreground">threshold 75%</span>}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((s, i) => (
                    <SubjectAttendanceCard key={s.id} subject={s} />
                ))}
            </div>
        </>
    );
}