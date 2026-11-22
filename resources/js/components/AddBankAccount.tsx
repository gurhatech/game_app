import Button from "./Button"

interface props {
    setShowBankAccount : any
}

export default function AddBankAccount({setShowBankAccount} : props){
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
                    X
                </div>
            </div>
            <div className="px-[20px] py-4 flex flex-col gap-4">
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Name:</label>
                    <input
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter your name."
                    />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Account No.:</label>
                    <input
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter Account No."
                    />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Confirm Account No.:</label>
                    <input
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter confirm Account No.."
                    />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">IFSC Code:</label>
                    <input
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter IFSC code."
                    />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Confirm IFSC:</label>
                    <input
                        className="w-full px-5 py-2 rounded bg-bg-secondary outline-0"
                        type="text"
                        placeholder="Enter confirm IFSC code."
                    />
                </div>
                <div>
                    <Button title="Add Bank Account" />
                </div>
            </div>
        </div>
    )
}