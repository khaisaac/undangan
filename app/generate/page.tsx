import GuestLinkGenerator from "@/components/GuestLinkGenerator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Link Undangan",
  description: "Buat link undangan personal untuk setiap tamu",
  robots: "noindex, nofollow", // Don't index this page
};

export default function GeneratePage() {
  return <GuestLinkGenerator />;
}
