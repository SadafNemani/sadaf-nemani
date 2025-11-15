"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextPressure from "./TextPressure";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <TextPressure
        text="Sadaf.Nemani"
        flex={false}
        alpha={false}
        stroke={false}
        width={false}
        weight={true}
        italic={true}
        textColor="#ffffff"
        strokeColor="#ff0000"
        minFontSize={36}
      />
    </section>
  )
}
