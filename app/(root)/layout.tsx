import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import SignOutButton from "@/components/SignOutButton";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PrepWise Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/interview/personalized" className="text-sm hover:text-primary-200">
            AI Interview
          </Link>
          <Link href="/profile/cv-upload" className="text-sm hover:text-primary-200">
            Upload CV
          </Link>
          <Link href="/system-status" className="text-sm hover:text-primary-200">
            Status
          </Link>
          <SignOutButton />
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
