import { Separator } from "@/components/ui/separator";

export function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <Separator className="opacity-50 mt-2" />
    </div>
  );
}
