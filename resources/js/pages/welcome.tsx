import Profile from "@/components/Profile";
import Slider from "@/components/Slider";
import { Head, Link,usePage } from "@inertiajs/react";
import Tab from "@/components/tab";
import Gamelogo from "@/components/Gamelogo";
import Allouncement from "@/components/Allouncement";
import GameLobby from "@/components/GameLobby";

export default function Welcome() {
    const { flash } = usePage<{ flash?: { url?: string,success?:string,error?:string } }>().props;
    console.log(flash?.error);

    return (
        <>
            <Head title="Welcome" />
            <div id="h">
                <Gamelogo />
                <Slider />
                <Allouncement />
                <Profile />
                <GameLobby />
                <Tab />
            </div>
        </>
    );
}
