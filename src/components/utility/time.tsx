"use client";

import { cn } from "@/lib/utils";
import { TooltipProps } from "@radix-ui/react-tooltip";
import moment from "moment";
import { HTMLAttributes, useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const TimeFormatDefault = "HH:mm DD.MM.YYYY";

export interface TimeProps extends HTMLAttributes<HTMLElement> {
  timeFormat?: string;
}
export interface TimeFromNowProps extends TooltipProps {
  unix: number;
  timeFormat?: string;
}

function formatTime(time: Date | number, format: string) {
  if (typeof time === "number") return moment.unix(time).format(format);
  return moment(time).format(format);
}

export function Time({
  timeFormat = TimeFormatDefault,
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

export function TimeFromNow({
  unix,
  timeFormat = TimeFormatDefault,
  ...props
}: TimeFromNowProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger>{moment.unix(unix).fromNow()}</TooltipTrigger>
      <TooltipContent>{formatTime(unix, timeFormat)}</TooltipContent>
    </Tooltip>
  );
}
