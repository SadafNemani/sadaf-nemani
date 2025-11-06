"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import {
  PenTool, Palette, Brush, Pipette, PaintBucket, LayoutGrid,
  Braces, Brackets, CodeXml, Code, Binary, Ampersands,
  ChartNoAxesGantt, SlidersHorizontal, Tangent, AudioLines, Repeat, DiamondPlus,
} from "lucide-react";

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const iconsLayerRef = useRef<HTMLDivElement | null>(null);
  const parallaxState = useRef({ x: 0, y: 0 });


  const iconSets = {
    "I DESIGN": [PenTool, Palette, Brush, Pipette, PaintBucket, LayoutGrid],
    "I CODE": [Braces, Brackets, CodeXml, Code, Binary, Ampersands],
    "I ANIMATE": [ChartNoAxesGantt, SlidersHorizontal, Tangent, AudioLines, Repeat, DiamondPlus],
  };

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 1.8 });
    const texts = ["I DESIGN", "I CODE", "I ANIMATE"];
    let index = 0;

    const showNext = () => {
      const text = texts[index];
      el.textContent = text;

      tl.clear()
        .set(el, { visibility: "visible" })
        .fromTo(
          el,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1.05,
            duration: 1.3,
            ease: "power2.out",
            onStart: () => {
              clearIcons();
              spawnIcons(text);
              spawnParticles();
            },

          }
        )
        .to(el, { opacity: 1, scale: 1, duration: 1.8 })
        .to(el, {
          opacity: 0,
          scale: 0.95,
          duration: 1.3,
          ease: "power2.inOut",
          onStart: clearIcons,
          onComplete: () => {
            index = (index + 1) % texts.length;
            gsap.delayedCall(0.7, showNext);
          },
        });
    };

    gsap.delayedCall(1.8, showNext);

    return () => {
      tl.kill();
      gsap.killTweensOf(el);
    };
  }, []);

  // Parallax effect
  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const iconsLayer = iconsLayerRef.current;
    if (!iconsLayer) return;

    const prevOverflow = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";

    // Store base positions for icons
    const updateBasePositions = () => {
      const icons = iconsLayer.querySelectorAll(".floating-icon");
      icons.forEach((icon) => {
        const bounds = icon.getBoundingClientRect();
        const baseX = parseFloat(icon.getAttribute("data-base-x") || "0");
        const baseY = parseFloat(icon.getAttribute("data-base-y") || "0");
        // Save initial position (only once per spawn)
        if (!baseX && !baseY) {
          icon.setAttribute("data-base-x", bounds.left.toString());
          icon.setAttribute("data-base-y", bounds.top.toString());
        }
      });
    };

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * 2;
      const offsetY = (e.clientY / innerHeight - 0.5) * 2;

      // Text parallax
      gsap.to(text, {
        x: offsetX * 50,
        y: offsetY * 50,
        rotationY: offsetX * 10,
        rotationX: -offsetY * 10,
        transformPerspective: 800,
        duration: 0.8,
        ease: "power3.out",
      });

      // Icons parallax (offset only — no overwrite)
      const icons = iconsLayer.querySelectorAll(".floating-icon");
      icons.forEach((icon, i) => {
        const baseX = parseFloat(icon.getAttribute("data-base-x") || "0");
        const baseY = parseFloat(icon.getAttribute("data-base-y") || "0");
        gsap.to(icon, {
          x: `+=${offsetX * (40 + i * 2)}`,
          y: `+=${offsetY * (40 + i * 2)}`,
          duration: 1.4,
          ease: "power3.out",
          overwrite: false,
        });
      });
    };

    const reset = () => {
      gsap.to([text, ".floating-icon"], {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    let listenersAdded = false;
    const startParallaxCall = gsap.delayedCall(2.2, () => {
      if (!listenersAdded) {
        updateBasePositions();
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseleave", reset);
        listenersAdded = true;
      }
    });

    return () => {
      if (listenersAdded) {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseleave", reset);
      }
      startParallaxCall.kill();
      document.body.style.overflowX = prevOverflow;
    };
  }, []);

  const spawnIcons = (keyword: string) => {
    const layer = iconsLayerRef.current;
    if (!layer) return;

    const icons = iconSets[keyword as keyof typeof iconSets];
    if (!icons) return;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const radius = Math.min(screenW, screenH) * 0.7;

    icons.forEach((Icon) => {
      const duplicates = gsap.utils.random(3, 5, 1);

      for (let i = 0; i < duplicates; i++) {
        const el = document.createElement("div");
        el.className = "floating-icon icon-glow";
        layer.appendChild(el);

        const iconSize = gsap.utils.random(30, 80);
        const scale = gsap.utils.random(0.7, 1.6);
        const blur = gsap.utils.random(0, 4);
        const angle = gsap.utils.random(0, Math.PI * 2);
        const distance = gsap.utils.random(radius * 0.6, radius);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        el.style.left = "50%";
        el.style.top = "50%";
        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        el.style.filter = `blur(${blur}px)`;
        el.style.opacity = "0";
        el.style.pointerEvents = "none";

        const icon = <Icon size={iconSize} />;
        import("react-dom/client").then(({ createRoot }) => {
          const root = createRoot(el);
          root.render(icon);
        });

        // Fade in and float slightly
        gsap.to(el, {
          opacity: gsap.utils.random(0.4, 0.8),
          duration: 1.2,
          ease: "power2.out",
        });

        // Gentle perpetual floating
        gsap.to(el, {
          x: `+=${gsap.utils.random(-50, 50)}`,
          y: `+=${gsap.utils.random(-50, 50)}`,
          duration: gsap.utils.random(5, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
  };


  const clearIcons = () => {
    const layer = iconsLayerRef.current;
    if (!layer) return;

    const children = Array.from(layer.children);
    if (!children.length) return;

    gsap.to(children, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        children.forEach((child) => child.remove());
      },
    });
  };

  const spawnParticles = () => {
    const container = document.getElementById("particles-layer");
    if (!container) return;
    const numParticles = 130;
    const hueBase = 95;
    const duration = 5;

    for (let i = 0; i < numParticles; i++) {
      const dot = document.createElement("div");
      dot.className = "particle";
      container.appendChild(dot);

      const size = gsap.utils.random(2, 6);
      const blur = gsap.utils.random(3, 10);
      const hueShift = gsap.utils.random(-10, 10);

      gsap.set(dot, {
        position: "absolute",
        left: `${gsap.utils.random(0, 100)}%`,
        top: `${gsap.utils.random(0, 100)}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: `hsl(${hueBase + hueShift}, 70%, 55%)`,
        opacity: 0,
        filter: `blur(${blur}px)`,
        z: gsap.utils.random(-150, 150),
        mixBlendMode: "screen",
        willChange: "opacity, transform",
      });

      const tl = gsap.timeline({
        repeat: 0,
        onComplete: () => dot.remove(),
      });

      tl.to(dot, {
        opacity: gsap.utils.random(0.3, 1),
        duration: duration / 2,
        ease: "power1.inOut",
      })
        .to(
          dot,
          { opacity: 0, duration: duration / 2, ease: "power1.inOut" },
          "+=0.3"
        )
        .to(
          dot,
          {
            x: `+=${gsap.utils.random(-40, 40)}`,
            y: `+=${gsap.utils.random(-40, 40)}`,
            duration,
            ease: "sine.inOut",
          },
          0
        );

        gsap.to(dot, {
          scale: () => gsap.utils.random(0.8, 1.4),
          repeat: -1,
          yoyo: true,
          duration: gsap.utils.random(0.4, 1),
          ease: "sine.inOut"
        });
    }
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="hero-bg absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,186,11,0.08),_transparent_70%)]" />

      <div
        className="absolute inset-0 overflow-visible pointer-events-none z-10"
        id="particles-layer"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="text-neutral-300 text-2xl font-medium mb-10 z-30"
      >
        Hello, I’m <span className="text-primary font-semibold">Sadaf</span>
      </motion.p>

      <h1
        ref={textRef}
        className="parallax-text text-6xl sm:text-9xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_#63ba0b] will-change-transform z-30"
      >
        I DESIGN
      </h1>

      <div
        ref={iconsLayerRef}
        className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none z-10"
      />

      <div className="absolute bottom-10 text-sm text-neutral-400 animate-bounce z-30">
        ↓ Scroll for more ↓
      </div>
    </section>
  );
}
