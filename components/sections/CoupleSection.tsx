"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/data/invitation";

// Animated Flower Component
function FloatingFlower({
  className,
  delay = 0,
  duration = 4,
  size = "md",
  color = "gold",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  size?: "sm" | "md" | "lg";
  color?: "gold" | "pink" | "purple";
}) {
  const prefersReducedMotion = useReducedMotion();
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };
  const colorClasses = {
    gold: "text-gold-400",
    pink: "text-pink-300",
    purple: "text-purple-300",
  };

  return (
    <m.div
      className={`absolute pointer-events-none ${sizeClasses[size]} ${className}`}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${colorClasses[color]} opacity-60`}
      >
        <g fill="currentColor">
          <ellipse cx="50" cy="50" rx="20" ry="8" transform="rotate(0 50 50)" />
          <ellipse
            cx="50"
            cy="50"
            rx="20"
            ry="8"
            transform="rotate(45 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="20"
            ry="8"
            transform="rotate(90 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="20"
            ry="8"
            transform="rotate(135 50 50)"
          />
          <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.8" />
        </g>
      </svg>
    </m.div>
  );
}

// Falling Petal Component
function FallingPetal({
  delay = 0,
  left = "10%",
  color = "pink",
}: {
  delay?: number;
  left?: string;
  color?: "pink" | "gold";
}) {
  const prefersReducedMotion = useReducedMotion();
  const colorClass = color === "pink" ? "text-pink-300" : "text-gold-300";

  if (prefersReducedMotion) return null;

  return (
    <m.div
      className="absolute top-0 w-3 h-3 pointer-events-none"
      style={{ left }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: ["0%", "100%"],
        opacity: [0, 1, 1, 0],
        rotate: [0, 360],
        x: [0, 20, -15, 25, 0],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        viewBox="0 0 20 20"
        className={`w-full h-full ${colorClass} opacity-70`}
      >
        <ellipse cx="10" cy="10" rx="8" ry="5" fill="currentColor" />
      </svg>
    </m.div>
  );
}

export default function CoupleSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  const stagger = {
    whileInView: { transition: { staggerChildren: 0.2 } },
    viewport: { once: true },
  };

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Animated Floating Flowers */}
      <FloatingFlower
        className="top-10 left-[5%]"
        delay={0}
        size="lg"
        color="gold"
      />
      <FloatingFlower
        className="top-16 right-[6%]"
        delay={0.5}
        size="md"
        color="pink"
      />
      <FloatingFlower
        className="top-1/4 left-[3%]"
        delay={1}
        size="sm"
        color="purple"
      />
      <FloatingFlower
        className="top-1/3 right-[4%]"
        delay={1.5}
        size="lg"
        color="gold"
      />
      <FloatingFlower
        className="top-1/2 left-[6%]"
        delay={2}
        size="md"
        color="pink"
      />
      <FloatingFlower
        className="top-1/2 right-[8%]"
        delay={2.5}
        size="sm"
        color="gold"
      />
      <FloatingFlower
        className="bottom-1/3 left-[4%]"
        delay={3}
        size="lg"
        color="purple"
      />
      <FloatingFlower
        className="bottom-1/4 right-[5%]"
        delay={0.8}
        size="md"
        color="pink"
      />
      <FloatingFlower
        className="bottom-20 left-[8%]"
        delay={1.2}
        size="sm"
        color="gold"
      />
      <FloatingFlower
        className="bottom-16 right-[10%]"
        delay={1.8}
        size="lg"
        color="gold"
      />

      {/* Falling Petals */}
      <FallingPetal delay={0} left="8%" color="pink" />
      <FallingPetal delay={2} left="20%" color="gold" />
      <FallingPetal delay={4} left="35%" color="pink" />
      <FallingPetal delay={1} left="50%" color="gold" />
      <FallingPetal delay={3} left="65%" color="pink" />
      <FallingPetal delay={5} left="80%" color="gold" />
      <FallingPetal delay={2.5} left="92%" color="pink" />

      {/* Background Decorative Blurs */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-gold-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2" />
      <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-purple-200 rounded-full filter blur-3xl opacity-15" />

      {/* Section Title */}
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gold-500 mb-3">
            Bismillahirrahmanirrahim
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-4">
            Calon Mempelai
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </m.div>

        {/* Couple Cards */}
        <div className="relative">
          <m.div
            {...stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
          >
            {/* Groom */}
            <m.div
              {...fadeUp}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-gold-300 animate-pulse" />
                <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={invitationData.groom.photo}
                    alt={invitationData.groom.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-full border border-gold-200 opacity-50" />
              </div>

              <h3 className="font-script text-3xl md:text-4xl text-gray-800 mb-2">
                {invitationData.groom.fullName}
              </h3>
              <p className="text-gray-600 mb-4">
                {invitationData.groom.parentInfo}
              </p>
              {invitationData.groom.instagram && (
                <a
                  href={`https://instagram.com/${invitationData.groom.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  {invitationData.groom.instagram}
                </a>
              )}
            </m.div>

            {/* Mobile Ampersand - between cards */}
            <div className="flex md:hidden justify-center items-center py-4">
              <span className="font-script text-5xl text-gold-400">&</span>
            </div>

            {/* Bride */}
            <m.div
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-gold-300 animate-pulse" />
                <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={invitationData.bride.photo}
                    alt={invitationData.bride.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                </div>
                <div className="absolute -inset-3 rounded-full border border-gold-200 opacity-50" />
              </div>

              <h3 className="font-script text-3xl md:text-4xl text-gray-800 mb-2">
                {invitationData.bride.fullName}
              </h3>
              <p className="text-gray-600 mb-4">
                {invitationData.bride.parentInfo}
              </p>
              {invitationData.bride.instagram && (
                <a
                  href={`https://instagram.com/${invitationData.bride.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  {invitationData.bride.instagram}
                </a>
              )}
            </m.div>
          </m.div>

          {/* Desktop Ampersand - centered between cards */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <span className="font-script text-6xl text-gold-400">&</span>
          </div>
        </div>
      </div>
    </section>
  );
}
