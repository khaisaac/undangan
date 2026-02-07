"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { sanitizeGuestName } from "@/lib/guest";
import InvitationWrapper from "@/components/InvitationWrapper";

function HomeContent() {
  const searchParams = useSearchParams();
  const guestName = sanitizeGuestName(searchParams.get("to"));

  return <InvitationWrapper guestName={guestName} />;
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
