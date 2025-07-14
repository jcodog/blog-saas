import { loadDbClient } from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

const prisma = loadDbClient({ database_url: process.env.DATABASE_URL! });

export const auth = betterAuth({
	plugins: [admin()],
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
});
