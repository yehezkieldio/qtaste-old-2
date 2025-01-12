import Link from "next/link";

import NavigationClient from "#/components/library/navigation-client";
import { auth } from "#/server/auth";

export default async function Navigation() {
    const session = await auth();

    return (
        <nav className="bg-background-secondary text-foreground shadow-md border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="font-sans font-semibold text-foreground hover:text-muted-foreground transition-colors duration-200"
                        >
                            QT
                        </Link>
                    </div>
                    <NavigationClient session={session} />
                </div>
            </div>
        </nav>
    );
}
