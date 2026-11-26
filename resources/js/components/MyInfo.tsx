import { Auth } from '@/types';
import { usePage } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';

interface props {
    onClose : () => void,
    setshowMyinfo : any
}

export default function MyInfo({setshowMyinfo,onClose} : props){
    const {auth} = usePage<Auth>().props;
    return (
        <div 
        style={{background:"rgba(0,0,0,0.9)"}}
        className="flex items-center justify-center fixed left-0 right-0 top-0 w-screen min-h-screen z-50 ">
            <div style={{position:"relative",border:"2px solid var(--text-muted)"}} className="w-[90%] bg-bg-primary flex flex-col items-center justify-center gap-4 bg-bg-primary px-3 py-10 rounded-2xl">
                <span onClick={onClose} className="absolute top-2 right-3 text-xl p-2 cursor-pointer"><CloseIcon/></span>
                <div className='flex flex-col gap-3'>
                    <p className='flex gap-10 items-center justify-between text-left'><span className='text-muted'>Id:</span><span className='text-slate-300'>{auth.user.uid}</span></p>
                    <p className='flex gap-10 items-center justify-between text-left'><span className='text-muted'>Name:</span><span className='text-slate-300'>{auth.user.name}</span></p>
                    <p className='flex gap-10 items-center justify-between text-left'><span className='text-muted'>Number:</span><span className='text-slate-300'>{auth.user.mobile}</span></p>
                    <p className='flex gap-10 items-center justify-between text-left'><span className='text-muted'>Balance:</span><span className='text-slate-300'>{auth.user.balance}</span></p>
                </div> 
            </div>
        </div>
    )
}