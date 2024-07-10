import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import moment from "moment";
import "moment/locale/ru";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateMomentLocale() {
  moment.locale("ru");
}

export function toFormData(object: Record<any, any>) {
  return Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
}
