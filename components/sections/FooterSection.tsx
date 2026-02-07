"use client";

import { m, useReducedMotion } from "framer-motion";
import { invitationData } from "@/data/invitation";

// Animated heart component
function FloatingHeart({
  delay,
  x,
  size,
}: {
  delay: number;
  x: number;
  size: number;
}) {
  return (
    <m.div
      className="absolute text-pink-400/30"
      style={{ left: `${x}%`, bottom: 0, fontSize: size }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: -200,
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      ♥
    </m.div>
  );
}

// Sparkle component
function Sparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <m.div
      className="absolute w-1 h-1 bg-gold-300 rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function FooterSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
      };

  // Generate sparkles
  const sparkles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  // Generate floating hearts
  const hearts = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 10 + i * 15,
    delay: i * 0.8,
    size: 16 + Math.random() * 12,
  }));

  return (
    <footer className="relative py-24 md:py-32 bg-gradient-to-b from-primary-900 via-primary-950 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated Sparkles */}
      {!prefersReducedMotion &&
        sparkles.map((sparkle) => (
          <Sparkle
            key={sparkle.id}
            x={sparkle.x}
            y={sparkle.y}
            delay={sparkle.delay}
          />
        ))}

      {/* Floating Hearts */}
      {!prefersReducedMotion &&
        hearts.map((heart) => (
          <FloatingHeart
            key={heart.id}
            x={heart.x}
            delay={heart.delay}
            size={heart.size}
          />
        ))}

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      {/* Decorative Ornament */}
      <m.div
        className="absolute top-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <svg
          className="w-16 h-8 text-gold-400/40"
          viewBox="0 0 64 32"
          fill="currentColor"
        >
          <path
            d="M32 4c-8 0-16 8-16 16s8 12 16 12 16-4 16-12S40 4 32 4z"
            opacity="0.3"
          />
          <circle cx="32" cy="16" r="3" />
          <path
            d="M20 16c0-4 4-8 8-8M44 16c0-4-4-8-8-8"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
          />
        </svg>
      </m.div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        {/* Thank You Badge */}
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="inline-block mb-8"
        >
          {/* <span className="px-6 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-300 text-xs tracking-[0.3em] uppercase">
            Terima Kasih
          </span> */}
        </m.div>

        {/* Main Names with Decorative Frame */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="relative mb-10"
        >
          {/* Decorative Frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 md:w-96 h-32 border border-gold-400/20 rounded-[100px]" />
          </div>

          <h2 className="font-script text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 py-4">
            {invitationData.groom.name}
            <span className="inline-block mx-2 md:mx-4 text-4xl md:text-5xl align-middle">
              ♥
            </span>
            {invitationData.bride.name}
          </h2>
        </m.div>

        {/* Elegant Divider */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-gold-400/50" />
          <m.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="text-gold-400 text-lg"
          >
            ✦
          </m.div>
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-gold-400/50" />
        </m.div>

        {/* Closing Message */}
        <m.div {...fadeUp} transition={{ delay: 0.3, duration: 0.8 }}>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-light">
            {invitationData.closingMessage}
          </p>
        </m.div>

        {/* Islamic Greeting */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <span className="text-gold-400 text-xl">☪</span>
            <p className="text-gold-200/80 text-sm md:text-base font-serif italic">
              Wassalamualaikum Warahmatullahi Wabarakatuh
            </p>
            <span className="text-gold-400 text-xl">☪</span>
          </div>
        </m.div>

        {/* Social/Share Section */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center gap-6 mb-12"
        >
          <p className="text-white/40 text-sm">Bagikan kebahagiaan ini</p>
          <div className="flex items-center gap-4">
            {/* WhatsApp */}
            <m.a
              href={`https://wa.me/?text=${encodeURIComponent(`Undangan Pernikahan ${invitationData.groom.name} & ${invitationData.bride.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-green-400 hover:border-green-400/50 hover:bg-green-400/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </m.a>

            {/* Instagram */}
            <m.a
              href={`https://instagram.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </m.a>

            {/* Copy Link */}
            <m.button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-400/50 hover:bg-gold-400/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </m.button>
          </div>
        </m.div>

        {/* Bottom Section */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/30 text-sm">
            <p className="flex items-center gap-2">
              Made with
              <m.span
                animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="text-red-400"
              >
                ❤️
              </m.span>
              for our special day
            </p>
            <span className="hidden md:inline text-white/10">|</span>
            <p>© {new Date().getFullYear()} PT Techind Solusi Digital</p>
          </div>
        </m.div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </footer>
  );
}
