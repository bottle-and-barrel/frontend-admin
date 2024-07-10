"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";

export default function LoadingError({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-sm leading-tight", className)} {...props}>
      При загрузке данных произошла ошибка.{" "}
      <Button variant="link" onClick={(e) => window.location.reload()}>
        Обновить
      </Button>
    </div>
  );
}
