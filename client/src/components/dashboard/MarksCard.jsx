import { PlatformBadge } from "./PlatformBadge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const gradeColor = {
  "A+": "text-emerald-500", "A": "text-emerald-500",
  "B+": "text-blue-500", "B": "text-blue-500",
  "C+": "text-amber-500", "C": "text-amber-500",
  "D": "text-destructive", "F": "text-destructive",
};

export function MarksCard({ subject }) {
  const pct = (subject.marks.current / subject.marks.max) * 100;
  return (
    <Card className="border-border shadow-sm transition-all hover:shadow-md group">
      <CardContent className="flex items-center gap-4 py-5">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 94.2} 94.2`}
              className="text-primary transition-all duration-500"
            />
          </svg>
          <div className={cn("absolute inset-0 grid place-items-center text-sm font-bold", gradeColor[subject.marks.grade] ?? "text-foreground")}>
            {subject.marks.grade}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <PlatformBadge platform={subject.platform} />
          </div>
          <h3 className="font-semibold tracking-tight truncate">{subject.name}</h3>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-bold tabular-nums">{subject.marks.current}</span>
            <span className="text-xs text-muted-foreground">/ {subject.marks.max}</span>
            <span className="text-[10px] text-muted-foreground ml-auto">{subject.marks.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
