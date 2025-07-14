import { loadDbClient } from "@/lib/db";
import { env } from "hono/adapter";
import { jstack } from "jstack";

interface Env {
	Bindings: {
		DATABASE_URL: string;
		DIRECT_URL: string;
	};
}

export const j = jstack.init<Env>();

const dbMiddleware = j.middleware(async ({ c, next }) => {
	const { DATABASE_URL } = env(c);

	const db = loadDbClient({ database_url: DATABASE_URL });

	return await next({ db });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure.use(dbMiddleware);
