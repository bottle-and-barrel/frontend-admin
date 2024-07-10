import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import SheetNavigation from "./sheet-navigation";

export const BreadcrumbsTargetID = "breadcrumbs-target";

export default function PageHeader({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "flex justify-between border-b px-4 py-2 sm:py-4",
        className
      )}
      {...props}
    >
      <SheetNavigation triggerClass="sm:hidden" />
      <div id={BreadcrumbsTargetID}></div>
    </header>
  );
}
