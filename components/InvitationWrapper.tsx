"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  m,
  AnimatePresence,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "framer-motion";
import Cover from "./Cover";
import InvitationContent from "./InvitationContent";
import MusicPlayer from "./MusicPlayer";

interface InvitationWrapperProps {
  guestName: string;
}

const SESSION_KEY = "invitation-opened";

export default function InvitationWrapper({
  guestName,
}: InvitationWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const hasTriggeredAutoPlay = useRef(false);

  // Check sessionStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const wasOpened = sessionStorage.getItem(SESSION_KEY);
    if (wasOpened === "true") {
      setIsOpen(true);
      // Also trigger autoplay if returning to opened invitation
      if (!hasTriggeredAutoPlay.current) {
        setShouldAutoPlay(true);
        hasTriggeredAutoPlay.current = true;
      }
    }
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setIsOpen(true);
    sessionStorage.setItem(SESSION_KEY, "true");
    // Trigger auto play only on first open
    if (!hasTriggeredAutoPlay.current) {
      setShouldAutoPlay(true);
      hasTriggeredAutoPlay.current = true;
    }
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative">
        {/* Content Layer - Always rendered but hidden initially */}
        <m.div
          key="content"
          initial={{ opacity: 0 }}
          animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: isOpen ? 0.8 : 0 }}
          className={!isOpen ? "pointer-events-none" : ""}
        >
          <InvitationContent guestName={guestName} />
          {isOpen && <MusicPlayer autoPlay={shouldAutoPlay} />}
        </m.div>

        {/* Cover Layer - Slides up when opened */}
        <AnimatePresence>
          {!isOpen && (
            <m.div
              key="cover"
              initial={{ y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0, transition: { duration: 0.5 } }
                  : {
                      y: "-100%",
                      transition: {
                        duration: 1.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
              }
              className="fixed inset-0 z-50"
            >
              <Cover
                guestName={guestName}
                onOpenInvitation={handleOpenInvitation}
              />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
