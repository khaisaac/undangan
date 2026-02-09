"use client";

import { useState } from "react";
import { m, useReducedMotion, AnimatePresence } from "framer-motion";
import { invitationData } from "@/data/invitation";
import Image from "next/image";

export default function GiftSection() {
  const prefersReducedMotion = useReducedMotion();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  // Floating animation for gift icon
  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        animate: {
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0],
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  // Pulse animation for heart
  const pulseAnimation = prefersReducedMotion
    ? {}
    : {
        animate: {
          scale: [1, 1.2, 1],
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  // Card hover/tap animation
  const cardAnimation = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
      };

  // Stagger children animation
  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    viewport: { once: true },
  };

  const staggerItem = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
      };

  const handleCopy = async (accountNumber: string, index: number) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-cream-50 to-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Floating decorative elements for mobile */}
      <m.div
        className="absolute top-20 left-4 w-3 h-3 rounded-full bg-gold-300/30 md:hidden"
        animate={prefersReducedMotion ? {} : {
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="absolute top-40 right-6 w-2 h-2 rounded-full bg-gold-400/40 md:hidden"
        animate={prefersReducedMotion ? {} : {
          y: [0, -10, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <m.div
        className="absolute bottom-32 left-8 w-4 h-4 rounded-full bg-gold-200/30 md:hidden"
        animate={prefersReducedMotion ? {} : {
          y: [0, -12, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        {/* Section Title */}
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <m.p 
            className="text-sm tracking-[0.3em] uppercase text-gold-500 mb-3"
            initial={prefersReducedMotion ? {} : { opacity: 0, letterSpacing: "0.1em" }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Wedding Gift
          </m.p>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-4">
            Kirim Hadiah
          </h2>
          <m.div 
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4"
            initial={prefersReducedMotion ? {} : { scaleX: 0 }}
            whileInView={prefersReducedMotion ? {} : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-md mx-auto">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
            Namun jika Anda ingin memberikan tanda kasih, kami menyediakan
            informasi berikut.
          </p>
        </m.div>

        {/* Gift Icon with floating animation */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <m.div 
            className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center shadow-lg shadow-gold-200/50"
            {...floatAnimation}
          >
            <m.svg
              className="w-10 h-10 text-gold-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={prefersReducedMotion ? {} : { 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </m.svg>
          </m.div>
        </m.div>

        {/* Bank Account Cards */}
        <m.div 
          className="grid gap-6"
          {...staggerContainer}
        >
          {invitationData.bankAccounts.map((account, index) => {
            const bankLogoPath = `/icons/${account.logo.toLowerCase()}.png`;
            const isCopied = copiedIndex === index;

            return (
              <m.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 40, scale: 0.95 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: 0.2 + index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                {...cardAnimation}
                className="bg-white rounded-2xl p-6 shadow-lg border border-cream-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer effect on hover/tap */}
                <m.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 relative z-10">
                  {/* Bank Logo with animation */}
                  <m.div 
                    className="flex-shrink-0"
                    {...staggerItem}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <m.div
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    >
                      <Image
                        src={bankLogoPath}
                        alt={`Logo ${account.logo}`}
                        width={112}
                        height={40}
                        className="w-28 h-10 object-contain"
                      />
                    </m.div>
                  </m.div>

                  {/* Account Info with stagger animation */}
                  <m.div 
                    className="flex-grow"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <m.p 
                      className="text-gray-500 text-sm mb-1"
                      initial={prefersReducedMotion ? {} : { opacity: 0 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      a.n {account.accountName}
                    </m.p>
                    <m.p 
                      className="text-xl md:text-3xl font-mono font-semibold text-gray-800 tracking-wider"
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.55 + index * 0.1 }}
                    >
                      {account.accountNumber}
                    </m.p>
                  </m.div>

                  {/* Copy Button with enhanced animation */}
                  <m.div 
                    className="flex-shrink-0 w-full md:w-auto"
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  >
                    <m.button
                      onClick={() => handleCopy(account.accountNumber, index)}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.92 }}
                      className={`relative w-full md:w-auto px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isCopied
                          ? "bg-green-500 text-white shadow-lg shadow-green-200"
                          : "bg-gold-100 text-gold-700 hover:bg-gold-200 active:bg-gold-300"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isCopied ? (
                          <m.span
                            key="copied"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                          >
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Tersalin!
                          </m.span>
                        ) : (
                          <m.span
                            key="copy"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                          >
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
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Salin
                          </m.span>
                        )}
                      </AnimatePresence>
                    </m.button>
                  </m.div>
                </div>
              </m.div>
            );
          })}
        </m.div>

        {/* Thank you note with pulse animation */}
        <m.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
          className="mt-10 text-center"
        >
          <m.div 
            className="inline-flex items-center gap-2 px-6 py-3 bg-cream-100 rounded-full shadow-md"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          >
            <m.svg
              className="w-5 h-5 text-gold-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              {...pulseAnimation}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </m.svg>
            <span className="text-gray-600 text-sm">
              Terima kasih atas perhatian dan kebaikan Anda
            </span>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
