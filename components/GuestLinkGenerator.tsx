"use client";

import { useState, useEffect, useMemo } from "react";
import { m, useReducedMotion, LazyMotion, domAnimation } from "framer-motion";
import {
  generateInvitationLink,
  generateInvitationText,
  greetingOptions,
  type GreetingOption,
} from "@/lib/guest";

export default function GuestLinkGenerator() {
  const prefersReducedMotion = useReducedMotion();
  const [guestName, setGuestName] = useState("");
  const [greeting, setGreeting] = useState<GreetingOption>("Bapak/Ibu");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    // Get base URL on client side
    setBaseUrl(
      window.location.origin || process.env.NEXT_PUBLIC_BASE_URL || "",
    );
  }, []);

  const generatedLink = useMemo(() => {
    if (!guestName.trim() || !baseUrl) return "";
    return generateInvitationLink(guestName, baseUrl);
  }, [guestName, baseUrl]);

  const generatedText = useMemo(() => {
    if (!guestName.trim() || !generatedLink) return "";
    return generateInvitationText(guestName, greeting, generatedLink);
  }, [guestName, greeting, generatedLink]);

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage(message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setToastMessage(message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <m.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 mb-6 transition-colors"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Undangan
            </a>

            <h1 className="font-script text-4xl md:text-5xl text-gray-800 mb-3">
              Generate Link Undangan
            </h1>
            <p className="text-gray-600">
              Buat link undangan personal untuk setiap tamu
            </p>
          </m.div>

          {/* Form */}
          <m.div
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100"
          >
            {/* Guest Name Input */}
            <div className="mb-6">
              <label
                htmlFor="guestName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Tamu
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Rizki Maulana"
                maxLength={50}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-lg"
              />
              <p className="text-xs text-gray-400 mt-1">Maksimal 50 karakter</p>
            </div>

            {/* Greeting Dropdown */}
            <div className="mb-8">
              <label
                htmlFor="greeting"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sapaan
              </label>
              <select
                id="greeting"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value as GreetingOption)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all text-lg"
              >
                {greetingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">
                  Hasil Generate
                </span>
              </div>
            </div>

            {/* Generated Link */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link Undangan
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  placeholder="Link akan muncul di sini..."
                  className="w-full px-4 py-3 pr-24 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 outline-none"
                />
                <button
                  onClick={() =>
                    copyToClipboard(generatedLink, "Link berhasil disalin!")
                  }
                  disabled={!generatedLink}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gold-500 text-white text-sm rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Salin
                </button>
              </div>
            </div>

            {/* Generated Text */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teks Undangan (untuk WhatsApp)
              </label>
              <textarea
                value={generatedText}
                readOnly
                rows={12}
                placeholder="Teks undangan akan muncul di sini..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 outline-none resize-none font-mono text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() =>
                  copyToClipboard(generatedLink, "Link berhasil disalin!")
                }
                disabled={!generatedLink}
                className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gold-500 text-gold-600 rounded-xl font-medium hover:bg-gold-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Salin Link
              </button>

              <button
                onClick={() =>
                  copyToClipboard(
                    generatedText,
                    "Teks + Link berhasil disalin!",
                  )
                }
                disabled={!generatedText}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-medium hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Salin Teks + Link
              </button>
            </div>

            {/* WhatsApp Share */}
            {generatedText && (
              <m.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(generatedText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Kirim via WhatsApp
                </a>
              </m.div>
            )}
          </m.div>

          {/* Instructions */}
          <m.div
            {...fadeUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 bg-primary-50 rounded-2xl p-6 border border-primary-100"
          >
            <h3 className="font-semibold text-primary-800 mb-3 flex items-center gap-2">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cara Menggunakan
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-primary-700">
              <li>Masukkan nama tamu yang akan diundang</li>
              <li>Pilih sapaan yang sesuai</li>
              <li>Klik "Salin Teks + Link" untuk menyalin</li>
              <li>Paste ke WhatsApp dan kirim ke tamu</li>
            </ol>
          </m.div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg z-50 flex items-center gap-2"
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
            {toastMessage}
          </m.div>
        )}
      </div>
    </LazyMotion>
  );
}
