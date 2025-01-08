import "#/styles/globals.css";

import { type Metadata } from "next";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "#/trpc/react";

export const metadata: Metadata = {
    title: "QuestionableTaste",
    description: "Your personal fanfiction reading list and tracker.",
    icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
            <body className="bg-background text-foreground">
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
