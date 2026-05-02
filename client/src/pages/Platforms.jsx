// src/pages/Platforms.jsx
import { useEffect } from "react";
import { Boxes, Plus } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore.js";
import { subjects } from "../data/mock.js";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";

// ---- Reusable Page Header (pure shadcn) ----
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

// ---- Reusable Section Header ----
function SectionHeader({ title, subtitle, action }) {
    return (
        <div className="flex items-center justify-between mb-3">
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

// ---- Platform Badge (using shadcn Badge) ----
function PlatformBadge({ platform }) {
    const colors = {
        newton: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
        rishiverse:
            "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
        canvas:
            "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
        // add more as needed
    };
    return (
        <Badge variant="outline" className={colors[platform] || ""}>
            {platform}
        </Badge>
    );
}

// ---- Platform Card (shadcn Card for academic items) ----
function AcademicPlatformCard({ p, count }) {
    return (
        <Card className="relative overflow-hidden glass shadow-card p-5 card-hover">
            <div
                className={`absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl opacity-25 bg-${p.id}`}
            />
            <div className="relative">
                <div className="flex items-center justify-between mb-2">
                    <PlatformBadge platform={p.id} />
                    <span className="text-[10px] text-safe font-semibold inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-safe animate-pulse-glow" />{" "}
                        {p.status}
          </span>
                </div>
                <h3 className="text-base font-bold tracking-tight">{p.name}</h3>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                    {p.tag}
                </div>
                <p className="text-xs text-muted-foreground mt-3">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">{count} subjects tracked</span>
                    <Button
                        variant="link"
                        className="h-auto p-0 text-xs font-semibold text-primary"
                    >
                        Manage →
                    </Button>
                </div>
            </div>
        </Card>
    );
}

// ---- Platform Widget (shadcn Card for coding platforms) ----
function PlatformWidget({ p }) {
    return (
        <Card className="p-4 glass shadow-card card-hover flex flex-col gap-2 justify-between min-h-[140px]">
            <div className="flex items-center gap-2">
                <span className="text-lg">{p.icon || "💻"}</span>
                <h4 className="text-sm font-semibold">{p.name}</h4>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{p.score}</span>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                    {p.visible ? "Hide" : "Show"}
                </Button>
            </div>
        </Card>
    );
}

// ---- Academic Platforms Data ---- (unchanged)
const academic = [
    {
        id: "newton",
        name: "Newton Portal",
        tag: "Attendance · Marks",
        desc: "Primary academic record. Auto-synced every 30 min.",
        status: "connected",
    },
    {
        id: "rishiverse",
        name: "Rishiverse",
        tag: "Attendance · Marks · Materials",
        desc: "Class portal with assignments + grade book.",
        status: "synced",
    },
    {
        id: "canvas",
        name: "Canvas LMS",
        tag: "Materials · Marks",
        desc: "Lectures, PDFs, video drops and quizzes.",
        status: "synced",
    },
];

// ---- Main Page Component ----
export default function Platforms() {
    const platforms = useDashboardStore((s) => s.platforms);
    const togglePlatform = useDashboardStore((s) => s.togglePlatform);

    useEffect(() => {
        document.title = "Platforms — Synapse";
    }, []);

    return (
        <>
            <PageHeader
                eyebrow="Platforms"
                title={
                    <>
                        One feed, <span className="text-gradient">every account</span>
                    </>
                }
                subtitle="Connect academic portals and coding profiles. Synapse keeps them in sync."
                icon={Boxes}
            />

            {/* Academic Section */}
            <section className="mb-10">
                <SectionHeader
                    title="Academic"
                    subtitle="Newton + Rishiverse + Canvas"
                    action={
                        <span className="text-[11px] text-safe">● Live sync</span>
                    }
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {academic.map((p) => {
                        const count = subjects.filter((s) => s.platform === p.id).length;
                        return <AcademicPlatformCard key={p.id} p={p} count={count} />;
                    })}
                </div>
            </section>

            {/* Coding Platforms Section */}
            <section>
                <SectionHeader
                    title="Coding & cyber"
                    subtitle="Toggle visibility on your dashboard"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {platforms.map((p) => (
                        <PlatformWidget key={p.id} p={p} />
                    ))}
                    <Card className="rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 p-5 grid place-items-center text-muted-foreground hover:text-primary transition-all min-h-[140px] group cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-9 w-9 rounded-full border border-dashed border-current grid place-items-center group-hover:scale-110 transition-transform">
                                <Plus className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-semibold">Add Platform</span>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    );
}