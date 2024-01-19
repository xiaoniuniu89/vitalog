"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Auth() {
    return (
        <div className="flex items-center justify-end space-x-4">
            <SignedIn>
                <UserButton afterSignOutUrl="/"/>
            </SignedIn>
            <SignedOut>
                <SignInButton afterSignInUrl="/dashboard"/>
            </SignedOut>
        </div>
    );
}