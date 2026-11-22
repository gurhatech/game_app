import Topbar from "@/components/Topbar";
import { useState, type FormEvent } from "react";
import Button from "@/components/Button";
import { Link,useForm } from "@inertiajs/react";

export default function Login() {
    const [toggle, setToggle] = useState<boolean>(false);
    const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
    const { data, setData, post, processing } = useForm({
            name : `Player${Math.floor(Math.random()*100000)}`,
            phone_no:'',
            password : '',
            otp : ''
        });
    
    const handleLogin = (e:FormEvent)=>{
        e.preventDefault();
        console.log(data)
        post('/login',{
            onSuccess : ()=>{
                console.log('success')
            }
        })

    }

    return (
        <>
            <Topbar title="Login" redirectUrl="/" />
            <form
                onClick={handleLogin}
                style={{
                    padding: "0 20px",
                    minHeight: "80vh",
                    flexDirection: "column",
                }}
                className="flex items-center justify-center w-screen gap-3"
            >
                <div className="bg-bg-secondary px-5 py-2 rounded w-full">
                    <input
                        className="w-full outline-0"
                        onChange={(e)=>setData((prev)=>({...prev,phone_no:e.target.value}))}
                        name="phone_no"
                        type="text"
                        placeholder="Enter your phone no."
                    />
                </div>
                {passwordToggle ? (
                    <div className="bg-bg-secondary px-5 py-2 rounded w-full relative">
                        <input
                            className="outline-0 w-full"
                            onChange={(e)=>setData((prev)=>({...prev,otp:e.target.value}))}
                            name="otp"
                            type="text"
                            placeholder="Enter the verification code."
                        />
                        <button className="bg-bg-first px-4 py-1 rounded-sm shadow-2xl absolute right-4 bottom-[7px] cursor-pointer hover:bg-amber-700 text-[12px]">
                            Send
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-bg-secondary px-5 py-2 rounded w-full relative">
                        <input
                            className="outline-0 w-full"
                            onChange={(e)=>setData((prev)=>({...prev,password:e.target.value}))}
                            name="password"
                            type={!toggle ? "password" : "text"}
                            placeholder="Please Enter Password"
                        />
                        <button
                            onClick={() => setToggle((prev) => !prev)}
                            className="px-4 py-1 absolute right-1 bottom-[6px] cursor-pointer text-xl"
                        >
                            {toggle ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    >
                                        <path d="M6.873 17.129c-1.845-1.31-3.305-3.014-4.13-4.09a1.69 1.69 0 0 1 0-2.077C4.236 9.013 7.818 5 12 5c1.876 0 3.63.807 5.13 1.874" />
                                        <path d="M14.13 9.887a3 3 0 1 0-4.243 4.242M4 20L20 4M10 18.704A7.1 7.1 0 0 0 12 19c4.182 0 7.764-4.013 9.257-5.962a1.694 1.694 0 0 0-.001-2.078A23 23 0 0 0 19.57 9" />
                                    </g>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    >
                                        <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19s-7.764-4.013-9.257-5.962a1.69 1.69 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5s7.764 4.013 9.257 5.962" />
                                        <circle cx="12" cy="12" r="3" />
                                    </g>
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="w-full text-right text-cent text-shadow-2xs text-sm cursor-pointer">
                        <Link className="w-full pr-3">Forgot Password</Link>
                    </div>
                    </>
                )}

                {/* <div className="text-left w-full text-sm text-green-400 px-2">OTP Succesfully send</div> */}
                <div className="w-full flex justify-between items-center text-cent text-shadow-2xs text-sm cursor-pointer absolute bottom-7">
                    <span className="px-[20px]" onClick={() => setPasswordToggle(true)}>
                        Verification Code Login
                    </span>
                    <span className="px-[20px]" onClick={() => setPasswordToggle(false)}>
                        Password Login
                    </span>
                </div>
                
                <div style={{width:"100%",padding:"0 20px"}} className="mt-19 absolute bottom-20">
                    <Button className="btn-disable mb-5" title="Guest Account"  />
                    <Button className="btn" type="submit" title="Sign Up/Sign In"  />
                </div>
            </form>
        </>
    );
}
