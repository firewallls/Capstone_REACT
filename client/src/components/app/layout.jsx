import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { SimulatorPanel } from "@/components/simulators/SimulatorPanel";
import { subjects } from "@/data/mock";
import { ModeToggle } from "@/components/mode-toggle";

function Layout() {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 min-w-0 flex flex-col">
          <Topbar />
          <main className="flex-1 px-5 md:px-8 py-6 space-y-8">
            <Outlet />
          </main>
          <div className="fixed bottom-4 right-4 z-50">
            <ModeToggle />
          </div>
        </SidebarInset>
        <SimulatorPanel subjects={subjects} />
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default Layout;