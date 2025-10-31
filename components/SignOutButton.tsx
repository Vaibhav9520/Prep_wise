"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.action";

const SignOutButton = () => {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await signOut();
            router.push("/sign-in");
        } catch (error) {
            console.error("Sign out error:", error);
            setIsSigningOut(false);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="text-sm hover:text-primary-200 disabled:opacity-50"
        >
            {isSigningOut ? "Signing out..." : "Sign Out"}
        </button>
    );
};

export default SignOutButton;