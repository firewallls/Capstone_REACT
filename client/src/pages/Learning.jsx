import { useEffect } from "react";
import { BookOpen, FileText, Video, Link2, Clock, Download } from "lucide-react";
import { PlatformBadge } from "@/components/dashboard/PlatformBadge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const materials = [
  { id: "m1", title: "Heap Sort — visual walkthrough", subject: "Data Structures", type: "video", platform: "canvas", duration: "18 min", new: true },
  { id: "m2", title: "Linear Algebra cheat-sheet", subject: "Linear Algebra", type: "pdf", platform: "rishiverse", duration: "6 pages" },
  { id: "m3", title: "Process scheduling notes", subject: "Operating Systems", type: "pdf", platform: "canvas", duration: "12 pages", new: true },
  { id: "m4", title: "ML — Bias vs Variance", subject: "Machine Learning", type: "video", platform: "rishiverse", duration: "24 min" },
  { id: "m5", title: "REST APIs reference", subject: "Web Development", type: "link", platform: "canvas", duration: "external" },
  { id: "m6", title: "TCP handshake explained", subject: "Computer Networks", type: "video", platform: "canvas", duration: "9 min" },
  { id: "m7", title: "Eigenvalues — practice set", subject: "Linear Algebra", type: "pdf", platform: "rishiverse", duration: "20 problems", new: true },
  { id: "m8", title: "OS lab assignment 4", subject: "Operating Systems", type: "link", platform: "canvas", duration: "due Fri" },
];

const typeMap = {
  pdf: { icon: FileText, cls: "bg-pink-500/15 text-pink-500" },
  video: { icon: Video, cls: "bg-blue-500/15 text-blue-500" },
  link: { icon: Link2, cls: "bg-emerald-500/15 text-emerald-500" },
};

export default function Learning() {
  useEffect(() => { document.title = "Learning — Synapse"; }, []);

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8">
        <div className="relative flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary grid place-items-center shrink-0 shadow-sm">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-1.5">Learning</div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Materials, <span className="text-primary">made findable</span></h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">Every PDF, video and link from Rishiverse + Canvas, in one feed.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "New this week", value: materials.filter(m => m.new).length, cls: "text-pink-500" },
          { label: "PDFs", value: materials.filter(m => m.type === "pdf").length, cls: "text-blue-500" },
          { label: "Videos", value: materials.filter(m => m.type === "video").length, cls: "text-emerald-500" },
          { label: "Links", value: materials.filter(m => m.type === "link").length, cls: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-4">
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
            <div className={cn("text-2xl font-bold mt-1 tabular-nums", s.cls)}>{s.value}</div>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Recent drops</h2>
          <p className="text-sm text-muted-foreground">Synced from Rishiverse + Canvas.</p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {materials.map((m) => {
            const T = typeMap[m.type];
            return (
              <div
                key={m.id}
                className="group rounded-xl bg-card border border-border shadow-sm p-4 flex items-center gap-4 transition-all hover:shadow-md"
              >
                <div className={cn("h-11 w-11 rounded-lg grid place-items-center shrink-0", T.cls)}>
                  <T.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <PlatformBadge platform={m.platform} />
                    {m.new && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-500">New</span>
                    )}
                  </div>
                  <div className="text-sm font-semibold truncate">{m.title}</div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>{m.subject}</span>
                    <span className="opacity-50">·</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{m.duration}</span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity h-9 w-9 rounded-md hover:bg-secondary/60 grid place-items-center text-muted-foreground hover:text-foreground">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}