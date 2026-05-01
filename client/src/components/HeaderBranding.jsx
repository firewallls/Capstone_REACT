import { useSidebar } from "@/components/ui/sidebar";

export function HeaderBranding() {
    const { open } = useSidebar();

    return (
        <div className={`
                flex items-center gap-2
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${open ? "max-w-40 opacity-100 ml-0" : "max-w-0 opacity-0 -ml-1"}
        `}
        >
            <img
                src="/logo-header.png"
                alt="logo"
                className="h-8 w-8"
            />
            <div>
                <a href="#" className="flex flex-col whitespace-nowrap">
                    <h1 className="text-sm font-semibold leading-tight">DFwehd</h1>
                    <h2 className="text-xs text-muted-foreground leading-tight">
                        erhfhf
                    </h2>
                </a>
            </div>
        </div>
    );
}