import { Link, usePage } from "@inertiajs/react";
import { type Auth } from "@/types";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Profile() {
    const {auth} = usePage<Auth>().props;
    
    return (
        <div style={{width:"calc(100vw - 40px)"}} className="profile">
            <div className="flex justify-between items-center">
                {auth.user ? <Link className="flex gap-2" href="/profile/3232232">
                    <div className="relative">
                        <div  style={{border:"3px solid var(--text-muted)"}} className="w-15 h-15 flex items-center justify-center bg-amber-700 rounded-full relative">
                            <b className="text-slate-300 text-2xl">{auth.user.name.slice(0,1)}</b>
                        </div>
                    </div>
                    <div className="pt-1.5">
                        <p>{auth.user.name}</p>
                        <div className="balance flex text-muted">
                            <p>₹{auth.user.balance}</p>
                            <KeyboardArrowRightIcon className="text-secondary cursor-pointer ml-3"/>
                        </div>
                    </div>
                </Link> : <div></div>}
                <div className="flex gap-2">
                    <Link href="/diposit">
                        <img width={40} src="/images/Glossy Purple Wallet Deposit Icon.png" alt="" />
                    </Link>
                    <Link href="/withdraw">
                        <img width={40} src="/images/Glossy Purple Wallet Withdraw Icon.png" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
