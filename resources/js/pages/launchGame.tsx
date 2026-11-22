import Topbar from "@/components/Topbar";
import { usePage } from "@inertiajs/react";
export default function LaunchGame() {
    const { flash } = usePage<{ flash?: { url?: string,success?:string,error?:string } }>().props;
    console.log(flash?.error);

    if (flash?.url) {
        return (
            <div className="w-screen">
                <Topbar title="Game" redirectUrl="/" />
                <iframe
                    id="game_frame"
                    src={flash?.url}
                    title=""
                    width="100%"
                    height="90%"
                    allowFullScreen
                    className="border-0"
                />
            </div>
        );
    } else {
        return (
        <>
        <Topbar title="Game" redirectUrl="/" />
        <div className="w-full h-[80vh] flex item-center justify-center">Game Not Found!</div>
        </>
    );
    }
}
