import { headers } from "next/headers";

/**
 * Gets the base domain of the incoming request.
 *
 * Looks at the "X-Forwarded-Host" header first, and if that's not set, looks
 * at the "Host" header. If neither is set, returns an empty string.
 *
 * @returns The base domain of the incoming request, or an empty string if
 * it can't be determined.
 */
const getBaseDomain = async (): Promise<string> => {
  const headersObj = await headers();
  const forwardedHost = headersObj.get("x-forwarded-host");
  const hostHeader = forwardedHost || headersObj.get("host");

  if (!hostHeader || hostHeader === "") {
    return "";
  }

  const hostname = (hostHeader.split(":")[0] || "").trim().toLowerCase();
  return hostname;
};

/**
 * Gets the base domain of the incoming request.
 *
 * Looks at the "X-Forwarded-Host" header first, and if that's not set, looks
 * at the "Host" header. If neither is set, returns an empty string.
 *
 * @returns The base domain of the incoming request, or an empty string if
 * it can't be determined.
 */

export const getDomain = async () => {
  return await getBaseDomain();
};
