import Topbar from "@/components/Topbar";
import AddCardIcon from '@mui/icons-material/AddCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function ChatSupport() {
    return (
        <>
            <Topbar title="Support" redirectUrl="/" />
            <div className="w-screen  px-5 chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                        />
                    </div>
                </div>
                <div className="chat-header">
                    Chatbot
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble bg-bg-secondary text-[#c8787d]">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="w-screen  px-5 chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                        />
                    </div>
                </div>
                <div className="chat-header">
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble bg-bg-secondary text-[#c8787d]">I hate you!</div>
                {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
            </div>
            <div className="w-screen absolute bottom-0 left-0 right-0 z-10">
                <div className="flex items-center justify-between px-8 mb-3">
                    <span
                        style={{
                            boxShadow:
                                "inset 0px 0px 1px 1px rgba(193, 1, 1, 0.35)",
                            cursor: "pointer",
                        }}
                        className="w-10 h-10 bg-gradient-to-t from-bg-first to-bg-secondary text-center leading-[40px] rounded-full shadow-2xs"
                    >
                        <AddCardIcon/>
                    </span>
                    <span
                        style={{
                            boxShadow:
                                "inset 0px 0px 1px 1px rgba(193, 1, 1, 0.35)",
                            cursor: "pointer",
                        }}
                        className="w-10 h-10 bg-gradient-to-t from-bg-first to-bg-secondary text-center leading-[40px] rounded-full shadow-2xs"
                    >
                        <AccountBalanceWalletIcon/>
                    </span>
                    <span
                        style={{
                            boxShadow:
                                "inset 0px 0px 1px 1px rgba(193, 1, 1, 0.35)",
                            cursor: "pointer",
                        }}
                        className="w-10 h-10 bg-gradient-to-t from-bg-first to-bg-secondary text-center leading-[40px] rounded-full shadow-2xs"
                    >
                        <ReceiptIcon/>
                    </span>
                </div>
                <div className=" glass-e bg-gradient-to-t from-bg-first to-bg-secondary px-[20px] py-2">
                    <div className="flex gap-3 items-center">
                        <input
                            className="bg-bg-primary rounded-sm px-3 py-2 outline-none w-[80%] text-sm"
                            type="text"
                            placeholder="Plaese enter your message"
                        />
                        <button
                            style={{
                                boxShadow:
                                    "inset 0px 0px 1px 1px rgba(193, 1, 1, 0.55)",
                                cursor: "pointer",
                            }}
                            className="bg-gradient-to-r from-bg-secondary to-bg-first px-3 text-[12px]  py-1 rounded-sm"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
