"use client";

import { cn } from "@/lib/utils";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export interface LinkProps
  extends NextLinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  activeClassName?: string;
}

const Link = React.forwardRef<React.ElementRef<typeof NextLink>, LinkProps>(
  ({ className, children, activeClassName, ...props }, ref) => {
    const pathname = usePathname();

    const isActive = props.href === pathname || props.as === pathname;
    const mergedClassName = cn(className, isActive && activeClassName);

    return (
      <NextLink className={mergedClassName} ref={ref} {...props}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";

export default Link;
