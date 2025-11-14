"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative py-10 border-t border-white/10 backdrop-blur-lg bg-neutral-60/40 text-center text-neutral-400">
            <motion.div
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-3"
            >
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center">
                        <span className="text-neutral-10 font-semibold text-3xl tracking-tight">
                            Sadaf<span className="text-primary">.</span>N
                        </span>
                    </Link>
                </div>

                {/* Service Titles */}
                <p className="text-sm font-semibold tracking-[3px] text-primary/80">
                    Design · Code · Animation
                </p>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm mt-3">
                    {["Home", "About", "Works", "Contact"].map((item, i) => (
                        <Link
                        key={i}
                        href={`/%{item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                        className="transition-colors hover:text-primary"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="w-16 h-[1px] bg-white/10 my-4" />

                <p className="text-xs text-neutral-500">
                    © 2025 All Rights Reserved —{" "}
                    <span className="text-neutral-300">
                        Designed & Coded by{" "}
                        <span className="text-primary font-medium">Sadaf Nemani</span>.
                    </span>
                </p>
            </motion.div>
        </footer>
    );
}