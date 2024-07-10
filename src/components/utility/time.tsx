"use client";

import { cn } from "@/lib/utils";
import moment from "moment";
import { HTMLAttributes, useEffect, useState } from "react";

export interface TimeProps extends HTMLAttributes<HTMLElement> {
  timeFormat?: string;
}

function formatTime(time: Date, format: string) {
  return moment(time).format(format);
}

export default function Time({
  timeFormat = "HH:mm DD.MM.YYYY",
  className,
  ...props
}: TimeProps) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <p
      className={cn("text-muted-foreground text-sm font-light", className)}
      suppressHydrationWarning
      {...props}
    >
      {formatTime(time, timeFormat)}
    </p>
  );
}
