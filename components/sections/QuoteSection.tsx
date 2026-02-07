"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { invitationData } from "@/data/invitation";

export default function QuoteSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  return (
    <section className="relative py-20 md:py-28 bg-cream-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative Flowers */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 md:w-24 h-32 md:h-48 opacity-20">
        <Image
          src="/icons/flower-side.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 md:w-24 h-32 md:h-48 opacity-20 -scale-x-100">
        <Image
          src="/icons/flower-side.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        {/* Quote Icon */}
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <svg
            className="w-12 h-12 text-gold-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </m.div>

        {/* Quote Text */}
        <m.blockquote
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-serif italic mb-6">
            "{invitationData.quote.text}"
          </p>
          <footer className="text-gold-600 font-medium">
            — {invitationData.quote.source}
          </footer>
        </m.blockquote>

        {/* Decorative Line */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center mt-10"
        >
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </m.div>
      </div>
    </section>
  );
}
