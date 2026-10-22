import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names with Tailwind conflict resolution. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
