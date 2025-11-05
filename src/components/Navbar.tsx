"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
        className={`fixed top-4 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-300 ${
        scrolled ? "backdrop-blur-lg bg-neutral-50/40 shadow-sm" : "bg-transparent"
        }`}
        aria-label="Primary navigation"
        >
            <nav className="max-w-6xl mx-auto flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center">
                        <span className="text-neutral-10 font-semibold text-lg tracking-tight">
                            Sadaf<span className="text-accent">.</span>N
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
                                const el = document.getElementById(targetId);
                                if (el) {
                                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                                } 
                                setOpen(false);
                            }}
                            className="block text-neutral-10 text-lg font-medium cursor-pointer"
                            >
                                <span className="px-1 py-1">{item}</span>
                                <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-accent opacity-0 transform scale-x-0 transition-all duration-300 origin-left group-hover:opacity-100 group-hover:scale-x-100"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <div className="md:hidden flex items-center">
                    <button
                    aria-label="Toggle menu"
                    onClick={() => setOpen((v) => !v)}
                    className="relative z-50 inline-flex items-center justify-center p-2 rounded-md ring-1 ring-white/6 backdrop-blur-md bg-neutral-50/30"
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
                        className={`absolute top-0 left-0 right-0 p-6 backdrop-blur-lg bg-neutral-55/75 border-b border-accent/30`}
                        >
                            <div className="flex items-center justify-between">
                                <Link href="/" onClick={() => setOpen(false)}>
                                    <span className="text-neutral-10 font-semibold text-lg">
                                        Sadaf<span className="text-accent">.</span>N
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
                                    <li key={item}>
                                        <Link
                                        href={item === "Home" ? "/" : `/#${item.toLocaleLowerCase()}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const el = document.getElementById(item.toLocaleLowerCase());
                                            if (el) {
                                                el.scrollIntoView({ behavior: "smooth", block: "start" });
                                            } 
                                            setOpen(false);
                                        }}
                                        className="block relative text-neutral-10 text-lg font-medium cursor-pointer transition-all duration-300 group-hover:text-accent py-2 px-3 text-center"
                                        >
                                            <span className="px-1 py-1">{item}</span>
                                            <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-accent opacity-0 transform scale-x-0 transition-all duration-300 origin-left group-hover:opacity-100 group-hover:scale-x-100"></span>
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
        </header>
    )
}