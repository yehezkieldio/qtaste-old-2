import { type Session } from "next-auth";

import Home from "#/components/home";
import { auth } from "#/server/auth";

export default async function HomePage() {
    const session: Session | null = await auth();

    return (
        <>
            <Home.Navbar session={session} />
            <Home.Hero session={session} />
        </>
    );
}
