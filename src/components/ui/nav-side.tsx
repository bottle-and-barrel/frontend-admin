"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import Link, { LinkProps } from "./link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export interface SideNavigationLinkProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
}

const SideNavigation = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <aside
      className={cn("flex w-14 flex-col divide-y border-r", className)}
      ref={ref}
      {...props}
    />
  );
});
SideNavigation.displayName = "SideNavigation";

const SideNavigationSection = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <nav
      className={cn("flex flex-col items-center gap-4 px-2 sm:py-5", className)}
      ref={ref}
      {...props}
    />
  );
});
SideNavigationSection.displayName = "SideNavigationSection";

const SideNavigationLink = ({
  title,
  className,
  activeClassName,
  children,
  ...props
}: SideNavigationLinkProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={cn(
            "text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
            className
          )}
          activeClassName={cn(
            "bg-accent text-accent-foreground",
            activeClassName
          )}
          {...props}
        >
          {children}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
};

export { SideNavigation, SideNavigationLink, SideNavigationSection };
