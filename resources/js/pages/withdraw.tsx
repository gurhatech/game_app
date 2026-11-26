import Topbar from "@/components/Topbar";
import "../assets/css/diposit.css";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import Button from "@/components/Button";
import AddBankAccount from "@/components/AddBankAccount";
import { BankAccountType } from "@/types";

const withdrawAmountsData = [110, 200, 300, 500, 1000, 2000, 3000, 5000];

function LeftComponent() {
    return (
        <div className="text-2xl flex gap-2 text-slate-300">
            <Link href="/support">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <circle cx="9" cy="13" r="1" fill="currentColor" />
                    <circle cx="15" cy="13" r="1" fill="currentColor" />
                    <path
                        fill="currentColor"
                        d="M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.07 8.07 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47"
                    />
                    <path
                        fill="currentColor"
                        d="M20.99 12c-.11-5.37-4.31-9-8.99-9c-4.61 0-8.85 3.53-8.99 9H2v6h3v-5.81c0-3.83 2.95-7.18 6.78-7.29a7.007 7.007 0 0 1 7.22 7V19h-8v2h10v-3h1v-6z"
                    />
                </svg>
            </Link>
            <Link href={`/transaction/withdraw`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 48 48"
                >
                    <path d="M0 0h48v48H0z" fill="none" />
                    <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="4"
                    >
                        <rect width="30" height="36" x="9" y="8" rx="2" />
                        <path
                            strokeLinecap="round"
                            d="M18 4v6m12-6v6m-14 9h16m-16 8h12m-12 8h8"
                        />
                    </g>
                </svg>
            </Link>
        </div>
    );
}

export default function Withdraw({
    bank_account,wager
}: {
    bank_account: BankAccountType | null,
    wager : any
}) {
    const {user} = usePage().props.auth
    const [showBankAccount, setShowBankAccount] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const addAmountHandler = (i: number) => {
        setIndex(i);
    };
    const {data,setData,post,processing,errors} = useForm({
        user_id : bank_account?.user_id || 0,
        bank_account_id :bank_account?.id || 0,
        amount : withdrawAmountsData[index]
    });

    const createWithdraw = ()=>{
        post('/withdraw');
    }

    return (
        <>
            {showBankAccount && (
                <AddBankAccount setShowBankAccount={setShowBankAccount} />
            )}
            <Topbar title="Withdraw" leftComponent={<LeftComponent />} />
            <div className="page">
                <section className="balances">
                    <Link className="balance-card blue" href="/diposit">
                        <span className="label">Total Balance</span>
                        <span className="amount">{user.balance}</span>
                        <span className="rupee-watermark">₹</span>
                    </Link>
                    <div className="balance-card green">
                        <span className="label">Withdrawable</span>
                        <span className="amount">0</span>
                        <span className="rupee-watermark">◇</span>
                    </div>
                </section>

                <section>
                    {bank_account?.status ? (
                        <div style={{border:"2px solid var(--text-muted)"}} className="w-full flex justify-between items-center px-1 py-3 rounded-xl mt-3 bg-bg-accent">
                            <span className="text-sm text-slate-300"><b className="text-green-600">Bank Acc. :</b> {bank_account.bank_account_no}</span>
                            <span className="text-sm text-slate-300"><b className="text-green-600">IFSC : </b>{bank_account.ifsc.toUpperCase()}</span>
                        </div>
                    ) : (
                        <div
                            onClick={() => setShowBankAccount(true)}
                            className="amount-display mt-8 cursor-pointer"
                        >
                            <p>Add Bank Account</p>
                        </div>
                    )}

                    <div className="amount-heading">
                        <span>Withdrawal Amount</span>
                    </div>
                    <div className="amount-grid cursor-pointer">
                        {withdrawAmountsData &&
                            withdrawAmountsData.map((amount, i) => (
                                <div
                                    onClick={() => addAmountHandler(i)}
                                    key={i}
                                    className={
                                        index === i
                                            ? `amount-option selected`
                                            : "amount-option"
                                    }
                                >
                                    ₹{amount}
                                </div>
                            ))}
                    </div>
                </section>
                <hr className="border-slate-400 my-5" />
                <section
                    style={{ flexDirection: "column" }}
                    className="flex gap-4 flex-derection-col"
                >
                    <div className="flex justify-between items-center py-1 px-3 text-[14px] rounded-2xl bg-[#7b292e]">
                        <p className="text-[#c8787d]">
                            Remaining Withdrawal Limit:
                        </p>
                        <span>₹1000.00</span>
                    </div>
                    <div className="flex justify-between items-center py-1 px-3 text-[14px] rounded-2xl bg-[#7b292e]">
                        <p className="text-[#c8787d]">VIP Daily Limit:</p>
                        <span>₹1000.00</span>
                    </div>
                    <div className="flex justify-between items-center py-1 px-3 text-[14px] rounded-2xl bg-[#7b292e]">
                        <p className="text-[#c8787d]">Wager Requirement</p>
                        <span>₹{wager}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 px-3 text-[14px] rounded-2xl bg-[#7b292e]">
                        <p className="text-[#c8787d]">Free Limit:</p>
                        <span>2</span>
                    </div>
                </section>
                <section>
                    <h2 className="tips-title">Remaining Withdrawal Limit:</h2>
                    <div className="tips">
                        <p>
                            3%+₹6 of the withdrawal amount will be deducted as
                            bank commission.
                            <br />
                            Under normal circumstances, the withdrawal amount
                            will arrive in your account in about{" "}
                            <span>24 hours</span>
                        </p>
                    </div>
                </section>
            </div>
            <div className="pay-wrap">
                <Button type="button" disabled={processing} onClick={createWithdraw} title={processing ? "processing..." : "Withdraw"} />
            </div>
        </>
    );
}
