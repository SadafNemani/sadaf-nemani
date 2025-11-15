"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {

    // --- Text Effect ---
    const name = nameRef.current;
    if (!name) return;

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      const rect = name.getBoundingClientRect();
      const dx = x - (rect.left + rect.width / 2);
      const dy = y - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        gsap.to(name, {
          x: dx / 20,
          y: dy / 20,
          scale: 1.02,
          rotate: dx / 100,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(name, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center">
      <h1 
      ref={nameRef}
      className="relative z-20 text-6xl md:text-8xl font-bold text-white"
      >
        Sadaf Nemani
      </h1>
    </section>
  )
}
