import "@/styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { JStackProvider } from "@/components/providers/jstack";

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
				<JStackProvider>
					{children}
					<Toaster position="top-right" richColors />
				</JStackProvider>
			</body>
		</html>
	);
}
