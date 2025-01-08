import Navbar from "#/components/navbar";
import { auth } from "#/server/auth";

export default async function Home() {
    const session = await auth();

    return (
        <>
            <Navbar session={session} />
            <div className="p-8">
                <h1>Hello, Dashboard!</h1>
            </div>
        </>
    );
}
