import { useForm, usePage } from "@inertiajs/react";
import Button from "./Button"
import CloseIcon from '@mui/icons-material/Close';
import { FormEvent, ChangeEvent } from "react";
import ErrorValidateMessage from "./ErrorValidateMessage";
import { Auth } from "@/types";
interface props {
    setShowBankAccount : any
}

export default function AddBankAccount({setShowBankAccount} : props){
    const {auth} = usePage<Auth>().props;
    const {data,setData,post,processing,errors} = useForm({
        user_id : auth.user.id,
        name : '',
        bank_account_no : '',
        bank_account_no_confirmation:'',
        ifsc : '',
        ifsc_confirmation : ''
    });

    const handleClick = (e:FormEvent)=>{
        e.preventDefault();
        post('/add-bank-account',{
            onSuccess:()=>{
                setShowBankAccount(false);
            }
        })
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setData((prev) => ({...prev,[e.target.name]:e.target.value}))
    }

    return (
        <div className="fixed inset-0 w-screen min-h-screen bg-bg-first z-50">
            <div
                style={{ padding: "0 20px",borderBottom:"1px solid var(--bg-first)" }}
                className="w-screen flex justify-between items-center h-14 z-20 bg-bg-primary "
            >
                <div  className="text-4xl" aria-label="Back">
                    
                </div>
                <h1  className="text-xl capitalize text-slate-300">Add Bank Account</h1>
                <div className="cursor-pointer" onClick={()=>setShowBankAccount(false)}>
                    <CloseIcon/>
                </div>
            </div>
            <form className="px-[20px] py-4 flex flex-col items-center justify-center gap-4">
                <ErrorValidateMessage errors={Object.values(errors)} processing={processing} />
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Name:</label>
                    <input
                        onChange={handleChange}
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter your name."
                        name="name"
                        value={data.name}
                    />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Account No.:</label>
                    <input
                        onChange={handleChange}
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter Account No."
                        name="bank_account_no"
                        value={data.bank_account_no}
                    />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Confirm Account No.:</label>
                    <input
                        onChange={handleChange}
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter confirm Account No.."
                        name="bank_account_no_confirmation"
                        value={data.bank_account_no_confirmation}
                    />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">IFSC Code:</label>
                    <input
                        onChange={handleChange}
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter IFSC code."
                        name="ifsc"
                        value={data.ifsc.toUpperCase()}
                    />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Confirm IFSC:</label>
                    <input
                        onChange={handleChange}
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter confirm IFSC code."
                        name="ifsc_confirmation"
                        value={data.ifsc_confirmation.toUpperCase()}
                    />
                </div>
                <div>
                    <Button disabled={processing} style={{width:"calc(100vw - 40px)"}} onClick={handleClick} type="button" title={processing ? "processing..." : "Submit"} />
                </div>
            </form>
        </div>
    )
}