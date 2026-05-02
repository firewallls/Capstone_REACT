import { useEffect } from "react";
import { BookOpen, FileText, Video, Link2, Clock, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ==============================
   Reusable in‑page components
   ============================== */

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
        rishiverse: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
        canvas: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
    };
    return (
        <Badge variant="outline" className={cn(colors[platform], "font-mono")}>
            {platform}
        </Badge>
    );
}

/* ==============================
   Data & type helpers
   ============================== */

const materials = [
    { id: "m1", title: "Heap Sort — visual walkthrough", subject: "Data Structures", type: "video", platform: "canvas", duration: "18 min", new: true },
    { id: "m2", title: "Linear Algebra cheat-sheet", subject: "Linear Algebra", type: "pdf", platform: "rishiverse", duration: "6 pages" },
    { id: "m3", title: "Process scheduling notes", subject: "Operating Systems", type: "pdf", platform: "canvas", duration: "12 pages", new: true },
    { id: "m4", title: "ML — Bias vs Variance", subject: "Machine Learning", type: "video", platform: "rishiverse", duration: "24 min" },
    { id: "m5", title: "REST APIs reference", subject: "Web Development", type: "link", platform: "canvas", duration: "external" },
    { id: "m6", title: "TCP handshake explained", subject: "Computer Networks", type: "video", platform: "canvas", duration: "9 min" },
    { id: "m7", title: "Eigenvalues — practice set", subject: "Linear Algebra", type: "pdf", platform: "rishiverse", duration: "20 problems", new: true },
    { id: "m8", title: "OS lab assignment 4", subject: "Operating Systems", type: "link", platform: "canvas", duration: "due Fri" },
];

const typeConfig = {
    pdf: { icon: FileText, cls: "bg-hot/15 text-hot" },
    video: { icon: Video, cls: "bg-canvas/15 text-canvas" },
    link: { icon: Link2, cls: "bg-rishiverse/15 text-rishiverse" },
};

/* ==============================
   Main Page Component
   ============================== */

export default function Learning() {
    useEffect(() => {
        document.title = "Learning — Synapse";
    }, []);

    const stats = [
        { label: "New this week", value: materials.filter((m) => m.new).length, cls: "text-hot" },
        { label: "PDFs", value: materials.filter((m) => m.type === "pdf").length, cls: "text-canvas" },
        { label: "Videos", value: materials.filter((m) => m.type === "video").length, cls: "text-rishiverse" },
        { label: "Links", value: materials.filter((m) => m.type === "link").length, cls: "text-primary" },
    ];

    return (
        <>
            <PageHeader
                eyebrow="Learning"
                title={<>Materials, <span className="text-gradient">made findable</span></>}
                subtitle="Every PDF, video and link from Rishiverse + Canvas, in one feed."
                icon={BookOpen}
            />

            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {stats.map((s) => (
                    <Card key={s.label} className="glass p-4">
                        <CardContent className="p-0">
                            <div className="text-[11px] text-muted-foreground">{s.label}</div>
                            <div className={cn("text-2xl font-bold mt-1 tabular-nums", s.cls)}>
                                {s.value}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Materials list */}
            <SectionHeader title="Recent drops" subtitle="Synced from Rishiverse + Canvas" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {materials.map((m) => {
                    const T = typeConfig[m.type];
                    const IconComponent = T.icon;
                    return (
                        <Card
                            key={m.id}
                            className="group glass shadow-card p-4 flex items-center gap-4 card-hover"
                        >
                            <div
                                className={cn(
                                    "h-11 w-11 rounded-lg grid place-items-center shrink-0",
                                    T.cls
                                )}
                            >
                                <IconComponent className="h-5 w-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <PlatformBadge platform={m.platform} />
                                    {m.new && (
                                        <Badge className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-hot/20 text-hot border-0">
                                            New
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-sm font-semibold truncate">{m.title}</div>
                                <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                                    <span>{m.subject}</span>
                                    <span className="opacity-50">·</span>
                                    <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                                        {m.duration}
                  </span>
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-9 w-9"
                                aria-label="Download"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </Card>
                    );
                })}
            </div>
        </>
    );
}