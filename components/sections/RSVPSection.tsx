"use client";

import { useState, useEffect } from "react";
import { m, useReducedMotion, AnimatePresence } from "framer-motion";

interface Reaction {
  id: string;
  emoji: string;
  label: string;
  count: number;
}

interface RSVPSectionProps {
  guestName: string;
}

const STORAGE_KEY = "wedding-reactions";
const USER_REACTIONS_KEY = "wedding-user-reactions";

const initialReactions: Reaction[] = [
  { id: "love", emoji: "💕", label: "Bahagia", count: 128 },
  { id: "celebrate", emoji: "🎉", label: "Selamat!", count: 95 },
  { id: "pray", emoji: "🤲", label: "Doa", count: 87 },
  { id: "cry", emoji: "🥹", label: "Terharu", count: 64 },
  { id: "fire", emoji: "🔥", label: "Keren!", count: 52 },
  { id: "heart", emoji: "❤️", label: "Cinta", count: 143 },
];

export default function RSVPSection({ guestName }: RSVPSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [reactions, setReactions] = useState<Reaction[]>(initialReactions);
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [clickedReaction, setClickedReaction] = useState<string | null>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<
    { id: number; emoji: string; x: number }[]
  >([]);

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
      };

  // Load saved reactions from localStorage
  useEffect(() => {
    const savedReactions = localStorage.getItem(STORAGE_KEY);
    const savedUserReactions = localStorage.getItem(USER_REACTIONS_KEY);

    if (savedReactions) {
      try {
        setReactions(JSON.parse(savedReactions));
      } catch {
        // Invalid data, use initial
      }
    }

    if (savedUserReactions) {
      try {
        setUserReactions(new Set(JSON.parse(savedUserReactions)));
      } catch {
        // Invalid data, ignore
      }
    }
  }, []);

  const handleReaction = (reactionId: string) => {
    const hasReacted = userReactions.has(reactionId);

    setReactions((prev) => {
      const updated = prev.map((r) => {
        if (r.id === reactionId) {
          return {
            ...r,
            count: hasReacted ? r.count - 1 : r.count + 1,
          };
        }
        return r;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setUserReactions((prev) => {
      const newSet = new Set(prev);
      if (hasReacted) {
        newSet.delete(reactionId);
      } else {
        newSet.add(reactionId);
      }
      localStorage.setItem(
        USER_REACTIONS_KEY,
        JSON.stringify(Array.from(newSet)),
      );
      return newSet;
    });

    // Animation feedback
    if (!hasReacted) {
      setClickedReaction(reactionId);
      setTimeout(() => setClickedReaction(null), 300);

      // Add floating emoji
      const reaction = reactions.find((r) => r.id === reactionId);
      if (reaction && !prefersReducedMotion) {
        const newFloating = {
          id: Date.now(),
          emoji: reaction.emoji,
          x: Math.random() * 60 + 20, // 20-80% position
        };
        setFloatingEmojis((prev) => [...prev, newFloating]);
        setTimeout(() => {
          setFloatingEmojis((prev) =>
            prev.filter((f) => f.id !== newFloating.id),
          );
        }, 2000);
      }
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-cream-50 overflow-hidden">
      {/* Floating Emojis */}
      <AnimatePresence>
        {floatingEmojis.map((floating) => (
          <m.div
            key={floating.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -150, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="fixed bottom-1/3 text-4xl pointer-events-none z-50"
            style={{ left: `${floating.x}%` }}
          >
            {floating.emoji}
          </m.div>
        ))}
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-2xl">
        {/* Section Title */}
        <m.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gold-500 mb-3">
            Wishes
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-4">
            Kirim Doa & Ucapan
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
          <p className="text-gray-600">Berikan reaksi terbaik untuk kami</p>
        </m.div>

        {/* Reactions Grid */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-cream-200"
        >
          {/* User greeting */}
          {guestName && (
            <div className="text-center mb-8 pb-6 border-b border-cream-200">
              <p className="text-gray-500 text-sm">Hai,</p>
              <p className="text-xl font-serif text-gray-800">{guestName}</p>
              <p className="text-gray-500 text-sm mt-1">
                Pilih reaksi untuk kami ✨
              </p>
            </div>
          )}

          {/* Reaction buttons */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {reactions.map((reaction) => {
              const hasReacted = userReactions.has(reaction.id);
              const isClicked = clickedReaction === reaction.id;

              return (
                <m.button
                  key={reaction.id}
                  onClick={() => handleReaction(reaction.id)}
                  className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-200 ${
                    hasReacted
                      ? "bg-gold-50 border-2 border-gold-400 shadow-md"
                      : "bg-cream-50 border-2 border-transparent hover:border-gold-200 hover:bg-cream-100"
                  }`}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  animate={
                    isClicked && !prefersReducedMotion
                      ? {
                          scale: [1, 1.2, 1],
                          transition: { duration: 0.3 },
                        }
                      : {}
                  }
                >
                  {/* Emoji */}
                  <span className="text-3xl md:text-4xl mb-2">
                    {reaction.emoji}
                  </span>

                  {/* Label */}
                  <span
                    className={`text-xs font-medium ${hasReacted ? "text-gold-600" : "text-gray-500"}`}
                  >
                    {reaction.label}
                  </span>

                  {/* Count */}
                  <span
                    className={`text-sm font-semibold mt-1 ${hasReacted ? "text-gold-700" : "text-gray-700"}`}
                  >
                    {reaction.count}
                  </span>

                  {/* Active indicator */}
                  {hasReacted && (
                    <m.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </m.div>
                  )}
                </m.button>
              );
            })}
          </div>

          {/* Total reactions */}
          <div className="mt-8 pt-6 border-t border-cream-200 text-center">
            <p className="text-gray-500 text-sm">
              Total{" "}
              <span className="font-semibold text-gold-600">
                {reactions
                  .reduce((sum, r) => sum + r.count, 0)
                  .toLocaleString()}
              </span>{" "}
              reaksi dari tamu undangan
            </p>
          </div>

          {/* User's selected reactions */}
          {userReactions.size > 0 && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-gray-400 text-xs">
                Reaksi kamu:{" "}
                {reactions
                  .filter((r) => userReactions.has(r.id))
                  .map((r) => r.emoji)
                  .join(" ")}
              </p>
            </m.div>
          )}
        </m.div>

        {/* Thank you note */}
        <m.div
          {...fadeUp}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm italic">
            "Terima kasih atas doa dan ucapannya. Semoga Allah SWT membalas
            kebaikan kalian semua."
          </p>
        </m.div>
      </div>
    </section>
  );
}
