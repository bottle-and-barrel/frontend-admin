"use client";

import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "../ui/link";
import { BreadcrumbsTargetID } from "./page-header";

interface Breadcrumb {
  title: string;
  href: string;
}
export type Breadcrumbs = Breadcrumb[];
export interface PageBreadcrumbsProps {
  breadcrumbs?: Breadcrumbs;
}

export default function PageBreadcrumbs({
  breadcrumbs = [],
}: PageBreadcrumbsProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => setTarget(document.getElementById(BreadcrumbsTargetID)), []);

  if (!target) return null;
  return createPortal(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" activeClassName="text-primary">
              Панель управления
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((item, i) => (
          <Fragment key={i}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.href} activeClassName="text-primary">
                  {item.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>,
    target
  );
}
