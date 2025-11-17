"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Quote } from "lucide-react";
import ScrollFloat from "../layout/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Working with Sadaf was a joy — her design sense and attention to detail turned our vision into reality.",
    name: "Ava Thompson",
    role: "Founder, BrightEdge Studio",
  },
  {
    quote:
      "From concept to final delivery, everything was handled with precision and creativity.",
    name: "Liam Carter",
    role: "Product Manager, NovaTech",
  },
  {
    quote:
      "The animations she crafted gave our brand a personality — visually stunning and fast.",
    name: "Emma Rodriguez",
    role: "Creative Director, MotionLab",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20"
    >

      <div className="max-w-7xl mx-auto px-6">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
          containerClassName='text-5xl md:text-6xl font-bold text-center mb-4'
          textClassName="text-neutral-10"
        >
          Voices Behind the Work
        </ScrollFloat>
        <p className="text-neutral-400 text-lg text-center mb-16">
          Real experiences from real projects.
        </p>

        <div className="relative flex justify-center items-center perspective-[1600px] h-[40vh]">
          {testimonials.map((t, i) => {
            const offset = i - activeIndex;
            const visible = Math.abs(offset) <= 1;

            // animation values
            const z = offset === 0 ? 0 : -200;
            const x = offset * 480; // increased gap between side cards and center
            const scale = offset === 0 ? 1.1 : 0.85;
            const opacity = offset === 0 ? 1 : 0.4;
            const blur = offset === 0 ? "blur(0px)" : "blur(6px)";
            const rotateY = offset * 20;

            return (
              <motion.div
                key={i}
                className="absolute w-[90%] sm:w-[580px] md:w-[650px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl text-left transition-all duration-700"
                style={{
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  filter: blur,
                  transition:
                    "all 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.6s, filter 0.6s",
                  zIndex: offset === 0 ? 10 : 1,
                }}
              >
                <Quote className="w-12 h-12 text-primary opacity-70 mb-6" />
                <p className="text-neutral-200 text-xl italic leading-relaxed mb-8">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="text-white font-semibold text-xl">{t.name}</h4>
                  <p className="text-neutral-400 text-base">{t.role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
