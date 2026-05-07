import { scoreToGrade, gradePoints } from "@/data/mock";

export function getAttendanceData(subject, skip, threshold) {
    const newAtt = subject.attended;
    const newTotal = subject.total + skip;
    const newPct = (newAtt / newTotal) * 100;
    const status = newPct >= threshold + 5 ? "safe" : newPct >= threshold ? "warning" : "critical";

    let maxBunk = 0;
    while ((subject.attended / (subject.total + maxBunk + 1)) * 100 >= threshold) maxBunk++;

    return { newAtt, newTotal, newPct, status, maxBunk };
}

export function getMarksData(subjects, subject, nextScore, examWeight) {
    const projectedScore = Math.round(
        subject.marks.current * (1 - examWeight / 100) + nextScore * (examWeight / 100)
    );
    const projectedGrade = scoreToGrade(projectedScore);

    const others = subjects.filter((s) => s.id !== subject.id);
    const totalCredits = subjects.reduce((a, s) => a + s.credits, 0);

    const cgpaBefore = subjects.reduce((a, s) => a + (gradePoints[s.marks.grade] ?? 0) * s.credits, 0) / totalCredits;
    const cgpaAfter =
        (others.reduce((a, s) => a + (gradePoints[s.marks.grade] ?? 0) * s.credits, 0) +
            (gradePoints[projectedGrade] ?? 0) * subject.credits) / totalCredits;

    return { projectedScore, projectedGrade, cgpaBefore, cgpaAfter };
}

export const statusStyles = {
    safe: {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
        pill: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    },
    warning: {
        text: "text-amber-500",
        bg: "bg-amber-500",
        pill: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    },
    critical: {
        text: "text-destructive",
        bg: "bg-destructive",
        pill: "bg-destructive/10 text-destructive border-destructive/30",
    },
};