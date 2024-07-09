import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export default function PageFooter({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn("flex h-full items-center justify-center py-2", className)}
      {...props}
    >
      <p className="text-muted-foreground/50 text-sm">© 2024 mzhn-team</p>
    </footer>
  );
}
