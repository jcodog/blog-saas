import { auth } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Server component for the sign-in page that redirects authenticated users to the home page or renders the sign-in interface for unauthenticated users.
 *
 * @returns The sign-in view React element if no user session exists; otherwise, triggers a redirect to the home page.
 */
async function page({}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }
  return <SignInView />;
}

export default page;