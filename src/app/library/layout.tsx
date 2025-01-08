import { type Session } from "next-auth";
import { redirect } from "next/navigation";

import { auth } from "#/server/auth";

export default async function LibraryLayout({ children }: { children: React.ReactNode }) {
    const session: Session | null = await auth();
    if (!session) redirect("/");

    return <>{children}</>;
}
