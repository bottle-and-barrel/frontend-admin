"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({
  to,
  children,
}: React.PropsWithChildren<{ to: string }>) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => setTarget(document.querySelector(to) as HTMLElement), [to]);
  if (!target) return null;
  return createPortal(children, target);
}
