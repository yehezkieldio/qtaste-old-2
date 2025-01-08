import Navbar from "#/components/navbar";
import { Button } from "#/components/ui/button";
import { auth } from "#/server/auth";

export default async function Home() {
    const session = await auth();

    return (
        <>
            <Navbar session={session} />
            <main className="h-min bg-backgroundSecondary overflow-x-hidden mx-8 border-l border-r">
                <section className="h-[calc(100vh-4rem)] w-full flex flex-col md:items-center md:justify-center antialiased overflow-hidden px-2">
                    <div className="flex flex-col max-w-4xl justify-center ">
                        <p className="text-sm text-[#c1cbce] font-light font-mono">Bookmarking With Extra Steps</p>
                        <h1 className="mt-3 tracking-tight font-medium text-3xl bg-gradient-to-r from-[#EFF2FF] to-[#BCD2FA] inline-block text-transparent bg-clip-text">
                            Literally a glorified manual bookmarking system for fanfictions.
                        </h1>
                        <p className="mt-2 tracking-tight font-normal text-lg text-[#99abb6]">
                            I&apos;ve read too many fanfictions to keep track of, so I made this site to help me keep
                            track of them.
                        </p>
                        <div className="mt-4">
                            <Button variant="outline">Login with Discord</Button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
