import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(val: string) {
  const words = val.split(" ");

  return words
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");
}
