import { Input } from "@/components/ui/input";
import { StatBox } from "./StatBox";
import { SectionHeader, CardBox, ProgressBar, StatusBadge } from "./UIComponents";
import { getAttendanceData, statusStyles } from "./simulatorUtils";
import { Slider } from "@/components/ui/slider";

export function AttendanceSection({ subject, skip, setSkip, threshold, setThreshold }) {
    const { newAtt, newTotal, newPct, status, maxBunk } = getAttendanceData(subject, skip, threshold);
    const styles = statusStyles[status];

    return (
        <section className="space-y-3">
            <SectionHeader
                action={
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">Goal:</span>
                        <Input type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="h-7 w-14 text-[10px] text-center" />
                        <StatusBadge status={status} styles={styles} />
                    </div>
                }
            >
                Attendance Simulator
            </SectionHeader>

            <CardBox>
                <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Skip next</span>
                    <span className="text-xs text-muted-foreground">classes</span>
                </div>
                <div className="flex items-end justify-between gap-4 mb-3">
                    <div className="text-4xl font-bold tabular-nums">{skip}</div>
                    <div className="text-right">
                        <div className={`text-2xl font-bold tabular-nums ${styles.text}`}>{newPct.toFixed(1)}%</div>
                        <div className="text-[10px] text-muted-foreground">projected</div>
                    </div>
                </div>
                <Slider value={[skip]} onValueChange={([v]) => setSkip(v)} min={0} max={15} step={1} />
                <ProgressBar value={newPct} threshold={threshold} color={styles.bg} />
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <StatBox label="Max safe bunks" value={maxBunk} valueClass="text-emerald-500" />
                    <StatBox label="After skip" value={`${newAtt}/${newTotal}`} />
                </div>
            </CardBox>
        </section>
    );
}