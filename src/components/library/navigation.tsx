import NavigationClient from "#/components/library/navigation-client";
import { auth } from "#/server/auth";

export default async function Navigation() {
    const session = await auth();

    return (
        <nav className="bg-background text-foreground shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">QT</div>
                    <NavigationClient session={session} />
                </div>
            </div>
        </nav>
    );
}
