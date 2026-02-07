"use client";

import { useState, useEffect } from "react";
import { m, useReducedMotion } from "framer-motion";
import { invitationData, getCountdown } from "@/data/invitation";

export default function CountdownSection() {
  const prefersReducedMotion = useReducedMotion();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      setCountdown(getCountdown(invitationData.weddingDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  const countdownItems = [
    { value: countdown.days, label: "Hari" },
    { value: countdown.hours, label: "Jam" },
    { value: countdown.minutes, label: "Menit" },
    { value: countdown.seconds, label: "Detik" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-900 to-primary-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Section Title */}
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gold-300 mb-3">
            Menghitung Hari
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-white mb-4">
            Menuju Hari Bahagia
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </m.div>

        {/* Countdown Timer */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto"
        >
          {countdownItems.map((item, index) => (
            <m.div
              key={item.label}
              {...fadeUp}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-1">
                  {mounted ? String(item.value).padStart(2, "0") : "--"}
                </span>
                <span className="text-xs md:text-sm text-gold-300 uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Date Display */}
        <m.p
          {...fadeUp}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center text-white/80 mt-10 text-lg"
        >
          {invitationData.displayDate}
        </m.p>

        {/* Add to Calendar Button */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => {
              // Create calendar event
              const event = {
                title: `Pernikahan ${invitationData.groom.name} & ${invitationData.bride.name}`,
                start: invitationData.weddingDate,
                location: invitationData.events.akad.venue,
              };
              const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/-/g, "")}/${event.start.replace(/-/g, "")}&location=${encodeURIComponent(event.location)}`;
              window.open(googleCalendarUrl, "_blank");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-full transition-colors duration-300"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Simpan Tanggal
          </button>
        </m.div>
      </div>
    </section>
  );
}
