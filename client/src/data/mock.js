
export const filters = [
    { id: "all", label: "All", cls: "data-[active=true]:bg-primary/15 data-[active=true]:text-primary data-[active=true]:border-primary/30" },
    { id: "newton", label: "Newton", cls: "data-[active=true]:bg-violet-500/15 data-[active=true]:text-violet-500 data-[active=true]:border-violet-500/30" },
    { id: "rishiverse", label: "Rishiverse", cls: "data-[active=true]:bg-emerald-500/15 data-[active=true]:text-emerald-500 data-[active=true]:border-emerald-500/30" },
    { id: "canvas", label: "Canvas", cls: "data-[active=true]:bg-blue-500/15 data-[active=true]:text-blue-500 data-[active=true]:border-blue-500/30" },
];

export const academic = [
    { id: "newton", name: "Newton Portal", tag: "Attendance · Marks", desc: "Primary academic record. Auto-synced every 30 min.", status: "connected" },
    { id: "rishiverse", name: "Rishiverse", tag: "Attendance · Marks · Materials", desc: "Class portal with assignments + grade book.", status: "synced" },
    { id: "canvas", name: "Canvas LMS", tag: "Materials · Marks", desc: "Lectures, PDFs, video drops and quizzes.", status: "synced" },
];

export const subjects = [
  { id: "s1", name: "Data Structures", code: "CS201", platform: "newton",
    attended: 38, total: 46, threshold: 75, trend: [82, 80, 78, 81, 83, 82, 84, 82.6],
    marks: { current: 87, max: 100, grade: "A", lastUpdated: "2h ago" }, credits: 4 },
  { id: "s2", name: "Operating Systems", code: "CS305", platform: "newton",
    attended: 28, total: 42, threshold: 75, trend: [78, 74, 72, 70, 69, 68, 67, 66.7],
    marks: { current: 72, max: 100, grade: "B+", lastUpdated: "1d ago" }, credits: 4 },
  { id: "s3", name: "Linear Algebra", code: "MA204", platform: "rishiverse",
    attended: 32, total: 36, threshold: 75, trend: [86, 88, 89, 90, 89, 88, 89, 88.9],
    marks: { current: 91, max: 100, grade: "A+", lastUpdated: "5h ago" }, credits: 3 },
  { id: "s4", name: "Web Development", code: "CS310", platform: "canvas",
    attended: 24, total: 40, threshold: 75, trend: [70, 65, 62, 60, 60, 60, 60, 60],
    marks: { current: 65, max: 100, grade: "C+", lastUpdated: "3h ago" }, credits: 3 },
  { id: "s5", name: "Machine Learning", code: "CS401", platform: "rishiverse",
    attended: 30, total: 38, threshold: 75, trend: [76, 78, 79, 80, 79, 79, 79, 78.9],
    marks: { current: 84, max: 100, grade: "A", lastUpdated: "Just now" }, credits: 4 },
  { id: "s6", name: "Computer Networks", code: "CS308", platform: "canvas",
    attended: 33, total: 41, threshold: 75, trend: [80, 81, 80, 80, 81, 80, 80.5, 80.5],
    marks: { current: 78, max: 100, grade: "B+", lastUpdated: "1d ago" }, credits: 3 },
];

export const platforms = [
  { id: "lc", name: "LeetCode", username: "@aryan_dev", metric: "Problems Solved", value: "284", delta: "+12 this week", color: "from-amber-500 to-orange-500", visible: true },
  { id: "cf", name: "Codeforces", username: "@aryan_cf", metric: "Rating", value: "1486", delta: "+34 ↑ Specialist", color: "from-blue-500 to-indigo-500", visible: true },
  { id: "thm", name: "TryHackMe", username: "aryan", metric: "Rank", value: "Top 4%", delta: "Streak: 18d", color: "from-red-500 to-rose-500", visible: true },
  { id: "htb", name: "HackTheBox", username: "aryan_h", metric: "Pwned", value: "47", delta: "Hacker rank", color: "from-emerald-500 to-green-500", visible: true },
];

export const gradePoints = {
  "A+": 10, "A": 9, "B+": 8, "B": 7, "C+": 6, "C": 5, "D": 4, "F": 0,
};

export function scoreToGrade(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 75) return "B+";
  if (score >= 70) return "B";
  if (score >= 65) return "C+";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

