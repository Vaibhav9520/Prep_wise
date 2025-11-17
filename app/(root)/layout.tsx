import Link from "next/link";
import { ReactNode } from "react";
import SignOutButton from "@/components/SignOutButton";

const Layout = ({ children }: { children: ReactNode }) => {
  // Auth check now handled by middleware for better performance

  return (
    <div className="min-h-screen bg-white">
      <nav className="nav">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-fresh rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-gradient">PlaceMate AI</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/interview/personalized" className="nav-link hidden md:block">
              AI Interview
            </Link>
            <Link href="/profile/cv-upload" className="nav-link hidden md:block">
              Upload CV
            </Link>
            <Link href="/system-status" className="nav-link hidden md:block">
              Profile
            </Link>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
