"use client";

import { use } from "react";
import { sanitizeGuestName } from "@/lib/guest";
import InvitationWrapper from "@/components/InvitationWrapper";

interface PageProps {
  params: Promise<{ guest: string }>;
}

export default function GuestPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const guestName = sanitizeGuestName(resolvedParams.guest);

  return <InvitationWrapper guestName={guestName} />;
}
