import { useEffect, useState } from "react";


export default function ErrorValidateMessage({errors,processing } : {errors? : string[],processing:boolean}){
    const [showError,setShowError] = useState<string | null>(null);

    useEffect(()=>{
        setShowError(errors?.[0] ? errors?.[0] : "")

        const timeId = setTimeout(()=>{
            setShowError(null);
        },3000);
        return () => clearTimeout(timeId);
    },[errors?.[0],processing]);

    if(!showError) return ;
    return (
        <div style={{position:"absolute"}} className=" p-5 m-auto z-40">
            <p className="bg-black text-slate-300 text-[14px] px-3 py-1  rounded-md text-center">{showError} </p>
        </div>
    )
}