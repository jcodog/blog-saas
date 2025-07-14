import type { Metadata } from "next";
import { Providers } from "./components/providers";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "JStack App",
	description: "Created using JStack",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">
				<Providers>
					{children}
					<Toaster position="top-right" richColors />
				</Providers>
			</body>
		</html>
	);
}
