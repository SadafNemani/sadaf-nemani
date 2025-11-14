"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function GradientHalo() {
    const haloRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const halo = haloRef.current;
        if (!halo) return;

        // Scroll-based movement
        gsap.to(halo, {
            y: () => window.scrollY * 0.15,
            ease: "none",
            duration: 0,
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2,
            }
        });
    }, []);

    return(
        <div 
        ref={haloRef}
        className="
        fixed
        top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[1400px] h-[1400px]
        pointer-events-none
        rounded-full
        z-0
        "
        style={{
            background: "radial-gradient(circle, rgba(99,186,11,0.35), transparent 65%)",
            filter: "blur(250px)",
        }}
        />
    );
}