import { useLocation, NavLink } from "react-router";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    CalendarCheck,
    GraduationCap,
    BookOpen,
    Boxes,
    Settings,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/", badge: "12" },
    { icon: CalendarCheck, label: "Attendance", path: "/attendance" },
    { icon: BookOpen, label: "Marks", path: "/marks" },
    { icon: GraduationCap, label: "Learning", path: "/learning" },
    { icon: Boxes, label: "Platforms", path: "/platforms" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar collapsible="icon" className="border-r border-border/60 bg-sidebar/80 backdrop-blur-xl">
            <SidebarHeader className="flex flex-row items-center gap-3 p-4 h-16 border-b border-border/60">
                <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center shadow-glow shrink-0">
                    <Sparkles className="h-4.5 w-4.5 text-primary-foreground" />
                </div>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-bold tracking-tight">Synapse</span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Student Intel</span>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-3">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {menuItems.map(({ icon: Icon, label, path, badge }) => (
                                <SidebarMenuItem key={label}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === path}
                                        className={cn(
                                            "px-3 py-5 rounded-lg transition-all relative group",
                                            location.pathname === path
                                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                : "hover:bg-sidebar-accent/50"
                                        )}
                                    >
                                        <NavLink to={path}>
                                            {location.pathname === path && (
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-primary" />
                                            )}
                                            <Icon className="h-4.5 w-4.5 shrink-0" />
                                            <span className="font-medium group-data-[collapsible=icon]:hidden">{label}</span>
                                            {badge && (
                                                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary group-data-[collapsible=icon]:hidden">
                                                    {badge}
                                                </span>
                                            )}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-3 border-t border-border/60">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer group">
                    <div className="h-8 w-8 rounded-full bg-primary grid place-items-center text-xs font-bold text-primary-foreground shrink-0">
                        AR
                    </div>
                    <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                        <div className="text-xs font-semibold truncate">Aryan Rao</div>
                        <div className="text-[10px] text-muted-foreground truncate">B.Tech CSE · Sem 5</div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
