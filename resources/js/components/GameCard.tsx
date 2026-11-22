import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

interface GameCardType {
    game_name?: string;
    game_img?: string;
    game_code?: string;
}

export default function GameCard({
    game_name,
    game_img,
    game_code,
}: GameCardType) {
    const [loading,setLoading] = useState<boolean>(false);
    const { data, setData, post, processing } = useForm({
        game_code : game_code,
    });
    const handleClick = (e: any) => {
        setLoading(true)
        e.preventDefault();
        post('/launch_game', {
        onSuccess: () => {
            // console.log('game launch Successfully');
            setLoading(false);
        },
    });
    };
    return (
        <Link className="" onClick={(e) => handleClick(e)}>
            <img
                style={{ aspectRatio: 1 }}
                src={game_img}
                className="rounded-xl"
                alt=""
            />
            <p className="text-center text-[12px]">{game_name}</p>
        </Link>
    );
}
