"use client";

import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "../ui/link";
import Portal from "../utility/portal";
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
  return (
    <Portal to={`#${BreadcrumbsTargetID}`}>
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
      </Breadcrumb>
    </Portal>
  );
}
