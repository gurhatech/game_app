import React, { useEffect, useState } from "react";
import { useForm} from "@inertiajs/react";

interface inputType 
extends React.InputHTMLAttributes<HTMLInputElement>{
    lable? : string,
    otpButton?:boolean,
    mobile?: string
}

export default function Input({lable = '',otpButton = false,mobile='',...props} : inputType){
    const { data,setData,post, processing} = useForm({
        mobile: '',
    });
    const [successMessage,setSuccessMessage] = useState<string>("");

    useEffect(()=>{
        setData((prev) => ({...prev,mobile:mobile}))
    },[mobile]);

    const sendOtp = ()=>{
        post('/send-otp',{
            onSuccess : () =>{
                setSuccessMessage("Otp Send Successfully.")
            }
        });
    }
    return (
        <div className="flex flex-col w-full px-5 relative">
            {lable && <label className="text-sm text-slate-300 px-1" htmlFor="">{lable}</label>}
            <input className="w-full h-12 bg-bg-first px-2 py-3 rounded-sm outline-0" {...props} />
            {otpButton && successMessage && <p className="text-sm text-green-700 px-2">{successMessage}</p>}
            {otpButton && <button
                            style={{
                                boxShadow:
                                    "inset 0px 0px 1px 1px rgba(193, 1, 1, 0.55)",
                                cursor: "pointer",
                                position:"absolute",
                                right:"30px",
                                top :"31px"
                            }}
                            disabled={processing}
                            type="button"
                            onClick={sendOtp}
                            className="bg-gradient-to-r from-bg-secondary to-bg-first px-3 text-[12px]  py-1 rounded-sm"
                        >
                            {processing ? "Sending" : "Send"}
                        </button>}
        </div>
    )
}