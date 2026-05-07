import { Slider } from "@/components/ui/slider";
import { AlertTriangle, ShieldCheck } from "lucide-react";

// Title with subtitle pattern
export function TitleSubtitle({ title, subtitle, className = "" }) {
    return (
        <div className={className}>
            <div className="text-sm font-bold tracking-tight">{title}</div>
            <div className="text-[11px] text-muted-foreground">{subtitle}</div>
        </div>
    );
}

// Section header pattern
export function SectionHeader({ children, action }) {
    return (
        <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{children}</div>
            {action}
        </div>
    );
}

// Label with large value pattern
export function LabelValue({ label, value, valueClass = "text-2xl" }) {
    return (
        <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className={`font-bold tabular-nums ${valueClass}`}>{value}</span>
        </div>
    );
}

// Slider with label and value
export function SliderControl({ label, value, onChange, min = 0, max = 100, step = 1, valueClass }) {
    return (
        <div>
            <LabelValue label={label} value={value} valueClass={valueClass} />
            <Slider value={[value]} onValueChange={([v]) => onChange(v)} min={min} max={max} step={step} />
        </div>
    );
}

// Simple card wrapper
export function CardBox({ children, className = "" }) {
    return (
        <div className={`rounded-xl bg-card border border-border p-4 ${className}`}>
            {children}
        </div>
    );
}

// Info card wrapper
export function InfoCard({ children }) {
    return (
        <div className="rounded-xl bg-secondary/40 border border-border/60 p-4">
            {children}
        </div>
    );
}

// Progress bar with threshold line
export function ProgressBar({ value, threshold, color }) {
    return (
        <>
            <div className="relative mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                <div className={`absolute inset-y-0 left-0 rounded-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
                <div className="absolute top-0 bottom-0 w-px bg-foreground/50" style={{ left: `${threshold}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
                <span>0%</span>
                <span>Goal {threshold}%</span>
                <span>100%</span>
            </div>
        </>
    );
}

// Status badge
export function StatusBadge({ status, styles }) {
    const Icon = status === "critical" ? AlertTriangle : ShieldCheck;
    const label = status === "safe" ? "Safe" : status === "warning" ? "Watch" : "Below";
    return (
        <span className={`px-2 py-0.5 rounded-md border text-[10px] font-semibold inline-flex items-center gap-1 ${styles.pill}`}>
      <Icon className="h-3 w-3" />
            {label}
    </span>
    );
}