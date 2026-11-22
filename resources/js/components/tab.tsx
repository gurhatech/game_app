import "../assets/css/tab.css";
import { Link,router, usePage } from "@inertiajs/react";
import IconSvg from "./Icons";

export default function Tab() {
    const {url} = usePage();

    const tabData = [
        {
            name: "Home",
            url: "/",
            icon: <IconSvg name="home" />,
        },
        {
            name: "Promo",
            url: "/promo",
            icon: <IconSvg name="promo" />,
        },
        {
            name: "Earn",
            url: "/earn",
            icon: <IconSvg name="earn" />,
        },
        {
            name: "Mine",
            url: "/mine",
            icon: <IconSvg name="mine" />,
        },
    ];
    return (
        <div className="bottom-nav">
            {tabData.map((tab, i) => (
                <Link
                    key={i}
                    className={`nav-item ${url === tab.url ? 'active' : ''}`}
                    href={tab.url}
                >
                    {tab.icon}
                    <span style={{ textTransform: "uppercase" }}>
                        {tab.name}
                    </span>
                </Link>
            ))}
        </div>
    );
}
