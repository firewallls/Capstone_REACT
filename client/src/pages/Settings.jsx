import { useEffect, useState } from "react";
import {
    Settings as SettingsIcon,
    Bell,
    Moon,
    Palette,
    Shield,
    LogOut,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

function Row({ icon: Icon, label, desc, children }) {
    return (
        <div className="flex items-center gap-3 p-3">
            <div className="h-9 w-9 rounded-lg bg-secondary/60 grid place-items-center text-muted-foreground">
                <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{label}</div>
                <div className="text-[11px] text-muted-foreground">{desc}</div>
            </div>
            {children}
        </div>
    );
}

function Stat({ label, value, tone }) {
    const toneColor = {
        primary: "text-primary",
        hot: "text-hot",
        safe: "text-safe",
    };
    return (
        <Card className="glass shadow-card p-4">
            <CardContent className="p-0">
                <div className="text-[11px] text-muted-foreground">{label}</div>
                <div className={cn("text-2xl font-bold tabular-nums mt-1", toneColor[tone] || "text-foreground")}>
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}

/* ==============================
   Accent data
   ============================== */

const accents = [
    { id: "cyan", label: "Cyber Cyan", cls: "bg-gradient-primary" },
    { id: "hot", label: "Hot Magenta", cls: "bg-gradient-hot" },
    { id: "cool", label: "Mint Cool", cls: "bg-gradient-cool" },
    { id: "newton", label: "Violet", cls: "bg-gradient-newton" },
];

/* ==============================
   Main Page Component
   ============================== */

export default function Settings() {
    useEffect(() => {
        document.title = "Settings — Synapse";
    }, []);

    const [accent, setAccent] = useState("cyan");
    const [notif, setNotif] = useState({
        low: true,
        exams: true,
        materials: false,
        weekly: true,
    });

    return (
        <>
            <PageHeader
                eyebrow="Settings"
                title={<>Make it <span className="text-gradient">yours</span></>}
                subtitle="Theme, alerts, account — all in one place."
                icon={SettingsIcon}
            />

            {/* Profile + Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <Card className="md:col-span-1 glass shadow-card p-5 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-primary grid place-items-center text-base font-bold text-primary-foreground shadow-glow">
                        AR
                    </div>
                    <div className="min-w-0">
                        <div className="text-sm font-bold truncate">Aryan Rao</div>
                        <div className="text-[11px] text-muted-foreground truncate">
                            aryan.rao@uni.edu
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1">
                            B.Tech CSE · Sem 5 · Roll 21BCE0492
                        </div>
                    </div>
                </Card>
                <div className="md:col-span-2 grid grid-cols-3 gap-3">
                    <Stat label="Day streak" value="18" tone="hot" />
                    <Stat label="Synced platforms" value="7" tone="primary" />
                    <Stat label="Skips left" value="12" tone="safe" />
                </div>
            </section>

            {/* Appearance */}
            <section className="mb-10">
                <SectionHeader
                    title="Appearance"
                    subtitle="Pick a vibe"
                    action={<Palette className="h-4 w-4 text-muted-foreground" />}
                />
                <Card className="glass shadow-card p-5 space-y-4">
                    <CardContent className="p-0 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {accents.map((a) => (
                                <button
                                    key={a.id}
                                    onClick={() => setAccent(a.id)}
                                    className={cn(
                                        "relative h-20 rounded-xl border transition-all overflow-hidden",
                                        accent === a.id
                                            ? "border-primary ring-2 ring-primary/40"
                                            : "border-border/60 hover:border-border"
                                    )}
                                >
                                    <div className={cn("absolute inset-0", a.cls)} />
                                    <div className="absolute inset-x-0 bottom-0 p-2 bg-background/60 backdrop-blur-md text-[11px] font-semibold text-left">
                                        {a.label}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <Row
                            icon={Moon}
                            label="Dark mode"
                            desc="Always on. Light mode coming soon."
                        >
                            <Switch checked disabled />
                        </Row>
                    </CardContent>
                </Card>
            </section>

            {/* Notifications */}
            <section className="mb-10">
                <SectionHeader
                    title="Notifications"
                    subtitle="What should ping you?"
                    action={<Bell className="h-4 w-4 text-muted-foreground" />}
                />
                <Card className="glass shadow-card p-2">
                    <CardContent className="p-0 divide-y divide-border/60">
                        <Row
                            icon={Shield}
                            label="Low attendance alerts"
                            desc="Ping me when any subject drops below 78%."
                        >
                            <Switch
                                checked={notif.low}
                                onCheckedChange={(v) =>
                                    setNotif((n) => ({ ...n, low: v }))
                                }
                            />
                        </Row>
                        <Row
                            icon={Bell}
                            label="Upcoming exams"
                            desc="3-day countdown reminders."
                        >
                            <Switch
                                checked={notif.exams}
                                onCheckedChange={(v) =>
                                    setNotif((n) => ({ ...n, exams: v }))
                                }
                            />
                        </Row>
                        <Row
                            icon={Bell}
                            label="New materials"
                            desc="Notify on Rishiverse / Canvas drops."
                        >
                            <Switch
                                checked={notif.materials}
                                onCheckedChange={(v) =>
                                    setNotif((n) => ({ ...n, materials: v }))
                                }
                            />
                        </Row>
                        <Row
                            icon={Bell}
                            label="Weekly digest"
                            desc="Sunday recap of your academic week."
                        >
                            <Switch
                                checked={notif.weekly}
                                onCheckedChange={(v) =>
                                    setNotif((n) => ({ ...n, weekly: v }))
                                }
                            />
                        </Row>
                    </CardContent>
                </Card>
            </section>

            {/* Sign Out */}
            <section className="pb-10">
                <Button
                    variant="outline"
                    className="text-critical border-critical/30 bg-critical/10 hover:bg-critical/20 hover:text-critical"
                >
                    <LogOut className="h-4 w-4 mr-2" /> Sign out
                </Button>
            </section>
        </>
    );
}