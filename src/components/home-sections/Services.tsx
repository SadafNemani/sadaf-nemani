"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PenTool, Code, Sparkles, Gauge } from "lucide-react";
import {
  FaFigma,
  FaWordpress,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaPhp,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiMysql,
} from "react-icons/si";


gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Design",
    icon: <PenTool className="w-10 h-10 text-primary" />,
    desc: "Crafting clean, user-centered interfaces that blend beauty with usability.",
    tools: [FaFigma, FaWordpress],
  },
  {
    title: "Code",
    icon: <Code className="w-10 h-10 text-primary" />,
    desc: "Building fast, responsive, and scalable web experiences using modern frameworks.",
    tools: [FaHtml5, FaCss3Alt, FaJs, SiTypescript, FaReact, SiNextdotjs, SiTailwindcss],

  },
  {
    title: "Animate",
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    desc: "Bringing visuals to life with fluid, meaningful motion that tells a story.",
    tools: [SiFramer, "GSAP"],
  },
  {
    title: "Optimize",
    icon: <Gauge className="w-10 h-10 text-primary" />,
    desc: "Improving performance, SEO, and accessibility for seamless digital journeys.",
    tools: [FaGitAlt, FaNodeJs, FaPhp, SiMysql],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%", // more forgiving for mobile
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 bg-transparent overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-bold text-neutral-10 mb-4"
        >
          What I do
        </motion.h2>
        <p className="text-neutral-400 text-lg mb-16">
          A blend of creativity, code, and performance — turning imagination into interactive reality.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-500 hover:shadow-[0_0_25px_rgba(99,186,11,0.25)]"
            >
              <div className="flex justify-center mb-6 transform transition-transform duration-500 group-hover:rotate-12">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-neutral-400 text-base leading-relaxed">
                {service.desc}
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {service.tools.map((Tool, idx) =>
                  typeof Tool === "string" ? (
                    <span
                      key={idx}
                      className="mt-5 text-sm font-medium text-neutral-300 hover:text-primary transition-colors duration-300"
                    >
                      {Tool}
                    </span>
                  ) : (
                    <Tool
                      key={idx}
                      className="mt-5 w-6 h-6 text-neutral-400 hover:text-primary transition-colors duration-300"
                    />
                  )
                )}
              </div>

              <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 group-hover:shadow-[0_0_25px_rgba(99,186,11,0.25)] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
