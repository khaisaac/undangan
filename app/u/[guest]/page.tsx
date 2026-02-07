import { sanitizeGuestName } from "@/lib/guest";
import InvitationWrapper from "@/components/InvitationWrapper";

interface PageProps {
  params: Promise<{ guest: string }>;
}

export default async function GuestPage({ params }: PageProps) {
  const resolvedParams = await params;
  const guestName = sanitizeGuestName(resolvedParams.guest);

  return <InvitationWrapper guestName={guestName} />;
}

// Enable dynamic rendering
export const dynamic = "force-dynamic";
