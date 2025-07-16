import { auth } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Server-side React component for the sign-up page.
 *
 * Redirects authenticated users to the home page. If no user session is found, renders the sign-up interface.
 */
async function page({}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }
  return <SignUpView />;
}

export default page;