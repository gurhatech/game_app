import { Link } from "@inertiajs/react";
import React from "react";
interface TopbarType {
    title?: string;
    redirectUrl: string;
    leftComponent?: React.ReactNode;
}

export default function Topbar({
    title,
    redirectUrl,
    leftComponent,
}: TopbarType) {
    if (redirectUrl) {
        return (
            <header
                style={{ padding: "0 20px",borderBottom:"1px solid var(--bg-first)" }}
                className="w-screen flex justify-between items-center h-14 z-20 bg-bg-primary fixed top-0 left-0 right-0"
            >
                <Link href={redirectUrl} className="text-4xl" aria-label="Back">
                    ‹
                </Link>
                <h1  className="text-xl capitalize text-slate-300">{title}</h1>
                <div>
                    {leftComponent && <>{leftComponent}</>}
                </div>
            </header>
        );
    }
}
