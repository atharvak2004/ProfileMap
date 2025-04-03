// Import the clsx and tailwind-merge libraries for composing class names
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class names together and resolve Tailwind CSS conflicts
 * @param  {...any} inputs - Class names to merge
 * @returns {string} - Merged class names with Tailwind conflicts resolved
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}