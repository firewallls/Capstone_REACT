export function StatBox({ label, value, valueClass = "" }) {
    return (
        <div className="rounded-lg bg-secondary/60 p-2.5">
            <div className="text-[10px] text-muted-foreground">{label}</div>
            <div className={`text-lg font-bold tabular-nums ${valueClass}`}>{value}</div>
        </div>
    );
}