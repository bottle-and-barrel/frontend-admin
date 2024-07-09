import { Toast } from "@/components/ui/use-toast";

export const ok = (title: string = "Успешно", description?: string) => ({
  title,
  description,
});

export const error = (
  title: string = "Неизвестная ошибка",
  description?: string
): Toast => ({
  title,
  description,
  variant: "destructive",
});

export const unknownError = error(
  "Неизвестная ошибка",
  "Повторите попытку позже"
);
