import Profile from "@/components/Profile";
import Slider from "@/components/Slider";
import { Head, usePage} from "@inertiajs/react";
import Tab from "@/components/tab";
import Gamelogo from "@/components/Gamelogo";
import Allouncement from "@/components/Allouncement";
import GameLobby from "@/components/GameLobby";
import PopupRegister from "@/components/PopupRegister";
import { useEffect, useState } from "react";
import { Auth } from "@/types";

export default function Welcome() {
    const {auth} = usePage<Auth>().props;
    const [showPopup,setShowPopup] = useState<boolean>(false);

    const onClose = ()=>{
        setShowPopup(false);
    }

    useEffect(()=>{
        const timeId = setTimeout(() => {
            if(!auth.user){
                setShowPopup(true);
            }
        }, 3000);
        return ()=> clearTimeout(timeId);
    },[]);

    return (
        <>
            <Head title="Welcome" />
            {showPopup && <PopupRegister onClose={onClose} setShowPopup={setShowPopup}/>}
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
