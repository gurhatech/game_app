import Topbar from "@/components/Topbar";
import TransactionList from "@/components/TransactionList";
import { useState } from "react";

interface props {
    transactionType: string;
}

export default function Transaction({ transactionType }: props) {
    const dayData = [1, 7, 30];
    const [index, setIndex] = useState<number>(0);
    return (
        <>
            <Topbar
                title={`${transactionType} Transaction`}
                redirectUrl={`/${transactionType}`}
            />
            <div className="">
                <div
                    style={{
                        borderBottom: "1px solid #999",
                        letterSpacing: "1px",
                    }}
                    className="w-full px-5 pt-2 pb-1"
                >
                    <div className="flex justify-between items-center">
                        {dayData &&
                            dayData.map((day, i) => (
                                <span
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`cursor-pointer reletive hover:text-amber-300 hover:active_day ${index === i ? "active_day text-amber-300" : ""}`}
                                >
                                    {day} Day
                                </span>
                            ))}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-[10px] text-secondary">
                            10/10/2026 to 10/10/2026
                        </span>
                        <span className="text-[10px] text-secondary">
                            Total: ₹100.00
                        </span>
                    </div>
                </div>
            </div>
            <div>
                {[...new Array(3).keys()].map((_, i) => (
                    <TransactionList />
                ))}
            </div>
        </>
    );
}
