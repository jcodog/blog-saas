import { createAuthClient } from "better-auth/react";
import {
  magicLinkClient,
  twoFactorClient,
  usernameClient,
  emailOTPClient,
} from "better-auth/client/plugins";
import { getCurrentUrl } from "./utils";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { loadDbClient } from "./db";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL:
    getCurrentUrl().split("/").slice(0, 3).join("/") ||
    process.env.NEXT_PUBLIC_APP_URL,
  scheme: process.env.NEXT_PUBLIC_APP_NAME || "BlogIt",
  version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  disableCache: process.env.NEXT_PUBLIC_DISABLE_CACHE === "true",
  plugins: [
    emailOTPClient(),
    magicLinkClient(),
    usernameClient(),
    twoFactorClient(),
  ],
  database: prismaAdapter(loadDbClient, {
    provider: "postgresql",
  }),
});
