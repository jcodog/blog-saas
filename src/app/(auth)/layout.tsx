import React from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * Renders a centered, responsive container for authentication-related pages.
 *
 * @param children - The content to display within the layout
 * @returns The layout component wrapping the provided children
 */
function layout({ children }: Props) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}

export default layout;
