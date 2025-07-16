import "@/styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { JStackProvider } from "@/components/providers/jstack";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "JStack App",
  description: "Created using JStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/**
 * Defines the root layout for the application, applying global providers, theming, and notification support.
 *
 * Wraps all pages with `JStackProvider` for app-wide context, `ThemeProvider` for system-based theming, and includes a `Toaster` for notifications.
 *
 * @param children - The React nodes representing the page content to be rendered within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JStackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

          <Toaster position="top-right" richColors />
        </JStackProvider>
      </body>
    </html>
  );
}
