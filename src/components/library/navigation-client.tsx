"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

import type { Session } from "next-auth";

import { Menu } from "lucide-react";

import { Button } from "#/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "#/components/ui/sheet";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Add Bookmark", href: "/about" },
    { name: "Browse", href: "/services" }
];

interface NavigationClientProps {
    session: Session | null;
}

export default function NavigationClient({ session }: NavigationClientProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="hidden md:flex items-center">
                {/* {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="ml-8 text-sm font-sans font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
                    >
                        {item.name}
                    </Link>
                ))} */}
                {/* {session ? (
                    <Button variant="outline" onClick={() => signOut()} className="ml-8">
                        Sign out
                    </Button>
                ) : (
                    <Button variant="outline" onClick={() => signIn()} className="ml-8">
                        Sign in
                    </Button>
                )} */}
            </div>
            {/* <div className="md:hidden flex items-center">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetTitle hidden={true}>QT</SheetTitle>
                        <div className="flex flex-col space-y-4 mt-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {session ? (
                                <Button variant="outline" onClick={() => signOut()} className="mt-4">
                                    Sign out
                                </Button>
                            ) : (
                                <Button variant="outline" onClick={() => signIn()} className="mt-4">
                                    Sign in
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div> */}
        </>
    );
}
