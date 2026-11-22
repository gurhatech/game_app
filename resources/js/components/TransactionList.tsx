import { Link } from "@inertiajs/react"
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function TransactionList(){
    return (
        <div style={{boxShadow:"5px 2px 20px #222",position:"relative"}} 
        className="w-[calc(100% - 10px)] m-2 bg-bg-first pl-15 pr-5 py-1 rounded-xl">
            <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#c8787d]">2026-12-10 10:00:30</span>
                <span><Link href="/support"><SupportAgentIcon className="text-muted scale-80"/></Link></span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-300">Order Id: WQ2WW2134344332WWD</span>
                <span className="text-muted text-[12px]">Cash: +100</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-300">Method: PhonePay</span>
                <span className="text-slate-300 text-[12px]">Bonus: 18</span>
            </div>
            <div className="flex justify-between items-center">
                <span></span><span className="w-full text-right text-[12px] text-green-500 tracking-[1px]">Succes</span>
            </div>
            <div style={{position:"absolute",top:"50%",left:"15px", transform:"translateY(-50%)"}}>
                {false ? <CancelIcon className="text-red-600 scale-150"/>  :<CheckCircleIcon className="text-green-500 scale-150"/> }
            </div>
        </div>
    )
}