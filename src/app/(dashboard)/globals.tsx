import { HTMLAttributes } from "react";

export const LayoutSearchContainerID = "layout-search-container";
export const PageSearchContainerID = "page-search-container";

export function PageSearchContainer(props: HTMLAttributes<HTMLDivElement>) {
  return <div id={PageSearchContainerID} {...props} />;
}

export function LayoutSearchContainer(props: HTMLAttributes<HTMLDivElement>) {
  return <div id={LayoutSearchContainerID} {...props} />;
}
