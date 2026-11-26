import Topbar from "@/components/Topbar";
import { type FormEvent } from "react";
import Button from "@/components/Button";
import { useForm,Link } from "@inertiajs/react";
import Input from "@/components/Input";
import AppLayout from "@/layout/AppLayout";
import ErrorValidateMessage from "@/components/ErrorValidateMessage";

export default function Login() {
    const { data, setData, post, errors,processing } = useForm({
        mobile: "",
        otp: "",
    });

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        post("/login", {
            onSuccess: () => {
                console.log("success");
            },
        });
    };

    return (
        <AppLayout>
            <Topbar title="Login" />
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
                 <Link className="w-full px-5 text-sm text-left text-muted" href="/register">Don't have account?</Link>
                <div className="w-full px-5 mt-19 absolute bottom-10">
                    <Button
                        disabled={processing}
                        onClick={handleLogin}
                        className="btn mb-5"
                        type="submit"
                        title={processing ? "processing..." : "Sign Up/Sign In"}
                    />
                </div>
            </form>
        </AppLayout>
    );
}
