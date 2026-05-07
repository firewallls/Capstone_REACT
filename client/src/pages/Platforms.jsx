import { useEffect } from "react";
import { Boxes, Plus } from "lucide-react";
import { PlatformWidget } from "@/components/dashboard/PlatformWidget";
import { PlatformBadge } from "@/components/dashboard/PlatformBadge";
import { useDashboardStore } from "@/store/useDashboardStore";
import { subjects, academic } from "@/data/mock";
import { Separator } from "@/components/ui/separator";



export default function Platforms() {
  useEffect(() => { document.title = "Platforms — Synapse"; }, []);
  const platforms = useDashboardStore((s) => s.platforms);

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8">
        <div className="relative flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary grid place-items-center shrink-0 shadow-sm">
            <Boxes className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-1.5">Platforms</div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">One feed, <span className="text-primary">every account</span></h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">Connect academic portals and coding profiles. Synapse keeps them in sync.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Academic</h2>
            <span className="text-[11px] text-emerald-500 font-semibold uppercase tracking-wider">● Live sync</span>
          </div>
          <p className="text-sm text-muted-foreground">Newton + Rishiverse + Canvas.</p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {academic.map((p) => {
            const count = subjects.filter((s) => s.platform === p.id).length;
            return (
              <div key={p.id} className="relative overflow-hidden rounded-xl bg-card border border-border shadow-sm p-5 transition-all hover:shadow-md group">
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <PlatformBadge platform={p.id} />
                    <span className="text-[10px] text-emerald-500 font-semibold inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm" /> {p.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold tracking-tight">{p.name}</h3>
                  <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{p.tag}</div>
                  <p className="text-xs text-muted-foreground mt-3">{p.desc}</p>
                  <div className="mt-4 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">{count} subjects tracked</span>
                    <button className="font-semibold text-primary hover:opacity-80">Manage →</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Coding & cyber</h2>
          <p className="text-sm text-muted-foreground">Toggle visibility on your dashboard.</p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {platforms.map((p) => <PlatformWidget key={p.id} p={p} />)}
          <button className="rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 p-5 grid place-items-center text-muted-foreground hover:text-primary transition-all min-h-[140px] group">
            <div className="flex flex-col items-center gap-2">
              <div className="h-9 w-9 rounded-full border border-dashed border-current grid place-items-center group-hover:scale-110 transition-transform">
                <Plus className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold">Add Platform</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}