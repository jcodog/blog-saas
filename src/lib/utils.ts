import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values into a single string, merging Tailwind CSS classes intelligently.
 *
 * Accepts any number of class values, flattens and deduplicates them, and resolves Tailwind CSS class conflicts.
 *
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a random six-digit code.
 * @returns A six-digit number ranging from 100000 to 999999.
 */

export const generateSixDidgetCode = () =>
  Math.floor(100000 + Math.random() * 900000);

/**
 * Deletes a browser cookie by name, optionally specifying path and domain to match the original cookie scope.
 *
 * @param name - The name of the cookie to delete
 * @param options - Optional object specifying the path and domain for the cookie
 */
export function deleteCookie(
  name: string,
  options: { path?: string; domain?: string } = {}
) {
  const { path = "/", domain } = options;
  // Set the cookie’s expiration in the past to remove it
  document.cookie = [
    `${encodeURIComponent(name)}=`,
    `Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `Path=${path}`,
    domain ? `Domain=${domain}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/**
 * Deletes a session cookie in the browser and sends a POST request to a server logout endpoint to terminate the session.
 *
 * @param cookieName - The name of the session cookie to delete
 * @param logoutUrl - The server endpoint to notify for session termination (defaults to "/api/logout")
 */
export async function clearSession(
  cookieName: string,
  logoutUrl: string = "/api/logout"
) {
  // 1. Delete the cookie in the browser
  deleteCookie(cookieName, { path: "/" });

  // 2. Call your logout endpoint to destroy the session server-side
  try {
    await fetch(logoutUrl, {
      method: "POST",
      // include credentials so server sees any other cookies/headers
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error calling logout endpoint:", err);
  }
}

/**
 * Formats a 10-digit phone number string into the pattern `(XXX) XXX-XXXX`.
 *
 * If the input does not contain exactly 10 digits after removing non-numeric characters, returns the original input string.
 *
 * @param phone - The phone number string to format
 * @returns The formatted phone number, or the original input if not exactly 10 digits
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, ""); // Remove non-digits

  if (cleaned.length !== 10) return phone; // Return original if not 10 digits

  const area = cleaned.slice(0, 3);
  const middle = cleaned.slice(3, 6);
  const last = cleaned.slice(6, 10);

  return `(${area}) ${middle}-${last}`;
}

/**
 * Cleans a phone number string by removing all non-numeric characters and returns the result if it contains exactly 10 digits.
 *
 * @param input - The phone number string to clean and validate
 * @returns The cleaned 10-digit phone number string, or null if the result does not have exactly 10 digits
 */
export function cleanAndValidatePhoneNumber(input: string): string | null {
  const cleaned = input.replace(/\D/g, ""); // Remove all non-numeric characters

  return cleaned.length === 10 ? cleaned : null;
}


/**
 * Returns the full current URL including origin, path, query, and hash if running in a browser environment.
 *
 * @returns The current URL as a string, or an empty string if not in a browser context.
 */
export function getCurrentUrl(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const origin = window.location.origin;
  const path =
    window.location.pathname + window.location.search + window.location.hash;

  return origin + path;
}


export const deleteLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};