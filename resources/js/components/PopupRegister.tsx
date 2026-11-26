import { useForm,Link } from "@inertiajs/react";
import Button from "./Button";
import Input from "./Input";
import { FormEvent } from "react";
import ErrorValidateMessage from "./ErrorValidateMessage";
import CloseIcon from '@mui/icons-material/Close';

interface props {
    onClose : () => void,
    setShowPopup : any
}

export default function PopupRegister({onClose,setShowPopup} : props){
    const {data,setData,post,processing,errors,reset,clearErrors} = useForm({
        mobile : "",
        otp : ""
    });

    const handleSubmit = (e : FormEvent)=>{
        e.preventDefault();
        post('/register',{
            onSuccess : ()=>{
                reset();
                clearErrors()
                setShowPopup(false)
            }
        })
    }

    const loginWithGuest = ()=>{
        post('/guest-login',{
            onSuccess:()=>{
                setShowPopup(false);
            }
        });
    }

    return (
        <div 
        style={{background:"rgba(0,0,0,0.9)"}}
        className="flex items-center justify-center fixed left-0 right-0 top-0 w-screen min-h-screen z-30 ">
            <form style={{position:"relative",border:"2px solid var(--text-muted)"}} method="post" className="w-[90%] bg-bg-primary flex flex-col items-center justify-center gap-4 bg-bg-primary px-3 py-10 rounded-2xl">
                <span onClick={onClose} className="absolute top-2 right-3 text-xl p-2 cursor-pointer"><CloseIcon/></span>
                <h1 className="text-center text-slate-200 text-2xl mb-5">Welcome Back</h1>
                <ErrorValidateMessage errors={Object.values(errors)} processing={processing}/>
                <Input 
                onChange={(e)=>setData((prev)=>({...prev,mobile:e.target.value}))}
                value={data.mobile}
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
                 <Link className="w-full px-5 text-sm text-left text-muted" href="/login">You have already account?</Link>
                <Button disabled={processing} style={{width:"calc(90vw - 60px)", margin:"auto"}} onClick={handleSubmit} className="btn" type="submit" title={processing ? "Processing..." :"Sign Up/Sign In" }/>
                <Button style={{width:"calc(90vw - 60px)", margin:"auto"}} onClick={loginWithGuest} className="btn-disable" type="button" title="Login With Guest"/>
            </form>
        </div>
    )
}