"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    const navbar = document.querySelector(".navbar-bg");

    ScrollTrigger.create({
        start: "top top+=50", // when scrolling 50px down
        onEnter: () => gsap.to(navbar, {
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0,0,0,0.7)",
        filter: "brightness(1.1)",
        duration: 0.3,
        ease: "power2.out",
        }),
        onLeaveBack: () => gsap.to(navbar, {
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(255,255,255,0.25)",
        filter: "brightness(1)",
        duration: 0.3,
        ease: "power2.out",
        }),
    });
    }, []);

    return (
        <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`navbar-bg fixed inset-x-0 mx-auto top-4 z-50 px-6 md:px-12 w-10/12 rounded-2xl transition-all duration-300 backdrop-blur-lg bg-neutral-50/40 shadow-sm`}
        aria-label="Primary navigation"
        >
            <nav className="max-w-6xl mx-auto flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center">
                        <span className="text-neutral-10 font-semibold text-3xl tracking-tight">
                            Sadaf<span className="text-primary">.</span>N
                        </span>
                    </Link>
                </div>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-8">
                    {["Home", "Services", "Projects", "Testimonials", "Contact"].map((item) => (
                        <li key={item}>
                            <Link
                            href={item === "Home" ? "/" : `/#${item.toLocaleLowerCase()}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const id = item.toLowerCase();
                                const el = document.getElementById(id);
                                if (el) {
                                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                                } 
                                setOpen(false);
                            }}
                            className="group neon-hover relative block text-neutral-10 text-lg font-medium cursor-pointer"
                            >
                                <span className="relative px-1 py-1 transition-all duration-300 group-hover:text-primary group-hover:[text-shadow:0_0_8px_rgba(99,186,11,0.8)]">{item}</span>
                                <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary opacity-0 scale-x-0 origin-left transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100 group-hover:shadow-[0_0_8px_rgba(99,186,11,0.8)]"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <div className="md:hidden flex items-center">
                    <button
                    aria-label="Toggle menu"
                    onClick={() => setOpen((v) => !v)}
                    className="relative z-50 inline-flex items-center justify-center p-2 rounded-md ring-1 ring-primary backdrop-blur-md bg-neutral-50/30"
                    >
                        <svg
                        className="w-6 h-6 text-neutral-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        {open ? (
                            <path
                            d="M6 6L18 18M6 18L18 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        ) : (
                            <path
                            d="M3 6h18M3 12h18M3 18h18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        )}
                        </svg>
                    </button>

                    {/* Mobile menu (overlay) */}
                    <div
                    className={`fixed inset-0 z-40 transition-opacity duration-300 ${
                        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={!open}
                    >
                        <div
                        className={`absolute top-0 left-0 right-0 p-6 bg-neutral-55 border-b border-primary/30`}
                        >
                            <div className="flex items-center justify-between">
                                <Link href="/" onClick={() => setOpen(false)}>
                                    <span className="text-neutral-10 font-semibold text-3xl">
                                        Sadaf<span className="text-primary">.</span>N
                                    </span>
                                </Link>
                                <button
                                aria-label="Close menu"
                                className="p-2"
                                onClick={() => setOpen(false)}
                                >
                                    <svg className="w-6 h-6 text-neutral-10" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                {["Home", "Services", "Projects", "Testimonials", "Contact"].map((item) => (
                                    <li key={item} className="group relative">
                                        <Link
                                        href={item === "Home" ? "/" : `/#${item.toLocaleLowerCase()}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const id = item.toLowerCase();
                                            const el = document.getElementById(id);
                                            if (el) {
                                                el.scrollIntoView({ behavior: "smooth", block: "start" });
                                            } 
                                            setOpen(false);
                                        }}
                                        className="group neon-hover block relative text-neutral-10 text-lg font-medium cursor-pointer transition-all duration-300 group-hover:text-primary py-2 px-3 text-center"
                                        >
                                            <span className="relative px-1 py-1 transition-all duration-300 group-hover:text-primary group-hover:[text-shadow:0_0_8px_rgba(99,186,11,0.8)]">{item}</span>
                                            <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary opacity-0 scale-x-0 origin-left transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100 group-hover:shadow-[0_0_8px_rgba(99,186,11,0.8)]"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Click outside to close (transparent backdrop) */}
                        <div
                        onClick={() => setOpen(false)}
                        className="absolute inset-0"
                        />
                    </div>
                </div>
            </nav>

            {/* thin luminous bottom border (always visible) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ boxShadow: `0 0 8px rgba(99,186,11,0.18)` }} />
        </motion.header>
    )
}