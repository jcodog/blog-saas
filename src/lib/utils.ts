import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
 * Delete a cookie by name in the browser.
 * @param name Cookie name
 * @param options Optional path/domain to match how it was set
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
 * Clear session cookie client-side and notify server to destroy the session.
 * @param cookieName Name of the session cookie (e.g. "mySessionCookie")
 * @param logoutUrl Server endpoint to call (e.g. "/api/logout")
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

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, ""); // Remove non-digits

  if (cleaned.length !== 10) return phone; // Return original if not 10 digits

  const area = cleaned.slice(0, 3);
  const middle = cleaned.slice(3, 6);
  const last = cleaned.slice(6, 10);

  return `(${area}) ${middle}-${last}`;
}

export function cleanAndValidatePhoneNumber(input: string): string | null {
  const cleaned = input.replace(/\D/g, ""); // Remove all non-numeric characters

  return cleaned.length === 10 ? cleaned : null;
}


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