import Profile from "@/components/Profile";
import Topbar from "@/components/Topbar";
import { Link, useForm, usePage } from "@inertiajs/react";
import "../assets/css/diposit.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MailIcon from '@mui/icons-material/Mail';
import InfoIcon from '@mui/icons-material/Info';
import CommitIcon from '@mui/icons-material/Commit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BackpackIcon from '@mui/icons-material/Backpack';
import BindMobile from "@/components/BindMobile";
import { FormEvent, useState } from "react";
import Version from "@/components/Version";
import { Auth } from "@/types";
import MyInfo from "@/components/MyInfo";

export default function ProfilePage() {
    const [bindModel,setBindModel] = useState<boolean>(false);
    const [showVersion,setShowVersion] = useState(false);
    const [showMyinfo,setshowMyinfo] = useState<boolean>(false);
    const {auth} = usePage<Auth>().props;
    const {post} = useForm();

    const onClose = ()=>{
        setBindModel(false);
        setshowMyinfo(false)
    }
  
    return (
        <>
            {showMyinfo && <MyInfo onClose={onClose} setshowMyinfo={setshowMyinfo}/> }
            {showVersion && <Version showVersion={showVersion} setShowVersion={setShowVersion} />}
            {bindModel && <BindMobile onClose={onClose} setBindModel={setBindModel}/>}
            <Topbar title="Profile" />
            <div className="mb-3"></div>
            <Profile />
            <section className="balances my-3">
                <Link className="balance-card blue" href="/diposit">
                    <span className="label">Total Balance</span>
                    <span className="amount">₹{auth.user.balance}</span>
                    <span className="rupee-watermark">₹</span>
                </Link>
                <Link className="balance-card green" href="/withdraw">
                    <span className="label">Withdrawable</span>
                    <span className="amount">₹0.00</span>
                    <span className="rupee-watermark">◇</span>
                </Link>
            </section>
            <ul className="flex flex-col">
                <li 
                    style={{borderBottom:"2px solid var(--muted)"}} 
                    className="w-full text-muted py-3 px-2 flex justify-between item-center">
                        <div className="flex gap-4">
                            <span className=""><MailIcon/></span>
                            <Link  href="/mail" className="">Notification</Link>
                        </div>
                        <span className=""><KeyboardArrowRightIcon/></span>
                </li>
                <li 
                    style={{borderBottom:"2px solid var(--muted)"}} 
                    className="w-full text-muted py-3 px-2 flex justify-between item-center">
                        <div onClick={()=>setshowMyinfo(true)} className="flex items-center justify-center gap-4 ">
                            <span className=""><InfoIcon/></span>
                            <button className="cursor-pointer">My Info</button>
                        </div>
                        <span className=""><KeyboardArrowRightIcon/></span>
                </li>
                <li 
                    style={{borderBottom:"2px solid var(--muted)"}} 
                    className="w-full text-muted py-3 px-2 flex justify-between item-center">
                        <div className="flex gap-4 cursor-pointer">
                            <span className="cursor-pointer"><CommitIcon/></span>
                            <button onClick={()=>setBindModel(true)} className="cursor-pointer">Bind Mobile Number</button>
                        </div>
                        <span className=""><KeyboardArrowRightIcon/></span>
                </li>
                <li 
                    style={{borderBottom:"2px solid var(--muted)"}} 
                    className="w-full text-muted py-3 px-2 flex justify-between item-center">
                        <div className="flex gap-4">
                            <span className=""><AccountBalanceWalletIcon/></span>
                            <Link  href="/transaction/withdraw" className="">Balance Details</Link>
                        </div>
                        <span className=""><KeyboardArrowRightIcon/></span>
                </li>
                <li 
                    style={{borderBottom:"2px solid var(--muted)"}} 
                    className="w-full text-muted py-3 px-2 flex justify-between item-center">
                        <div className="flex gap-4">
                            <span className=""><SupportAgentIcon/></span>
                            <Link  href="/support" className="">Live Support</Link>
                        </div>
                        <span className=""><KeyboardArrowRightIcon/></span>
                </li>
                <li 
                    style={{borderBottom:"2px solid var(--muted)"}} 
                    className="w-full text-muted py-3 px-2 flex justify-between item-center">
                        <div className="flex gap-4">
                            <span className=""><AutoStoriesIcon/></span>
                            <Link  href="/about-us" className="">About Us</Link>
                        </div>
                        <span className=""><KeyboardArrowRightIcon/></span>
                </li>
                <li 
                    style={{borderBottom:"2px solid var(--muted)"}} 
                    className="w-full text-muted py-3 px-2 flex justify-between item-center">
                        <div className="flex gap-4 cursor-pointer">
                            <span className=""><BackpackIcon/></span>
                            <button className="cursor-pointer">Version</button>
                        </div>
                        <span className=""><KeyboardArrowRightIcon/></span>
                </li>
            </ul>
            <button
                            style={{
                                boxShadow:
                                    "inset 0px 0px 1px 1px rgba(193, 1, 1, 0.55)",
                                cursor: "pointer",
                                position:"absolute",
                                right:"50%",
                                transform:"translatex(50%)",
                                bottom :"10px",
                                marginTop:"10px",
                            }}
                            type="button"
                            onClick={()=>post("/logout")}
                            className="bg-gradient-to-r from-bg-secondary to-bg-first px-8  py-3 rounded-xl"
                        >
                            LogOut
                        </button>
        </>
    );
}
