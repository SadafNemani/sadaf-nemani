"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function Hero() {
  const texts = ["I DESIGN", "I CODE", "I ANIMATE"];
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const showText = (index = 0) => {
      const text = texts[index];
      el.textContent = text;

      const tl = gsap.timeline({
        onComplete: () => {
          const next = (index + 1) % texts.length;
          gsap.delayedCall(1, () => showText(next)); 
        },
      });

      tl.fromTo(
        el,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1.1, duration: 1.4, ease: "power2.out" }
      )
        .to(el, { opacity: 1, scale: 1, duration: 1.8, ease: "none" })
        .to(el, {
          opacity: 0,
          scale: 0.95,
          duration: 1.4,
          ease: "power2.inOut",
        });
    };

    showText(0);
    return () => gsap.killTweensOf(el);
  }, []);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(text, {
        x: x * 25,
        y: y * 25,
        rotationY: x * 8,
        rotationX: -y * 8,
        transformPerspective: 800,
        ease: "power2.out",
        duration: 0.8,
      });
    };

    const reset = () => {
      gsap.to(text, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", reset);

    document.body.style.overflowX = "hidden";
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", reset);
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="hero-bg absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,186,11,0.08),_transparent_70%)]" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="text-neutral-300 text-lg font-medium mb-6 z-10"
      >
        Hello, I’m{" "}
        <span className="text-primary font-semibold">Sadaf</span>
      </motion.p>

      <h1
        ref={textRef}
        className="text-6xl sm:text-9xl md:text-10xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_#63ba0b] will-change-transform"
      >
        I DESIGN
      </h1>

      <div className="absolute bottom-10 text-sm text-neutral-400 animate-bounce">
        ↓ Scroll for more ↓
      </div>
    </section>
  );
}
