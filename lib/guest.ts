// Utility functions untuk menangani nama tamu

const MAX_GUEST_NAME_LENGTH = 50;
const DEFAULT_GUEST_NAME = "Tamu Undangan";

/**
 * Decode dan sanitasi nama tamu dari URL
 */
export function sanitizeGuestName(rawName: string | null | undefined): string {
  if (!rawName) {
    return DEFAULT_GUEST_NAME;
  }

  try {
    // Decode URI component
    const decoded = decodeURIComponent(rawName);

    // Trim whitespace
    const trimmed = decoded.trim();

    // Return default if empty after trim
    if (!trimmed) {
      return DEFAULT_GUEST_NAME;
    }

    // Limit length
    const limited = trimmed.slice(0, MAX_GUEST_NAME_LENGTH);

    // Basic XSS sanitization - remove any HTML tags
    const sanitized = limited.replace(/<[^>]*>/g, "");

    return sanitized || DEFAULT_GUEST_NAME;
  } catch {
    // If decoding fails, return default
    return DEFAULT_GUEST_NAME;
  }
}

/**
 * Generate link undangan dengan nama tamu
 */
export function generateInvitationLink(
  guestName: string,
  baseUrl?: string,
): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || "";
  const encodedName = encodeURIComponent(guestName.trim());
  return `${base}/u/${encodedName}/`;
}

/**
 * Generate teks undangan untuk WhatsApp
 */
export function generateInvitationText(
  guestName: string,
  greeting: string,
  link: string,
): string {
  return `Assalamualaikum Warahmatullahi Wabarakatuh

Kepada Yth.
${greeting} ${guestName}

Dengan hormat, kami mengundang Bapak/Ibu/Saudara/i
untuk menghadiri acara pernikahan kami:

*Ahmad & Siti*

📅 Minggu, 15 Maret 2026

Link Undangan:
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami
apabila Bapak/Ibu/Saudara/i berkenan hadir.

Wassalamualaikum Warahmatullahi Wabarakatuh

_Mohon maaf apabila ada kesalahan penulisan nama/gelar_`;
}

/**
 * Daftar sapaan yang tersedia
 */
export const greetingOptions = [
  { value: "Bapak", label: "Bapak" },
  { value: "Ibu", label: "Ibu" },
  { value: "Bapak/Ibu", label: "Bapak/Ibu" },
  { value: "Sdr.", label: "Saudara (Sdr.)" },
  { value: "Sdri.", label: "Saudari (Sdri.)" },
  { value: "Keluarga", label: "Keluarga" },
] as const;

export type GreetingOption = (typeof greetingOptions)[number]["value"];
