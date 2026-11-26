import type { ReactNode } from "react";
import FlashMessage from "@/components/FlashMessage";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <FlashMessage/>
            {children}
        </>
    )
}