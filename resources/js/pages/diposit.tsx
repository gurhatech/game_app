import Topbar from "@/components/Topbar";
import "../assets/css/diposit.css";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Button from "@/components/Button";

const dipositAmountsData = [100, 200, 300, 500, 1000, 2000, 3000, 5000];

function LeftComponent() {
    return (
        <div className="text-2xl flex gap-2  text-slate-300">
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
            <Link href={`/transaction/diposit`}>
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
};

export default function Diposit() {
    const [index, setIndex] = useState<number>(0);
    const dipositAmountHandler = (i: number) => {
        setIndex(i);
    };
    return (
        <>
            <Topbar title="Diposit" leftComponent={<LeftComponent/>} />
            <div className="page">
                <section className="balances">
                    <div className="balance-card blue">
                        <span className="label">Total Balance</span>
                        <span className="amount">0</span>
                        <span className="rupee-watermark">₹</span>
                    </div>
                    <Link className="balance-card green" href="/withdraw">
                        <span className="label">Withdrawable</span>
                        <span className="amount">0</span>
                        <span className="rupee-watermark">◇</span>
                    </Link>
                </section>

                <section>
                    <div className="amount-heading">
                        <span>Deposit Amount</span>
                        <span>Min:₹100&nbsp; Max:₹10000</span>
                    </div>
                    <div className="amount-display">
                        ₹ {dipositAmountsData[index]}
                    </div>
                    <div className="amount-grid">
                        {dipositAmountsData &&
                            dipositAmountsData.map((amount, i) => (
                                <div
                                    style={{ cursor: "pointer" }}
                                    key={i}
                                    onClick={() => dipositAmountHandler(i)}
                                    className={
                                        index === i
                                            ? "amount-option selected"
                                            : "amount-option"
                                    }
                                >
                                    <span className="tag">
                                        +{Math.floor((amount * 18) / 100)}
                                    </span>
                                    ₹{amount}
                                </div>
                            ))}
                    </div>
                </section>

                <section>
                    <h2 className="event-title">
                        Deposit Event <b>*</b>
                    </h2>
                    <div className="event-badge">
                        <span>
                            First deposit
                            <br />
                            up to +₹100%
                        </span>
                        <span className="check">✓</span>
                    </div>
                    <p className="event-copy">
                        After participating in this event, your withdrawal will
                        require a wagering requirement of 3 times the deposit
                        amount.
                        <br />
                        Gullak Bonus are rewarded directly to your Gullak.
                        <br />
                        You can cancel if you don't need the bonus
                    </p>
                    <h2 className="tips-title">Deposit tips:</h2>
                    <div className="tips">
                        <p>
                            1. Each deposit will be credited within 1-5 minutes.
                            <br />
                            2. After a successful payment, please return to the
                            deposit page and enter your payment receipt UTR to
                            expedite the process.
                            <br />
                            3. If your deposit has not been credited within 30
                            minutes, please contact customer service or upload
                            your UTR for self-service processing.
                        </p>
                        <p>
                            Important Notes:
                            <br />
                            Do not alter the payment amount.
                            <br />
                            Do not reuse saved QR codes or UPI accounts for
                            future payments.
                        </p>
                    </div>
                </section>
            </div>
            <div className="pay-wrap">
                <Button title="Pay Now" />
            </div>
        </>
    );
}
