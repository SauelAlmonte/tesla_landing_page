"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { sections } from "@/lib/sections";
import { EASE_OUT } from "@/lib/motion";

const navLinkClass =
  "rounded-lg px-3 py-1.5 text-sm font-medium text-white/85 transition-colors duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Navbar() {
  const reduce = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
      animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 transition-colors duration-300 sm:px-6 sm:py-4 ${
        scrolled ? "bg-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo (inverted to white for the dark canvas) */}
      <a
        href="#model-s"
        aria-label="Tesla home"
        className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <Image
          src="/tesla.svg"
          alt="Tesla"
          width={342}
          height={35}
          priority
          className="w-[150px] invert"
        />
      </a>

      {/* Center model links — desktop only */}
      <nav className="hidden lg:flex lg:items-center lg:gap-1">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className={navLinkClass}>
            {section.name}
          </a>
        ))}
      </nav>

      {/* Account / Menu */}
      <div className="flex items-center gap-1">
        <a href="#shop" className={`${navLinkClass} hidden lg:block`}>
          Shop
        </a>
        <a href="#account" className={`${navLinkClass} hidden lg:block`}>
          Account
        </a>
        <button type="button" className={navLinkClass}>
          Menu
        </button>
      </div>
    </motion.header>
  );
}
