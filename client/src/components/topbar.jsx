import { Bell, Search, Command } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 h-16 px-5 md:px-8 flex items-center gap-4 bg-background/70 backdrop-blur-xl border-b border-border/60">
      <SidebarTrigger className="-ml-1" />
      
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search subjects, materials, platforms…"
            className="w-full h-10 pl-10 pr-16 rounded-lg bg-secondary/40 border border-border/60 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/60 transition-all"
          />
          <kbd className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 text-[10px] text-muted-foreground bg-background/60 px-1.5 py-0.5 rounded border border-border">
            <Command className="h-3 w-3" /> K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <button className="relative h-10 w-10 grid place-items-center rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-destructive animate-pulse-glow ring-2 ring-background" />
        </button>
        <div className="h-9 w-9 rounded-full bg-primary grid place-items-center text-xs font-bold text-primary-foreground cursor-pointer ring-2 ring-background shadow-sm hover:opacity-90 transition-opacity">
          N
        </div>
      </div>
    </header>
  );
}
