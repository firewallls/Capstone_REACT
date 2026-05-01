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
import { NavLink, Outlet } from "react-router";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: CalendarCheck, label: "Attendance", path: "/attendance" },
    { icon: BookOpenCheck, label: "Marks", path: "/marks" },
    { icon: GraduationCap, label: "Learning", path: "/learning" },
    { icon: MonitorPlay, label: "Platforms", path: "/platforms" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

function Layout() {


    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                {/* Header: trigger always visible, branding only when expanded */}
                <SidebarHeader className="flex flex-row items-center gap-2 p-2">
                    <HeaderBranding />
                    <SidebarTrigger className={"ml-auto"} />
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

                {/* Footer: small logo always visible, text only when expanded */}
                <SidebarFooter>
                    <FooterBranding />
                </SidebarFooter>
            </Sidebar>
            <SidebarInset className="flex-1 p-6">
                <Outlet />   {/* ← Route pages render here */}
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Layout;