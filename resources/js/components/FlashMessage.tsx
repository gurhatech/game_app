import { usePage,useForm } from "@inertiajs/react"
import { useEffect, useState } from "react";

interface messageTypes {
    type : string | undefined,
    text:string | undefined
}

export default function FlashMessage(){
    const {flash} = usePage<{flash?:{success?:string,error?:string}}>().props;
    const [message,setMessage] = useState<messageTypes | null>(null);
    const { processing } = useForm({});

    useEffect(()=>{
        const types = ['success','error'] as const;
        const activeType = types.find(type=>flash?.[type]);
        if(activeType){
            setMessage({
                type : activeType,
                text : flash?.[activeType]
            });
        }

    },[flash,processing]);

    if(!message) return ;

    return (
        <div style={{background:"rgba(0,0,0,0.8"}} className="flex flex-col items-center justify-center fixed w-screen h-screen inset-0 z-50">
            <div style={{border:"2px solid var(--text-muted)",position:"relative"}} className="w-[80%] h-50 flex items-center justify-center rounded-2xl bg-gradient-to-t from-bg-first to-bg-secondary px-2 py-4">
                <span style={{borderTop:"2px solid var(--text-muted)",borderLeft:"2px solid var(--text-muted)"}} className="bg-bg-secondary w-5 h-5 rotate-45 absolute top-[-11px]"></span>
                <span onClick={()=>setMessage(null)} className="absolute right-1 top-0 p-3 text-xl cursor-pointer">X</span>
                <p className="text-cent text-center">{message.text}</p>
            </div>      
        </div>
    )
}