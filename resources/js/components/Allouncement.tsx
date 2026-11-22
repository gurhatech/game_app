import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useState, useEffect } from "react";
import "../assets/css/allouncement.css";

export default function Announcement() {
    const [randomNumber, setRandomNumber] = useState<number>();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const announcements = [110, 500, 110];

    useEffect(() => {
        if (paused) return;

        const next = () => {
            setIndex((prev) => (prev + 1) % announcements.length);
        };

        const previous = () => {
            setIndex(
                (prev) =>
                    (prev - 1 + announcements.length) % announcements.length,
            );
            setRandomNumber(Math.floor(Math.random() * 100000));
        };

        const timer = setInterval(previous, 3000);

        return () => clearInterval(timer);
    }, [paused]);

    return (
        <div>
            <div style={{height:"3px"}} className="w-full bg-muted shadow-game"></div>
            <div
                className="announcement w-full shadow-game px-2"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className="announcement-window">
                    <div
                        className="announcement-list"
                        style={{
                            transform: `translateY(-${index * 40}px)`,
                            transition: index === announcements.length - 1 ? "" : `transform 0.6s ease-in-out`,
                        }}
                    >
                        {announcements.map((item, i) => (
                            <div className="announcement-item" key={i}>
                                <p
                                    style={{ fontSize: "12px" }}
                                >
                                    <VolumeUpIcon className="text-muted text-sm"/>{" "}
                                    Player{randomNumber} successfully withdraws
                                    ₹{item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{height:"3px"}} className="w-full bg-orange-500 shadow-game"></div>
        </div>
    );
}
