import { Link } from "@inertiajs/react";
import Logo from "../assets/Hero51 Royal Casino Emblem.png";
import MailIcon from '@mui/icons-material/Mail';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function Gamelogo() {
    return (
        <div className="w-full pt-5 flex justify-between items-center">
            <div className="logo text-muted flex gap-1 w-fit cursor-pointer">
                <img width={20} height={20} src="/images/Hero51 Royal Casino Emblem.png" />
                HERO51
            </div>
            <div className="flex gap-2">
                <Link href="/mail"><MailIcon className="text-muted"/></Link>
                <Link href="/support"><SupportAgentIcon className="text-muted"/></Link>
            </div>
        </div>
    );
}
