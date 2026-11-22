import "../assets/css/slide.css";
import { useEffect, useRef } from "react";

export default function Slider() {
    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const slider = carouselRef.current?.querySelector(
            ".carousel_track",
        ) as HTMLUListElement | null;
        let slides = slider ? Array.from(slider.children) : [];

        // Initial slides position, so user can go from first to last slide (click to the left first)
        slider?.prepend(slides[slides.length - 1]);

        // Handling arrow buttons
        const handleArrowClick = (arrow: any) => {
            arrow.addEventListener("click", () => {
                slides = slider ? Array.from(slider.children) : [];
                const currSlide = slider?.querySelector(".is-selected");
                currSlide?.classList.remove("is-selected");
                let targetSlide;

                if (arrow.classList.contains("jsPrev")) {
                    targetSlide = currSlide?.previousElementSibling;
                    slider?.prepend(slides[slides.length - 1]);
                }

                if (arrow.classList.contains("jsNext")) {
                    targetSlide = currSlide?.nextElementSibling;
                    slider?.append(slides[0]);
                }

                targetSlide?.classList.add("is-selected");
            });
        };

        const buttons =
            carouselRef.current?.querySelectorAll<HTMLButtonElement>(
                ".carousel_btn",
            );
        buttons?.forEach(handleArrowClick);

        const nextBtn = buttons?.[1];
        let timeId;
        setInterval(() => {
            nextBtn?.click();
        }, 5000);
        return () => clearInterval(timeId);
    }, []);

    return (
        <div className="main">
            <div ref={carouselRef} className="carousel">
                <button className="carousel_btn jsPrev"></button>
                <button className="carousel_btn jsNext"></button>
                <div className="carousel_track-container">
                    <ul className="carousel_track">
                        {[...new Array(8).keys()].map((image, i) => (
                            <li key={i} className="carousel_slide is-selected">
                                <div className="carousel_image">
                                    <img
                                        height="100%"
                                        src={`/images/slides/${image+1}.png`}
                                        alt=""
                                        role="presentation"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
