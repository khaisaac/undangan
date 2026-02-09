// Data Pernikahan - Sesuaikan dengan kebutuhan Anda
export interface WeddingEvent {
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
}

export interface CoupleInfo {
  name: string;
  fullName: string;
  parentInfo: string;
  instagram?: string;
  photo: string;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
  logo: string;
}

export interface InvitationData {
  // Informasi Pengantin
  groom: CoupleInfo;
  bride: CoupleInfo;

  // Tanggal & Waktu
  weddingDate: string; // Format: "2026-03-15"
  displayDate: string; // Format tampilan: "Minggu, 15 Maret 2026"
  shortDate: string; // Format pendek: "15 Maret 2026"

  // Acara
  events: {
    akad: WeddingEvent;
    resepsi: WeddingEvent;
  };

  // Quote
  quote: {
    text: string;
    source: string;
  };

  // Timeline
  timeline: {
    time: string;
    title: string;
    description: string;
  }[];

  // Gallery
  gallery: string[];

  // Images
  images: {
    cover: string;
    hero: string;
    groomPhoto: string;
    bridePhoto: string;
  };

  // Wedding Gifts / Bank Accounts
  bankAccounts: BankAccount[];

  // Pesan Penutup
  closingMessage: string;
}

export const invitationData: InvitationData = {
  groom: {
    name: "Enjjel",
    fullName: "Enjjel Nurhaliza, S.ST",
    parentInfo: "Putra dari Bapak H. Sulaiman & Ibu Hj. Fatimah",
    instagram: "@enjjelnurhaliza",
    photo: "/images/bride.jpg",
  },
  bride: {
    name: "Tazki",
    fullName: "Tazki Maulana, S.ST",
    parentInfo: "Putri dari Bapak H. Abdullah & Ibu Hj. Aisyah",
    instagram: "@tazkimaulana",
    photo: "/images/groom.jpg",
  },

  weddingDate: "2026-03-15",
  displayDate: "Minggu, 15 Maret 2026",
  shortDate: "15 Maret 2026",

  events: {
    akad: {
      name: "Akad Nikah",
      date: "Minggu, 15 Maret 2026",
      time: "08:00 - 10:00 WIB",
      venue: "Masjid Al-Ikhlas",
      address:
        "Jl. Mawar No. 123, Kelurahan Sukamaju, Kecamatan Cilacap Tengah",
      mapsUrl: "https://maps.google.com/?q=-7.7956,110.3695",
    },
    resepsi: {
      name: "Resepsi",
      date: "Minggu, 15 Maret 2026",
      time: "11:00 - 14:00 WIB",
      venue: "Gedung Serbaguna Permata",
      address:
        "Jl. Melati No. 456, Kelurahan Sukamaju, Kecamatan Cilacap Tengah",
      mapsUrl: "https://maps.google.com/?q=-7.7956,110.3695",
    },
  },

  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },

  timeline: [
    {
      time: "08:00",
      title: "Akad Nikah",
      description: "Prosesi akad nikah yang sakral",
    },
    {
      time: "10:00",
      title: "Sesi Foto",
      description: "Dokumentasi bersama keluarga",
    },
    {
      time: "11:00",
      title: "Resepsi Dimulai",
      description: "Penyambutan tamu undangan",
    },
    {
      time: "12:00",
      title: "Jamuan Makan",
      description: "Menikmati hidangan bersama",
    },
    {
      time: "14:00",
      title: "Acara Selesai",
      description: "Penutupan dan foto bersama",
    },
  ],

  gallery: [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
    "/images/gallery-6.jpg",
  ],

  images: {
    cover: "/images/cover.jpg",
    hero: "/images/hero.jpg",
    groomPhoto: "/images/bride.jpg",
    bridePhoto: "/images/groom.jpg",
  },

  bankAccounts: [
    {
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "Tazki Maulana",
      logo: "bri",
    },
    {
      bank: "Mandiri",
      accountNumber: "0987654321",
      accountName: "Enjjel Nurhaliza",
      logo: "mandiri",
    },
  ],

  closingMessage:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.",
};

// Helper untuk menghitung countdown
export function getCountdown(targetDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
