interface props {
    showVersion: any;
    setShowVersion: any;
}

export default function Version({ showVersion, setShowVersion }: props) {
    return (
        <div
            style={{ background: "rgba(0,0,0,0.9)" }}
            className="flex items-center justify-center fixed left-0 right-0 top-0 w-screen min-h-screen z-50 "
        >
            <div
                style={{
                    position: "relative",
                    border: "2px solid var(--text-muted)",
                }}
                className="w-[90%] bg-bg-primary flex flex-col gap-4 px-3 py-10 rounded-2xl"
            >
                <span onClick={setShowVersion(false)} className="absolute top-2 right-3 text-xl p-2 cursor-pointer">X</span>
                <p className="text-muted">Version : 1.1.10</p>
            </div>
        </div>
    );
}
