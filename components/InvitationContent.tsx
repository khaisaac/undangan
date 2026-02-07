"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import HeroSection from "./sections/HeroSection";
import QuoteSection from "./sections/QuoteSection";
import CountdownSection from "./sections/CountdownSection";
import CoupleSection from "./sections/CoupleSection";
import EventSection from "./sections/EventSection";
import TimelineSection from "./sections/TimelineSection";
import GallerySection from "./sections/GallerySection";
import GiftSection from "./sections/GiftSection";
import RSVPSection from "./sections/RSVPSection";
import FooterSection from "./sections/FooterSection";

interface InvitationContentProps {
  guestName: string;
}

export default function InvitationContent({
  guestName,
}: InvitationContentProps) {
  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-cream-50">
        <HeroSection />
        <QuoteSection />
        <CoupleSection />
        <CountdownSection />
        <EventSection />
        <TimelineSection />
        <GallerySection />
        <GiftSection />
        <RSVPSection guestName={guestName} />
        <FooterSection />
      </main>
    </LazyMotion>
  );
}
