import { useEffect, useState } from "react";
import { Settings as SettingsIcon, Bell, Moon, Shield, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { StatTile } from "@/components/dashboard/StatTile";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  useEffect(() => { document.title = "Settings — Synapse"; }, []);
  const [notif, setNotif] = useState({ low: true, exams: true, materials: false, weekly: true });

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8">
        <div className="relative flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary grid place-items-center shrink-0 shadow-sm">
            <SettingsIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-1.5">Settings</div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Make it <span className="text-primary">yours</span></h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">Theme, alerts, account — all in one place.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 rounded-2xl bg-card border border-border shadow-sm p-5 flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary grid place-items-center text-base font-bold text-primary-foreground shadow-sm">AR</div>
          <div className="min-w-0">
            <div className="text-sm font-bold truncate">Aryan Rao</div>
            <div className="text-[11px] text-muted-foreground truncate">aryan.rao@uni.edu</div>
            <div className="text-[10px] text-muted-foreground mt-1">B.Tech CSE · Sem 5 · Roll 21BCE0492</div>
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-3 gap-3">
          <StatTile label="Day streak" value="18" accent="primary" />
          <StatTile label="Synced platforms" value="7" accent="primary" />
          <StatTile label="Skips left" value="12" accent="safe" />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Appearance</h2>
          <p className="text-sm text-muted-foreground">Pick a vibe.</p>
        </div>
        <Separator className="opacity-50" />
        <div className="rounded-2xl bg-card border border-border shadow-sm p-5 space-y-4">
          <Row icon={Moon} label="Dark mode" desc="Always on. Light mode coming soon.">
            <Switch checked disabled />
          </Row>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Notifications</h2>
          <p className="text-sm text-muted-foreground">What should ping you?</p>
        </div>
        <Separator className="opacity-50" />
        <div className="rounded-2xl bg-card border border-border shadow-sm divide-y divide-border">
          <Row icon={Shield} label="Low attendance alerts" desc="Ping me when any subject drops below 78%.">
            <Switch checked={notif.low} onCheckedChange={(v) => setNotif((n) => ({ ...n, low: v }))} />
          </Row>
          <Row icon={Bell} label="Upcoming exams" desc="3-day countdown reminders.">
            <Switch checked={notif.exams} onCheckedChange={(v) => setNotif((n) => ({ ...n, exams: v }))} />
          </Row>
          <Row icon={Bell} label="New materials" desc="Notify on Rishiverse / Canvas drops.">
            <Switch checked={notif.materials} onCheckedChange={(v) => setNotif((n) => ({ ...n, materials: v }))} />
          </Row>
          <Row icon={Bell} label="Weekly digest" desc="Sunday recap of your academic week.">
            <Switch checked={notif.weekly} onCheckedChange={(v) => setNotif((n) => ({ ...n, weekly: v }))} />
          </Row>
        </div>
      </section>

      <section className="pb-10">
        <button className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-destructive/10 text-destructive border border-destructive/30 text-sm font-semibold hover:bg-destructive/20 transition-colors">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </section>
    </div>
  );
}

function Row({ icon: Icon, label, desc, children }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="h-9 w-9 rounded-lg bg-secondary grid place-items-center text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-[11px] text-muted-foreground">{desc}</div>
      </div>
      {children}
    </div>
  );
}