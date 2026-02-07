"use client";

import { m, useReducedMotion } from "framer-motion";
import { invitationData } from "@/data/invitation";

// Animated Flower Component
function FloatingFlower({
  className,
  delay = 0,
  duration = 4,
  size = "md",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  size?: "sm" | "md" | "lg";
}) {
  const prefersReducedMotion = useReducedMotion();
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
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
        className="w-full h-full text-gold-400 opacity-60"
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
          <circle
            cx="50"
            cy="50"
            r="8"
            className="text-gold-300"
            fill="currentColor"
          />
        </g>
      </svg>
    </m.div>
  );
}

// Falling Petal Component
function FallingPetal({
  delay = 0,
  left = "10%",
}: {
  delay?: number;
  left?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <m.div
      className="absolute top-0 w-3 h-3 pointer-events-none"
      style={{ left }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: ["0%", "100vh"],
        opacity: [0, 1, 1, 0],
        rotate: [0, 360],
        x: [0, 30, -20, 40, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        viewBox="0 0 20 20"
        className="w-full h-full text-pink-300 opacity-70"
      >
        <ellipse cx="10" cy="10" rx="8" ry="5" fill="currentColor" />
      </svg>
    </m.div>
  );
}

export default function EventSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  const events = [
    {
      ...invitationData.events.akad,
      color: "from-purple-500 to-purple-700",
    },
    {
      ...invitationData.events.resepsi,
      color: "from-gold-500 to-gold-700",
    },
  ];

  // Google Maps embed URL - extract coordinates from mapsUrl
  const getEmbedUrl = (mapsUrl: string) => {
    // Default coordinates if parsing fails
    const defaultCoords = "-7.7956,110.3695";
    try {
      const match = mapsUrl.match(/q=([-\d.]+),([-\d.]+)/);
      const coords = match ? `${match[1]},${match[2]}` : defaultCoords;
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${coords.split(",")[1]}!3d${coords.split(",")[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDQuMiJTIDExMMKwMjInMTAuMiJF!5e0!3m2!1sen!2sid!4v1234567890`;
    } catch {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d110.3695!3d-7.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`;
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-cream-50 via-white to-cream-50 overflow-hidden">
      {/* Animated Floating Flowers */}
      <FloatingFlower className="top-10 left-[5%]" delay={0} size="lg" />
      <FloatingFlower className="top-20 right-[8%]" delay={0.5} size="md" />
      <FloatingFlower className="top-1/3 left-[3%]" delay={1} size="sm" />
      <FloatingFlower className="top-1/2 right-[5%]" delay={1.5} size="lg" />
      <FloatingFlower className="bottom-32 left-[10%]" delay={2} size="md" />
      <FloatingFlower className="bottom-20 right-[12%]" delay={2.5} size="sm" />
      <FloatingFlower className="top-[60%] left-[8%]" delay={3} size="md" />
      <FloatingFlower className="bottom-40 right-[3%]" delay={0.8} size="lg" />

      {/* Falling Petals */}
      <FallingPetal delay={0} left="10%" />
      <FallingPetal delay={1.5} left="25%" />
      <FallingPetal delay={3} left="45%" />
      <FallingPetal delay={4.5} left="65%" />
      <FallingPetal delay={6} left="80%" />
      <FallingPetal delay={2} left="90%" />

      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        {/* Section Title */}
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gold-500 mb-3">
            Waktu & Tempat
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-4">
            Acara Pernikahan
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </m.div>

        {/* Event Cards - Modern Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <m.div
              key={event.name}
              {...fadeUp}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-gray-100">
                {/* Top Gradient Bar */}
                <div className={`h-2 bg-gradient-to-r ${event.color}`} />

                {/* Card Content */}
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl md:text-3xl text-gray-800 font-semibold">
                      {event.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{event.venue}</p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Date */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-gold-600 mb-2">
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
                        <span className="text-xs font-medium uppercase tracking-wide">
                          Tanggal
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium text-sm">
                        {event.date}
                      </p>
                    </div>

                    {/* Time */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-gold-600 mb-2">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs font-medium uppercase tracking-wide">
                          Waktu
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium text-sm">
                        {event.time}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-gradient-to-br from-gold-50 to-cream-100 rounded-2xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">
                          {event.venue}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {event.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {/* <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r ${event.color} text-white rounded-2xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span>Buka di Google Maps</span>
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a> */}
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Embedded Google Maps */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl text-gray-700 mb-2">
              Lokasi Acara
            </h3>
            <p className="text-gray-500 text-sm">
              Klik peta untuk petunjuk arah
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            {/* Map Container with Gradient Overlay */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gray-100">
              <iframe
                src={getEmbedUrl(invitationData.events.akad.mapsUrl)}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Lokasi Acara Pernikahan"
              />

              {/* Decorative Corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-gold-400 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-gold-400 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-gold-400 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-gold-400 rounded-br-lg" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <a
              href={invitationData.events.akad.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-purple-500 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors"
            >
              <span>Klik Untuk Membuka Maps</span>
            </a>
            
          </div>
        </m.div>
      </div>
    </section>
  );
}
