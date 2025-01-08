import React from "react";
import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "#/components/icons";
import { signIn } from "#/server/auth";

interface HomeNavbarProps {
    session: Session | null;
}

const HomeNavbar: React.FC<HomeNavbarProps> = (props: HomeNavbarProps) => {
    const session = props.session;

    return (
        <nav className="bg-background text-foreground border-b">
            <div className="flex justify-between">
                <div className="flex items-center p-4 border-r logo">
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={30}
                            height={30}
                            className="mr-2 transition-opacity duration-200 hover:opacity-80 group-hover:opacity-80"
                        />
                        <span className="hidden bg-gradient-to-r hover:font-medium font-semibold uppercase font-mono from-[#A4C7D9] to-[#ACC2CE] hover:from-[#FF58E4] hover:to-[#F394EB] tracking-tight md:inline-block text-transparent bg-clip-text transition-all duration-200">
                            Questionable_Taste
                        </span>
                    </Link>
                </div>
                <div className="items-center p-4 border-l ml-auto hidden md:flex">
                    <Link href="/">
                        <Icons.github className="w-6 h-6 text-gray-400 hover:text-[#FF58E4] transition-colors duration-200" />
                    </Link>
                </div>
                <div className="flex items-center p-4 border-l ">
                    {session ? (
                        <a href="/library">
                            <Icons.user className="w-6 h-6 text-gray-400 hover:text-[#FF58E4] transition-colors duration-200" />
                        </a>
                    ) : (
                        <button
                            onClick={async () => {
                                "use server";
                                await signIn("discord", { redirectTo: "/library" });
                            }}
                        >
                            <Icons.login className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-200" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default HomeNavbar;
