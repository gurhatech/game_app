import { Link } from "@inertiajs/react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Profile() {
    return (
        <div className="profile">
            <div className="flex justify-between items-center">
                <Link className="flex gap-2" href="/profile/3232232">
                    <div className="relative">
                        <div  style={{border:"3px solid var(--text-muted)"}} className="w-15 h-15 flex items-center justify-center bg-amber-700 rounded-full relative">
                            <b className="text-slate-300 text-2xl">A</b>
                        </div>
                    </div>
                    <div className="pt-1.5">
                        <p>Pamu23232322</p>
                        <div className="balance flex text-muted">
                            <p>₹100.00</p>
                            <KeyboardArrowRightIcon className="text-secondary cursor-pointer ml-3"/>
                        </div>
                    </div>
                </Link>
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
