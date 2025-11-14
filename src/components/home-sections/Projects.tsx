"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer } from "react-icons/si";
import { FaReact } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const featuredProject = {
  title: "Cinematic Portfolio Experience",
  desc: "A visually immersive personal portfolio built with React, GSAP, and Next.js — focusing on motion, storytelling, and speed.",
  image: "/mock-featured.jpg", // Replace with your own later
  tech: ["React", "Next.js", "GSAP", "TailwindCSS"],
};

const projects = [
  {
    title: "Aurora Studio",
    image: "/mock1.jpg",
    tech: ["React", "Next.js", "Framer Motion"],
  },
  {
    title: "Bloom Agency",
    image: "/mock2.jpg",
    tech: ["WordPress", "GSAP", "TailwindCSS"],
  },
  {
    title: "Zen UI Kit",
    image: "/mock3.jpg",
    tech: ["Figma", "React", "TypeScript"],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each project card
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          delay: i * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-28 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-neutral-10 text-center mb-4"
        >
          Featured Works
        </motion.h2>
        <p className="text-neutral-400 text-lg text-center mb-20">
          A glimpse into the stories I’ve built — blending design, code, and motion.
        </p>

        {/* Featured Project */}
        <div className="relative mb-28 rounded-3xl overflow-hidden group">
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl">
            <Image
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className="object-cover transform transition-transform duration-[2000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
          </div>
          <div className="absolute bottom-10 left-10 text-white z-10 max-w-lg">
            <h3 className="text-3xl font-semibold mb-3">{featuredProject.title}</h3>
            <p className="text-neutral-300 mb-4">{featuredProject.desc}</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {featuredProject.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {t}
                </span>
              ))}
            </div>
            <motion.button
              whileHover={{ y: -3 }}
              className="px-5 py-2 rounded-full bg-primary text-white font-medium hover:shadow-[0_0_20px_rgba(99,186,11,0.3)] transition-all duration-300"
            >
              View Case Study
            </motion.button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/30 hover:shadow-[0_0_25px_rgba(99,186,11,0.25)] transition-all duration-500"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-white mb-4">{project.title}</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ y: -2 }}
                  className="px-4 py-2 rounded-full border border-primary/30 text-primary font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                >
                  View Case Study
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
