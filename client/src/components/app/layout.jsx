import { useLocation, NavLink, Outlet } from "react-router";
import {
    SidebarProvider,
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
    SidebarInset,
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    CalendarCheck,
    BookOpenCheck,
    GraduationCap,
    MonitorPlay,
    Settings,
} from "lucide-react";
import { HeaderBranding } from "@/components/HeaderBranding.jsx";
import { FooterBranding } from "@/components/FooterBranding.jsx";
import { ModeToggle } from "@/components/mode-toggle";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: CalendarCheck, label: "Attendance", path: "/attendance" },
    { icon: BookOpenCheck, label: "Marks", path: "/marks" },
    { icon: GraduationCap, label: "Learning", path: "/learning" },
    { icon: MonitorPlay, label: "Platforms", path: "/platforms" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

function Layout() {
    const location = useLocation();

    return (
        <SidebarProvider>
            {/* Desktop sidebar – hidden off‑canvas on mobile */}
            <Sidebar collapsible="icon">
                <SidebarHeader className="flex flex-row items-center gap-2 p-2">
                    <HeaderBranding />
                    <SidebarTrigger className="ml-auto" />
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.map(({ icon: Icon, label, path }) => (
                                    <SidebarMenuItem key={label}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={location.pathname === path}
                                        >
                                            <NavLink to={path}>
                                                <Icon className="h-4 w-4" />
                                                <span>{label}</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <FooterBranding />
                </SidebarFooter>
            </Sidebar>
            <ModeToggle />
            {/* Main content area – visible on all screen sizes */}
            <SidebarInset className="flex-1">
                {/* Mobile header with trigger + theme toggle */}
                <header className="flex items-center justify-between p-2 md:hidden">
                    <SidebarTrigger />
                    <ModeToggle />
                </header>

                {/* Page content */}
                <div className="p-6 pt-2">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Layout;