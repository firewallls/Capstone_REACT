import { TrendingUp } from "lucide-react";
import { StatBox } from "./StatBox";
import { SectionHeader, CardBox, SliderControl } from "./UIComponents";
import { getMarksData } from "./simulatorUtils";

export function MarksSection({ subjects, subject, nextScore, setNextScore, examWeight, setExamWeight }) {
    const { projectedScore, projectedGrade, cgpaBefore, cgpaAfter } = getMarksData(
        subjects,
        subject,
        nextScore,
        examWeight
    );
    const positive = cgpaAfter >= cgpaBefore;

    return (
        <section className="space-y-3">
            <SectionHeader>Marks Simulator</SectionHeader>

            <CardBox>
                <SliderControl label="Next exam score" value={nextScore} onChange={setNextScore}
                               min={0} max={100} step={1}
                        valueClass="text-2xl"
                />

                <SliderControl
                    label="Exam weight" value={examWeight}
                    onChange={setExamWeight} min={10} max={70} step={5}
                />

                <div className="grid grid-cols-3 gap-2 pt-3">
                    <StatBox label="Projected Score" value={projectedScore} />
                    <StatBox label="Grade" value={projectedGrade} valueClass="text-primary" />
                    <StatBox label="CGPA" value={cgpaAfter.toFixed(2)} />
                </div>

                <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-3 pt-3 border-t border-border">
                    Current CGPA
                    <span className="text-foreground font-semibold">{cgpaBefore.toFixed(2)} </span>
                    →
                    <span className={`font-semibold ${positive ? "text-emerald-500" : "text-destructive"}`}>
                        {cgpaAfter.toFixed(2)}
                    </span>
                    <TrendingUp className={`h-3 w-3 ${positive ? "text-emerald-500" : "text-destructive rotate-180"}`} />
                </div>
            </CardBox>
        </section>
    );
}