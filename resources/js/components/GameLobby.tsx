import GameCard from "./GameCard";
import { Games } from "../data/GameData";
import { useState } from "react";


export default function GameLobby() {
    const [gameData, setGameData] = useState(Games);
    const [category,setCategory] = useState<string>('hote')
    function categoryBySearch(category: string) {
        setCategory(category);
        setGameData(Games.filter((game) => game.category === category));
        if(category == "hote"){
            setGameData(Games)
        }
    }

    return (
        <div style={{overflow:"auto",height:"100%"}} className="flex gap-1 justify-between ">
            <div className="category relative">
                <div
                    style={{ flexDirection: "column" }}
                    className="fixed flex gap-3 text-[12px] "
                >
                    <div 
                    id="category" 
                    className={category == 'hote' ? 'active' : ''} onClick={() => categoryBySearch('hote')}>
                        <img src="/images/category/hote.png" alt="" />
                        <p>Hote</p>
                    </div>
                    <div
                        className={category == 'Casino' ? 'active' : ''}
                        id="category"
                        onClick={() => categoryBySearch("Casino")}
                    >
                        <img style={{marginLeft:'3px',height:"35px"}} width={45} src="/images/category/casino.png" alt="" />
                        <p style={{marginTop:"-2px"}}>Casino</p>
                    </div>
                    <div
                        className={category == 'Slots' ? 'active' : ''}
                        id="category"
                        onClick={() => categoryBySearch("Slots")}
                    >
                        <img src="/images/category/slot.png" alt="" />
                        <p>Slot</p>
                    </div>
                    <div
                        className={category == 'Table' ? 'active' : ''}
                        id="category"
                        onClick={() => categoryBySearch("Table")}
                    >
                        <img src="/images/category/game.png" alt="" />
                        <p style={{marginTop:"-5px"}}>Game</p>
                    </div>
                    <div
                        className={category == 'Fishing' ? 'active' : ''}
                        id="category"
                        onClick={() => categoryBySearch("Fishing")}
                    >
                        <img src="/images/category/fishing.png" alt="" />
                        <p>Fishing</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pr-3 pl-18 h-full">
                {gameData &&
                    gameData.map((game, i) => (
                        <div key={i}>
                            <GameCard
                                game_name={game?.game_name}
                                game_img={game?.game_img}
                                game_code={game.game_code}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}
