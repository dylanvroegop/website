import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "navbar" | "footer";
};

export function BrandLogo({ className, size = "navbar" }: BrandLogoProps) {
  const isNavbar = size === "navbar";

  return (
    <div className={cn("flex flex-col select-none", className)}>
      <span
        className={cn(
          "font-black tracking-tight text-[hsl(158,93%,40%)] uppercase leading-none",
          isNavbar ? "text-2xl" : "text-xl opacity-80 group-hover:opacity-100 transition-opacity"
        )}
      >
        CALVORA
      </span>
      <span
        className={cn(
          "flex items-center gap-2 uppercase leading-none mt-1 text-[hsl(158,93%,40%)] whitespace-nowrap",
          isNavbar ? "text-[0.55rem] font-bold tracking-[0.2em]" : "text-[0.45rem] font-bold tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity"
        )}
      >
        <span className="h-px bg-[hsl(158,93%,40%)]/60 w-6" aria-hidden="true" />
        <span className="flex items-center gap-1">
          <span className="opacity-90">STOP MET GOKKEN.</span>
          <span className="font-black">BEGIN MET VERDIENEN.</span>
        </span>
        <span className="h-px bg-[hsl(158,93%,40%)]/60 w-6" aria-hidden="true" />
      </span>
    </div>
  );
}
