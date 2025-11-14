"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  size: number;
  duration: number;
  delay: number;
  xStart: number;
  yStart: number;
};

export default function ParticleDrift() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const numParticles = 50; // fewer to start
    const generated: Particle[] = Array.from({ length: numParticles }).map(() => ({
      size: 3 + Math.random() * 3,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 5,
      xStart: Math.random() * 100,
      yStart: Math.random() * 100,
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/50 blur-[2px]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.xStart}%`,
            top: `${p.yStart}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            y: 800, // move downward 800px
            opacity: [0.2, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
