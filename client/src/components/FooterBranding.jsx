import { useSidebar } from "@/components/ui/sidebar";

export function FooterBranding() {
    const { open } = useSidebar();

    return (
        <div className="flex items-center gap-2 p-2">
            <img
                src="/logo-footer.png"
                alt="logo"
                className="h-6 w-6"
            />
            <div
                className={`
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${open ? "max-w-32 opacity-100" : "max-w-0 opacity-0"}
        `}
            >
                <div className="flex flex-col whitespace-nowrap">
                    <h1 className="text-xs font-semibold leading-tight">DFwehd</h1>
                    <h2 className="text-[10px] text-muted-foreground leading-tight">
                        erhfhf
                    </h2>
                </div>
            </div>
        </div>
    );
}