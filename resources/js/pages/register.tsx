import Topbar from "@/components/Topbar";
import { useState, type FormEvent } from "react";
import Button from "@/components/Button";
import { Link, useForm,usePage } from "@inertiajs/react";
import Input from "@/components/Input";
import ErrorValidateMessage from "@/components/ErrorValidateMessage";

export default function Register() {

    const { flash } = usePage<{ flash?: { success?:string,error?:string } }>().props;
    const { data, setData, post, errors,processing } = useForm({
        mobile: "",
        otp: "",
    });

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        post("/register", {
            onSuccess: () => {
                console.log("success");
            },
        });
    };

    const handleGuestLogin = ()=>{
        post('/guest-login',{
            
        });
    }

    return (
        <>
            <Topbar title="Register" />
            <form
                className="w-screen h-[70vh] flex flex-col gap-3 items-center justify-center"
            >
                <ErrorValidateMessage errors={Object.values(errors)} processing={processing} />
                <Input 
                onChange={(e)=>setData((prev)=>({...prev,mobile:e.target.value.slice(0,10)}))}
                type="number"
                value={data.mobile}
                name="mobile"
                placeholder="Enter mobile no." 
                lable="Phone No :"
                />
                <Input 
                onChange={(e)=>setData((prev)=>({...prev,otp:e.target.value.slice(0,6)}))}
                type="number"
                value={data.otp}
                name="otp"
                placeholder="Enter vailed otp." 
                lable="OTP :" 
                otpButton={true} 
                mobile={data.mobile}
                />
                <Link className="w-full px-5 text-sm text-left text-muted" href="/login">You have already account?</Link>
                <div className="w-full px-5 mt-19 absolute bottom-10">
                    <Button
                        disabled={processing}
                        onClick={handleLogin}
                        className="btn mb-5"
                        type="submit"
                        title={processing ? "processing..." : "Sign Up/Sign In"}
                    />
                    <Button
                        className="btn-disable"
                        title="Login With Guest"
                        onClick={handleGuestLogin}
                        type="button"
                    />
                </div>
            </form>
        </>
    );
}
