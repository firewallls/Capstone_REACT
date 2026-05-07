import { Sparkles } from "lucide-react";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { AttendanceCard } from "@/components/dashboard/AttendanceCard";
import { MarksCard } from "@/components/dashboard/MarksCard";
import { subjects } from "@/data/mock";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const setSelectedSubject = useDashboardStore((s) => s.setSelectedSubject);

  useEffect(() => {
    document.title = "Synapse — Student Intelligence Dashboard";
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Welcome back, <span className="text-primary">Newton</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Unified view across Newton, Rishiverse and Canvas — make smarter academic decisions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/40 border border-border text-[11px]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet-500 shadow-sm" /> Newton</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm" /> Rishiverse</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500 shadow-sm" /> Canvas</span>
              </div>
              <button
                onClick={() => setSelectedSubject(subjects[0].id)}
                className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
              >
                <Sparkles className="h-4 w-4" /> Open Simulator
              </button>
            </div>
      </section>

      <OverviewCards subjects={subjects} />

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Attendance</h2>
          <p className="text-sm text-muted-foreground">Per-subject health with skip headroom.</p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {subjects.map((s) => <AttendanceCard key={s.id} subject={s} />)}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Marks</h2>
          <p className="text-sm text-muted-foreground">Latest scores synced across platforms.</p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {subjects.map((s) => <MarksCard key={s.id} subject={s} />)}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;