"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorAura() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - cursor.offsetWidth / 2, // center on cursor
        y: e.clientY - cursor.offsetHeight / 2,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-[50px] h-[50px] rounded-full bg-green-400/20 pointer-events-none z-50 blur-[15px] mix-blend-screen"
    />
  );
}
