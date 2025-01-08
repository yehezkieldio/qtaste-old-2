import React from "react";
import { type Session } from "next-auth";
import Link from "next/link";

import { Icons } from "#/components/icons";
import { Button, buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { signIn } from "#/server/auth";

interface HomeHeroProps {
    session: Session | null;
}

const HomeHero: React.FC<HomeHeroProps> = (props: HomeHeroProps) => {
    const session = props.session;

    return (
        <main className="h-min bg-background-secondary overflow-x-hidden mx-2 md:mx-8 border-l border-r">
            <section className="h-[calc(100vh-4rem)] w-full flex flex-col md:items-center md:justify-center antialiased overflow-hidden px-2">
                <div className="flex flex-col max-w-4xl justify-center ">
                    <p className="text-sm text-[#c1cbce] font-light font-mono">Bookmarking With Extra Steps</p>
                    <h1 className="mt-3 tracking-tight font-medium text-3xl bg-gradient-to-r from-[#EFF2FF] to-[#BCD2FA] inline-block text-transparent bg-clip-text">
                        Literally a glorified manual bookmarking system for fanfictions.
                    </h1>
                    <p className="mt-2 tracking-tight font-normal text-lg text-[#99abb6]">
                        I&apos;ve read too many fanfictions to keep track of, so I made this site to help me keep track
                        of them.
                    </p>
                    <div className="mt-4 flex flex-row gap-4">
                        {session ? (
                            <Link
                                href="/library"
                                className={cn(
                                    buttonVariants({
                                        variant: "outline"
                                    }),
                                    "px-6"
                                )}
                            >
                                <Icons.user className="w-6 h-6" />
                                View Library
                            </Link>
                        ) : (
                            <Button
                                className={cn(
                                    buttonVariants({
                                        variant: "outline"
                                    }),
                                    "px-4"
                                )}
                                onClick={async () => {
                                    "use server";
                                    await signIn("discord", { redirectTo: "/library" });
                                }}
                            >
                                <Icons.discord className="w-6 h-6" />
                                Login with Discord
                            </Button>
                        )}
                        <Link
                            href="/api/auth/discord"
                            className={cn(
                                buttonVariants({
                                    variant: "ghost"
                                }),
                                "px-4"
                            )}
                        >
                            Star on GitHub
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomeHero;
