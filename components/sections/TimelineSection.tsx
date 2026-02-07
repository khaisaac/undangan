"use client";

import { m, useReducedMotion } from "framer-motion";
import { invitationData } from "@/data/invitation";

const storyData = [
  {
    title: "Awal Mula",
    subtitle: "Pertemuan Pertama",
    description:
      "Kisah kami bermula dari sebuah pertemuan yang tak terduga. Allah mempertemukan kami di saat yang tepat, di tempat yang tepat. Dari sanalah benih-benih cinta mulai tumbuh dalam hati kami.",
    year: "2022",
  },
  {
    title: "Janji",
    subtitle: "Lamaran & Pertunangan",
    description:
      "Dengan penuh keyakinan dan doa, kami memutuskan untuk melangkah lebih jauh. Sebuah janji suci terucap di hadapan keluarga, menyatukan dua hati yang saling mencinta dalam ikatan yang lebih kuat.",
    year: "2025",
  },
  {
    title: "Tujuan",
    subtitle: "Membangun Keluarga Sakinah",
    description:
      "Pernikahan ini adalah awal dari perjalanan baru kami. Dengan ridho Allah SWT, kami bertekad membangun keluarga yang sakinah, mawaddah, wa rahmah. Bersama menggapai kebahagiaan dunia dan akhirat.",
    year: "2026",
  },
];

export default function TimelineSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-cream-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Section Title */}
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gold-500 mb-3">
            Our Journey
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-4">
            Perjalanan Kisah Kami
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
          <p className="text-gray-600 max-w-md mx-auto">
            Setiap langkah adalah bagian dari rencana indah-Nya
          </p>
        </m.div>

        {/* Story Cards */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-200 via-gold-400 to-gold-200 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {storyData.map((story, index) => (
              <m.div
                key={story.title}
                {...fadeUp}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`relative md:flex md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${index !== 0 ? "md:mt-[-40px]" : ""}`}
              >
                {/* Year Badge - Center */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20">
                  <m.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-white border-4 border-gold-400 shadow-lg flex items-center justify-center"
                  >
                    <span className="text-gold-600 font-bold text-sm">
                      {story.year}
                    </span>
                  </m.div>
                </div>

                {/* Card */}
                <div
                  className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}
                >
                  <m.div
                    whileHover={prefersReducedMotion ? {} : { y: -5 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border border-cream-200 relative overflow-hidden group"
                  >
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-100/50 to-transparent rounded-bl-full" />

                    {/* Mobile Year Badge */}
                    <div className="md:hidden mb-4">
                      <span className="inline-block px-4 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold">
                        {story.year}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-script text-3xl text-gray-800 mb-1">
                      {story.title}
                    </h3>
                    <p className="text-gold-600 text-sm font-medium mb-4 uppercase tracking-wider">
                      {story.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {story.description}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-6 w-12 h-1 bg-gradient-to-r from-gold-400 to-gold-200 rounded-full" />
                  </m.div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </m.div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-cream-200">
            <span className="text-2xl">♥</span>
            <p className="text-gray-600 italic">
              "{invitationData.groom.name} & {invitationData.bride.name} —
              Bersama selamanya"
            </p>
            <span className="text-2xl">♥</span>
          </div>
        </m.div>
      </div>
    </section>
  );
}
