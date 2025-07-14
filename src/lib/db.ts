import { PrismaClient } from "../prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const loadDbClient = ({ database_url }: { database_url: string }) => {
	return new PrismaClient({
		datasourceUrl: database_url,
	}).$extends(withAccelerate());
};
