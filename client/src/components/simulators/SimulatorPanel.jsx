import { useEffect, useMemo, useState } from "react";
import { X, Calculator } from "lucide-react";
import { PlatformBadge } from "@/components/dashboard/PlatformBadge";
import { useDashboardStore } from "@/store/useDashboardStore";
import { AttendanceSection } from "./AttendanceSection";
import { MarksSection } from "./MarksSection";

export function SimulatorPanel({ subjects }) {
    const { simulatorOpen, setSimulatorOpen, selectedSubjectId, setSelectedSubject } = useDashboardStore();
    const subject = useMemo(
        () => subjects.find((s) => s.id === selectedSubjectId) ?? subjects[0],
        [subjects, selectedSubjectId]
    );

    const [skip, setSkip] = useState(0);
    const [nextScore, setNextScore] = useState(subject?.marks.current ?? 80);
    const [examWeight, setExamWeight] = useState(40);
    const [threshold, setThreshold] = useState(subject?.threshold ?? 75);

    useEffect(() => {
        if (subject) {
            setSkip(0);
            setNextScore(subject.marks.current);
            setThreshold(subject.threshold);
        }
    }, [subject]);

    if (!subject || !simulatorOpen) return null;

    const close = () => {
        setSelectedSubject(null);
        setSimulatorOpen(false);
    };

    return (
        <>
            <div onClick={close} className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40" />
            <aside className="fixed right-0 top-0 h-screen w-full md:w-[460px] bg-card border-l border-border z-50 flex flex-col shadow-lg">
                <div className="flex items-center justify-between p-5 border-b border-border">
                    <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-lg bg-primary grid place-items-center">
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
                    <div className="flex flex-wrap gap-1.5">
                        {subjects.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedSubject(s.id)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                                    s.id === subject.id
                                        ? "bg-primary/15 text-primary border-primary/30"
                                        : "bg-secondary/50 text-muted-foreground border-border/60 hover:text-foreground"
                                }`}
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
                        <div className="text-[11px] text-muted-foreground font-mono">
                            {subject.code} · {subject.credits} credits
                        </div>
                    </div>

                    <AttendanceSection
                        subject={subject}
                        skip={skip}
                        setSkip={setSkip}
                        threshold={threshold}
                        setThreshold={setThreshold}
                    />

                    <MarksSection
                        subjects={subjects}
                        subject={subject}
                        nextScore={nextScore}
                        setNextScore={setNextScore}
                        examWeight={examWeight}
                        setExamWeight={setExamWeight}
                    />
                </div>
            </aside>
        </>
    );
}