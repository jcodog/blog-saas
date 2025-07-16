import { loadDbClient } from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  admin,
  magicLink,
  emailOTP,
  username,
  twoFactor,
} from "better-auth/plugins";

const prisma = loadDbClient({ database_url: process.env.DATABASE_URL! });

export const auth = betterAuth({
  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, type }) {
        // Implement the sendVerificationOTP method to send the OTP to the user's email address
      },
    }),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        // send email to user
      },
    }),
    username(),
    twoFactor(),
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },
});
