"use client";

import { useState } from "react";
import { m, useReducedMotion, AnimatePresence } from "framer-motion";
import { invitationData } from "@/data/invitation";

// Bank logo components
const BankLogos: Record<string, React.FC<{ className?: string }>> = {
  bca: ({ className }) => (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="4" fill="#003D79" />
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="bold"
        fontFamily="Arial"
      >
        BCA
      </text>
    </svg>
  ),
  mandiri: ({ className }) => (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="4" fill="#003366" />
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fill="#F7A800"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Arial"
      >
        mandiri
      </text>
    </svg>
  ),
  bni: ({ className }) => (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="4" fill="#F15A22" />
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="bold"
        fontFamily="Arial"
      >
        BNI
      </text>
    </svg>
  ),
  bri: ({ className }) => (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="4" fill="#00529C" />
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="bold"
        fontFamily="Arial"
      >
        BRI
      </text>
    </svg>
  ),
  default: ({ className }) => (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="4" fill="#6B7280" />
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Arial"
      >
        BANK
      </text>
    </svg>
  ),
};

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

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        {/* Section Title */}
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gold-500 mb-3">
            Wedding Gift
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-4">
            Kirim Hadiah
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
          <p className="text-gray-600 max-w-md mx-auto">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
            Namun jika Anda ingin memberikan tanda kasih, kami menyediakan
            informasi berikut.
          </p>
        </m.div>

        {/* Gift Icon */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gold-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>
        </m.div>

        {/* Bank Account Cards */}
        <div className="grid gap-6">
          {invitationData.bankAccounts.map((account, index) => {
            const LogoComponent =
              BankLogos[account.logo.toLowerCase()] || BankLogos.default;
            const isCopied = copiedIndex === index;

            return (
              <m.div
                key={index}
                {...fadeUp}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-cream-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Bank Logo */}
                  <div className="flex-shrink-0">
                    <LogoComponent className="w-28 h-10" />
                  </div>

                  {/* Account Info */}
                  <div className="flex-grow">
                    <p className="text-gray-500 text-sm mb-1">
                      a.n {account.accountName}
                    </p>
                    <p className="text-2xl md:text-3xl font-mono font-semibold text-gray-800 tracking-wider">
                      {account.accountNumber}
                    </p>
                  </div>

                  {/* Copy Button */}
                  <div className="flex-shrink-0">
                    <m.button
                      onClick={() => handleCopy(account.accountNumber, index)}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                      className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                        isCopied
                          ? "bg-green-500 text-white"
                          : "bg-gold-100 text-gold-700 hover:bg-gold-200"
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
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Thank you note */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-cream-100 rounded-full">
            <svg
              className="w-5 h-5 text-gold-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-gray-600 text-sm">
              Terima kasih atas perhatian dan kebaikan Anda
            </span>
          </div>
        </m.div>
      </div>
    </section>
  );
}
