"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactCTA() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // render nothing on server

  return (
    <section
      id="contact-cta"
      className="relative py-40 text-center overflow-hidden bg-transparent"
    >
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-lime-300 to-primary bg-clip-text text-transparent"
        >
          Want to collaborate or just say hi?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-neutral-400 text-xl mb-10"
        >
          Let’s connect
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-full border border-primary/40 text-primary font-medium text-lg transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-[0_0_25px_rgba(99,186,11,0.4)] animate-pulse-glow"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(99, 186, 11, 0);
          }
          50% {
            box-shadow: 0 0 25px rgba(99, 186, 11, 0.35);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
