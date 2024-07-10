import { LayoutSearchContainer } from "@/app/(dashboard)/globals";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Time } from "../utility/time";
import SheetNavigation from "./sheet-navigation";

export const BreadcrumbsTargetID = "breadcrumbs-target";

export default function PageHeader({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "grid grid-cols-[50px_1fr_50px] items-center border-b px-4 py-2 sm:py-4 sm:grid-cols-2 md:grid-cols-3",
        className
      )}
      {...props}
    >
      <SheetNavigation triggerClass="sm:hidden" />
      <div id={BreadcrumbsTargetID}></div>
      <Time className="hidden justify-self-center md:block" />
      <div>
        <LayoutSearchContainer />
      </div>
    </header>
  );
}
