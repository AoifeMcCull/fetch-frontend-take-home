import * as React from "react";
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
    >
        <div className="h-full w-full rounded-[inherit] overflow-y-auto scrollbar-thin">
            {children}
        </div>
    </div>
));
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex touch-none select-none transition-colors",
            "bg-transparent hover:bg-border/50",
            "h-2 w-full",
            className
        )}
        {...props}
    >
        <div className="relative flex-1 rounded-full bg-border/20" />
    </div>
));
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
