import { useForm, usePage } from "@inertiajs/react";
import Button from "./Button";
import Input from "./Input";
import { FormEvent } from "react";
import ErrorValidateMessage from "./ErrorValidateMessage";
import CloseIcon from '@mui/icons-material/Close';
import { Auth } from "@/types";

interface props {
    onClose : () => void,
    setBindModel : any
}

export default function BindMobile({onClose,setBindModel} : props){
    const {flash,auth} = usePage<{flash?:{success?:string}}>().props
    const {data,setData,post,processing,errors,reset,clearErrors} = useForm({
        mobile : "",
        otp : ""
    });

    const handleSubmit = (e : FormEvent)=>{
        e.preventDefault();
        post('/bind-mobile',{
            onSuccess : ()=>{
                reset();
                clearErrors()
                setBindModel(false)
            }
        })
    }

    return (
        <div 
        style={{background:"rgba(0,0,0,0.9)"}}
        className="flex items-center justify-center fixed left-0 right-0 top-0 w-screen min-h-screen z-50 ">
            {auth.user.is_guest ? <form style={{position:"relative",border:"2px solid var(--text-muted)"}} method="post" className="w-[90%] bg-bg-primary flex flex-col items-center justify-center gap-4 bg-bg-primary px-3 py-10 rounded-2xl">
                <span onClick={onClose} className="absolute top-2 right-3 text-xl p-2 cursor-pointer"><CloseIcon/></span>
                <h1 className="text-center text-slate-200 text-2xl mb-5">Bind Mobile Number</h1>
                <ErrorValidateMessage errors={Object.values(errors)} processing={processing}/>
                <Input 
                onChange={(e)=>setData((prev)=>({...prev,mobile:e.target.value}))}
                value={data.mobile || auth?.user?.mobile}
                type="number"
                placeholder="Enter mobile number" 
                lable="Mobile Number:" />
                <Input 
                onChange={(e)=>setData((prev)=>({...prev,otp:e.target.value}))}
                value={data.otp}
                type="number"
                placeholder="Enter vailid otp." 
                otpButton={true} 
                mobile={data.mobile}
                lable="OTP:" />
                <Button disabled={processing} style={{width:"calc(90vw - 60px)", margin:"auto"}} onClick={handleSubmit} className="btn" type="submit" title={processing ? "Binding" :"Bind Number" }/>
            </form> :<form style={{position:"relative",border:"2px solid var(--text-muted)"}} method="post" className="w-[90%] bg-bg-primary flex flex-col items-center justify-center gap-4 bg-bg-primary px-3 py-10 rounded-2xl"> 
                <span onClick={onClose} className="absolute top-2 right-3 text-xl p-2 cursor-pointer"><CloseIcon/></span>
                <Input 
                onChange={(e)=>setData((prev)=>({...prev,mobile:e.target.value}))}
                value={data.mobile || auth?.user?.mobile}
                type="number"
                placeholder="Enter mobile number" 
                lable="Mobile Number:" />
            </form>}
            
        </div>
    )
}