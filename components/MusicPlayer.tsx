"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasAutoPlayed = useRef(false);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio("/music/background.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsReady(true);
      // Try to autoplay immediately when ready
      if (autoPlay && !hasAutoPlayed.current) {
        hasAutoPlayed.current = true;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked by browser, user needs to click
            setIsPlaying(false);
          });
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    // Also try to load immediately
    audio.load();

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, [autoPlay]);

  // Handle autoplay when prop changes (backup)
  useEffect(() => {
    if (autoPlay && isReady && audioRef.current && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [autoPlay, isReady]);

  const handleToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Playback failed:", error));
      }
    }
  };

  return (
    <m.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white shadow-lg border border-gold-200 flex items-center justify-center hover:shadow-xl transition-shadow group"
      aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
    >
      {/* Animated rings when playing */}
      <AnimatePresence>
        {isPlaying && !prefersReducedMotion && (
          <>
            <m.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-gold-400"
            />
            <m.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full border-2 border-gold-400"
            />
          </>
        )}
      </AnimatePresence>

      {/* Icon */}
      <m.div
        animate={
          isPlaying && !prefersReducedMotion ? { rotate: 360 } : { rotate: 0 }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="relative z-10"
      >
        {isPlaying ? (
          // Music note icon (playing)
          <svg
            className="w-6 h-6 text-gold-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        ) : (
          // Muted icon
          <svg
            className="w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            <line
              x1="3"
              y1="3"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </m.div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isPlaying ? "Matikan musik" : "Nyalakan musik"}
      </span>
    </m.button>
  );
}
