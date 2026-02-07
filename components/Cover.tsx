"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/data/invitation";

interface CoverProps {
  guestName: string;
  onOpenInvitation: () => void;
}

export default function Cover({ guestName, onOpenInvitation }: CoverProps) {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <LazyMotion features={domAnimation}>
      <div className="absolute inset-0 overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={invitationData.images.cover}
            alt="Cover Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-30">
          <Image
            src="/icons/flower-corner.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-30 rotate-180">
          <Image
            src="/icons/flower-corner.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
          {/* Wedding Invitation Label */}
          <m.p
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase text-gold-300 mb-4"
          >
            The Wedding Of
          </m.p>

          {/* Couple Names */}
          <m.h1
            {...fadeUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-script text-5xl md:text-7xl lg:text-8xl text-white mb-2"
          >
            {invitationData.groom.name}
          </m.h1>

          {/* Ampersand with elegant decoration */}
          <m.div
            {...fadeUp}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-3 md:gap-5 my-6"
          >
            {/* Left flourish */}
            <svg
              className="w-16 md:w-24 h-6 text-gold-400"
              viewBox="0 0 100 24"
              fill="none"
            >
              <path
                d="M100 12C85 12 80 6 70 6C60 6 55 12 45 12C35 12 30 6 20 6C10 6 5 12 0 12"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-60"
              />
              <circle cx="95" cy="12" r="2" fill="currentColor" />
            </svg>

            {/* Ampersand with heart */}
            <div className="relative">
              <m.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Heart background */}
                <svg
                  className="w-14 h-14 md:w-16 md:h-16 text-gold-400/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>

                {/* Ampersand text */}
                <span className="relative z-10 font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-gold-200 via-gold-400 to-gold-500 drop-shadow-lg">
                  &
                </span>
              </m.div>
            </div>

            {/* Right flourish */}
            <svg
              className="w-16 md:w-24 h-6 text-gold-400 rotate-180"
              viewBox="0 0 100 24"
              fill="none"
            >
              <path
                d="M100 12C85 12 80 6 70 6C60 6 55 12 45 12C35 12 30 6 20 6C10 6 5 12 0 12"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-60"
              />
              <circle cx="95" cy="12" r="2" fill="currentColor" />
            </svg>
          </m.div>

          <m.h1
            {...fadeUp}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-script text-5xl md:text-7xl lg:text-8xl text-white mb-8"
          >
            {invitationData.bride.name}
          </m.h1>

          {/* Date */}
          <m.p
            {...fadeUp}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-cream-200 mb-12"
          >
            {invitationData.shortDate}
          </m.p>

          {/* Divider */}
          <m.div
            {...fadeUp}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-12"
          />

          {/* Guest Name */}
          <m.div
            {...fadeUp}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-10"
          >
            <p className="text-sm md:text-base text-cream-300 mb-2">
              Kepada Yth:
            </p>
            <p className="text-xl md:text-2xl font-serif text-white">
              {guestName}
            </p>
          </m.div>

          {/* Open Button */}
          <m.button
            ref={buttonRef}
            {...fadeUp}
            transition={{ delay: 1.4, duration: 0.8 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={onOpenInvitation}
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 rounded-full text-white font-medium text-lg shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 transition-shadow duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Buka Undangan
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </m.button>
        </div>
      </div>
    </LazyMotion>
  );
}
