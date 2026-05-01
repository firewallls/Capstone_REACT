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
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    CalendarCheck,
    BookOpenCheck,
    GraduationCap,
    MonitorPlay,
    Settings,
    ChevronRight,
} from "lucide-react";
import { HeaderBranding } from "@/components/HeaderBranding.jsx";
import { FooterBranding } from "@/components/FooterBranding.jsx";

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
                                {[
                                    { icon: LayoutDashboard, label: "Dashboard" },
                                    { icon: CalendarCheck, label: "Attendance" },
                                    { icon: BookOpenCheck, label: "Marks" },
                                    { icon: GraduationCap, label: "Learning" },
                                    { icon: MonitorPlay, label: "Platforms" },
                                    { icon: Settings, label: "Settings" },
                                ].map(({ icon: Icon, label }) => (
                                    <SidebarMenuItem key={label}>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <Icon className="h-4 w-4" />
                                                <span>{label}</span>
                                            </a>
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
        </SidebarProvider>
    );
}

export default Layout;