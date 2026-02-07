# Undangan Digital Pernikahan

Undangan digital pernikahan modern dengan Next.js App Router, Framer Motion, dan TailwindCSS.

## ✨ Fitur

- 🎨 Desain elegan modern dengan animasi halus
- 📱 Mobile-first & responsive
- 🔗 Personalisasi nama tamu via URL
- 📝 Auto-generate teks undangan untuk WhatsApp
- 💾 RSVP dengan localStorage
- ⏱️ Countdown timer
- 🖼️ Galeri foto dengan lightbox
- 🗺️ Integrasi Google Maps
- 📅 Tombol simpan ke kalender
- 🎭 Support prefers-reduced-motion
- 🚀 Static export (SSG) - tanpa backend

## 🛠️ Teknologi

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion (LazyMotion)

## 📁 Struktur Folder

```
/app
  /page.tsx              # Halaman utama
  /u/[guest]/page.tsx    # Halaman dengan nama tamu
  /generate/page.tsx     # Generator link undangan
  /layout.tsx            # Root layout
  /globals.css           # Global styles

/components
  /Cover.tsx             # Halaman cover
  /InvitationContent.tsx # Konten undangan
  /InvitationWrapper.tsx # Wrapper dengan state
  /GuestLinkGenerator.tsx# Generator link
  /sections/
    /HeroSection.tsx
    /QuoteSection.tsx
    /CoupleSection.tsx
    /CountdownSection.tsx
    /EventSection.tsx
    /TimelineSection.tsx
    /GallerySection.tsx
    /RSVPSection.tsx
    /FooterSection.tsx

/data
  /invitation.ts         # Data pernikahan

/lib
  /guest.ts              # Utility nama tamu
  /utils.ts              # Helper functions

/public
  /images/               # Gambar undangan
  /icons/                # Icon SVG
```

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 3. Build untuk Production

```bash
npm run build
```

Output static akan ada di folder `out/`

## 📝 Cara Custom

### Mengubah Data Pernikahan

Edit file `data/invitation.ts`:

```typescript
export const invitationData: InvitationData = {
  groom: {
    name: "Ahmad",
    fullName: "Ahmad Rizki Maulana, S.Kom",
    // ...
  },
  bride: {
    name: "Siti",
    fullName: "Siti Nurhaliza, S.Pd",
    // ...
  },
  weddingDate: "2026-03-15",
  // ...
};
```

### Mengganti Gambar

Ganti file di folder `/public/images/`:

- `cover.jpg` - Background cover
- `hero.jpg` - Background hero section
- `groom.jpg` - Foto pengantin pria
- `bride.jpg` - Foto pengantin wanita
- `gallery-1.jpg` s/d `gallery-6.jpg` - Foto galeri
- `og-image.jpg` - Gambar untuk social media preview

**Tips optimasi gambar:**

- Ukuran maksimal 300-500KB per gambar
- Format: JPG/WebP untuk foto, SVG untuk icon
- Resolusi: 1200x800 untuk cover/hero, 400x400 untuk profil

## 🔗 Cara Personalisasi Nama Tamu

### Via Query Parameter

```
https://undangan-kamu.com/?to=Rizki%20Maulana
```

### Via Route Segment

```
https://undangan-kamu.com/u/Rizki%20Maulana
```

## 📱 Cara Generate Link untuk WhatsApp

1. Buka halaman `/generate`
2. Masukkan nama tamu
3. Pilih sapaan (Bapak/Ibu/Sdr/dll)
4. Klik "Salin Teks + Link"
5. Paste ke WhatsApp

## 🌐 Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/undangan.git
git push -u origin main
```

### 2. Import di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik "New Project"
3. Import repository dari GitHub
4. Vercel akan otomatis detect Next.js
5. Klik "Deploy"

### 3. Set Environment Variable (Opsional)

Di Vercel dashboard, tambahkan:

```
NEXT_PUBLIC_BASE_URL=https://domain-undangan-kamu.vercel.app
```

## 📦 Static Export

Untuk hosting di hosting static (Netlify, GitHub Pages, dll):

```bash
npm run build
```

Upload folder `out/` ke hosting.

## 🎨 Kustomisasi Warna

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Warna ungu tema
  },
  gold: {
    // Warna emas aksen
  },
  cream: {
    // Warna background
  },
}
```

## 📜 Lisensi

MIT License - Bebas digunakan untuk keperluan pribadi.

---

Made with ❤️ for your special day
