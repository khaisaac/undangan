"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/data/invitation";

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={invitationData.images.hero}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-cream-50" />
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-4 left-4 w-20 h-20 md:w-32 md:h-32 opacity-50">
        <Image
          src="/icons/flower-corner.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute top-4 right-4 w-20 h-20 md:w-32 md:h-32 opacity-50 -scale-x-100">
        <Image
          src="/icons/flower-corner.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <m.p
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-gold-300 mb-6"
        >
          Undangan Pernikahan
        </m.p>

        <m.h1
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-white mb-4"
        >
          {invitationData.groom.name} & {invitationData.bride.name}
        </m.h1>

        <m.div
          {...fadeUp}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent my-6"
        />

        <m.p
          {...fadeUp}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90"
        >
          {invitationData.displayDate}
        </m.p>

        {/* Scroll Indicator */}
        <m.div
          {...fadeUp}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <m.div
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-white/70"
          >
            <span className="text-xs mb-2">Scroll</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
