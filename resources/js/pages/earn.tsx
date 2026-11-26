import Tab from "@/components/tab";
import "../assets/css/earn.css";

export default function Earn() {
    let currentSlide = 0;

    const rewards = [
        [
            ["🪙", "Bet rebate", "0.94%"],
            ["💰", "Deposit rebate", "1.5%"],
            ["🤝", "Invitation rewards", "₹1K"],
        ],
        [
            ["🎁", "Bonus rewards", "₹500"],
            ["💎", "VIP benefits", "Exclusive"],
            ["🏆", "Team rewards", "Special"],
        ],
        [
            ["💵", "Cash rewards", "₹2K"],
            ["🎯", "Extra bonus", "1%"],
            ["👑", "Level rewards", "Premium"],
        ],
        [
            ["🔥", "Special rebate", "2%"],
            ["💰", "Extra deposit", "3%"],
            ["🎉", "Lucky rewards", "₹5K"],
        ],
    ];

    function renderSlide() {
        const grid = document.getElementById("rewardGrid");

        if (!grid) return;

        grid.innerHTML = rewards[currentSlide]
            .map(
                (item) => `
        <div class="reward-item">
            <div class="reward-icon">${item[0]}</div>
            <div class="reward-text">
                ${item[1]}<br>
                up to <span class="gold">${item[2]}</span>
            </div>
        </div>
    `,
            )
            .join("");

        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    function changeSlide(direction : number) {
        currentSlide =
            (currentSlide + direction + rewards.length) % rewards.length;

        renderSlide();
    }

    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            renderSlide();
        });
    });

    function toggleLanguage() {
        const toggle = document.getElementById("languageToggle");
        const text = document.getElementById("languageText");

        if (!toggle || !text) return;

        toggle.classList.toggle("on");

        text.innerText = toggle.classList.contains("on")
            ? "Share in English"
            : "हिंदी में साझा करें";
    }

    function claimReward() {
        alert("No withdrawal rewards available yet!");
    }

    function inviteFriends() {
        shareWhatsApp();
    }

    function showDetail() {
        alert("Team level details");
    }

    function showTeam() {
        alert("Your team members");
    }

    function shareWhatsApp() {
        const message = encodeURIComponent(
            "Join me and earn exciting rewards! 🎁",
        );

        window.open("https://wa.me/?text=" + message, "_blank");
    }

    function shareTelegram() {
        const message = encodeURIComponent(
            "Join me and earn exciting rewards! 🎁",
        );

        window.open(
            "https://t.me/share/url?url=https://example.com&text=" + message,
            "_blank",
        );
    }

    return (
        <div className="w-screen min-h-screen absolute inset-0 bg-bg-primary px-5 py-2">
            <div className="container">
                <div className="team-panel">
                    <div className="top-panel">
                        <div className="level-row">
                            <span className="level-title">Team level</span>
                            <button
                                className="top-button"
                                onClick={()=>showDetail()}
                            >
                                Detail
                            </button>
                            <button className="top-button" onClick={()=>showTeam()}>
                                Team
                            </button>
                        </div>

                        <div className="stats-row">
                            <div className="stat-label">♙ Team size</div>
                            <div className="stat-value">0/100</div>

                            <div className="stat-label">₹ Team betting</div>
                            <div className="stat-value">₹0/₹20M</div>
                        </div>
                    </div>

                    <div className="privileges">
                        <div className="section-title pl-4">My privileges</div>

                        <div className="reward-grid" id="rewardGrid">
                            <div className="reward-item">
                                <div className="reward-icon">🪙</div>
                                <div className="reward-text">
                                    Bet rebate
                                    <br />
                                    up to <span className="gold">0.94%</span>
                                </div>
                            </div>

                            <div className="reward-item">
                                <div className="reward-icon">💰</div>
                                <div className="reward-text">
                                    Deposit rebate
                                    <br />
                                    up to <span className="gold">1.5%</span>
                                </div>
                            </div>

                            <div className="reward-item">
                                <div className="reward-icon">🤝</div>
                                <div className="reward-text">
                                    Invitation rewards
                                    <br />
                                    total <span className="gold">₹1K</span>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-controls">
                            <button className="arrow" onClick={()=>changeSlide(-1)}>
                                ❮
                            </button>
                            <span className="dot active"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <button className="arrow" onClick={()=>changeSlide(1)}>
                                ❯
                            </button>
                        </div>
                    </div>
                </div>

                <div className="withdrawal">
                    <div>
                        <div className="withdraw-title">
                            Withdrawal rewards ›
                        </div>
                        <div className="amount">₹0</div>
                    </div>

                    <button className="claim-btn" onClick={()=>claimReward()}>
                        Claim
                    </button>
                </div>

                <div className="total-box">
                    <div className="total-item">
                        <div className="total-label">Total rewards ›</div>
                        <div className="total-amount">₹0</div>
                    </div>

                    <div className="total-item">
                        <div className="total-label">Today's rewards ›</div>
                        <div className="total-amount">₹0</div>
                    </div>
                </div>

                <button className="invite-btn" onClick={()=>inviteFriends()}>
                    Invite friends to get money
                </button>

                <div className="refer-row">
                    <span>Refer friends with:</span>
                    <span id="languageText">हिंदी में साझा करें</span>

                    <div
                        className="toggle"
                        id="languageToggle"
                        onClick={()=>toggleLanguage()}
                    >
                        <div className="toggle-circle"></div>
                    </div>
                </div>

                <div className="share-grid">
                    <button className="share-btn" onClick={()=>shareTelegram()}>
                        <span className="share-icon">➤</span>
                        Share to Telegram
                    </button>

                    <button className="share-btn" onClick={()=>shareWhatsApp()}>
                        <span className="share-icon">🟡</span>
                        Share to WhatsApp
                    </button>
                </div>
            </div>
            <Tab />
        </div>
    );
}
