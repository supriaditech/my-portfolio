# My Portfolio

Portfolio frontend developer modern yang dibangun dengan **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, dan **GSAP** untuk animasi profesional.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?logo=greensock)

---

## 🎬 Demo Animasi GSAP

| Section      | Teknik GSAP                                 | Efek                                                                                                                                |
| ------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Navbar**   | `gsap.from()` + `ScrollTrigger.create()`    | Slide-down entrance, background blur berubah saat scroll                                                                            |
| **Hero**     | `ScrollTrigger scrub` + `gsap.matchMedia()` | Parallax image, overlay gelap saat scroll, particles float, elastic text bounce, scroll indicator pulse, TextRepulsion mouse effect |
| **About**    | `ScrollTrigger` + `stagger`                 | Text fade-in staggered, image slide-in, stat counter pop-in dengan `back.out`                                                       |
| **Skills**   | `ScrollTrigger` progress bar + `stagger`    | Progress bar mengisi dari 0, tech tags pop-out dengan `back.out(2)`                                                                 |
| **Projects** | `ScrollTrigger` + `contextSafe` hover       | Kartu staggered reveal dengan rotasi, hover lift `y: -12` + `scale: 1.02`                                                           |
| **Contact**  | `ScrollTrigger` slide-in                    | Form & info panel slide dari kiri-kanan, submit feedback animasi                                                                    |
| **Footer**   | `ScrollTrigger` fade-in                     | Teks muncul dengan stagger halus                                                                                                    |

---

## 🛠 Tech Stack

| Kategori      | Teknologi                            |
| ------------- | ------------------------------------ |
| **Framework** | Next.js 16 (App Router + Turbopack)  |
| **Bahasa**    | TypeScript 5                         |
| **Styling**   | Tailwind CSS v4                      |
| **Animasi**   | GSAP 3 + ScrollTrigger + @gsap/react |
| **Font**      | Montserrat, Geist Sans, Geist Mono   |
| **Ikon**      | SVG Inline                           |
| **Deploy**    | Vercel (recommended)                 |

---

## 📁 Struktur Proyek

```
my-portfolio/
├── app/
│   ├── api/auth/              # API Routes (login, register, me)
│   ├── components/
│   │   ├── Atoms/
│   │   │   └── TextScatter.tsx # Komponen teks repulsion mouse (GSAP)
│   │   ├── Gsap/
│   │   │   └── GSAPInit.tsx   # Inisialisasi plugin GSAP global
│   │   ├── HomePages/
│   │   │   ├── HeroSection.tsx    # Hero + parallax + particles
│   │   │   ├── AboutSection.tsx   # About + stats
│   │   │   ├── SkillsSection.tsx  # Progress bar + tech grid
│   │   │   ├── ProjectsSection.tsx # Kartu proyek + hover animasi
│   │   │   └── ContactSection.tsx # Form kontak + info
│   │   └── Layout/
│   │       ├── Navbar.tsx     # Navigasi sticky + mobile menu
│   │       └── Footer.tsx     # Footer sosial media
│   ├── register/              # Halaman register
│   ├── globals.css            # Global styles + animasi CSS
│   ├── layout.tsx             # Root layout + metadata
│   └── page.tsx               # Halaman utama (semua section)
├── lib/                       # Utilitas (JWT, Zod schemas, user store)
├── public/Images/             # Aset gambar statis
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prasyarat

- **Node.js** v18+
- **npm** / **yarn** / **pnpm**

### Instalasi

```bash
# Clone repository
git clone <repo-url>
cd my-portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
npm run build
npm start
```

---

## 🎨 Kustomisasi

### Warna Tema

Ubah primary color di dua file:

**[tailwind.config.ts](tailwind.config.ts)**

```ts
colors: {
  primary: '#913B28', // Ganti dengan warna pilihanmu
}
```

**[app/globals.css](app/globals.css)**

```css
--color-primary: #913b28; /* Ganti dengan warna pilihanmu */
```

### Data Pribadi

| File                                                                | Yang Dikustomisasi                          |
| ------------------------------------------------------------------- | ------------------------------------------- |
| [HeroSection.tsx](app/components/HomePages/HeroSection.tsx)         | Nama, tagline, badge text                   |
| [AboutSection.tsx](app/components/HomePages/AboutSection.tsx)       | Foto, deskripsi diri, stats (tahun, proyek) |
| [SkillsSection.tsx](app/components/HomePages/SkillsSection.tsx)     | Daftar skill + level persentase, tech tags  |
| [ProjectsSection.tsx](app/components/HomePages/ProjectsSection.tsx) | Data proyek (judul, deskripsi, tags, warna) |
| [ContactSection.tsx](app/components/HomePages/ContactSection.tsx)   | Email, lokasi, link sosial media            |
| [Footer.tsx](app/components/Layout/Footer.tsx)                      | Link GitHub, LinkedIn, Twitter              |

### Gambar

Ganti `/public/Images/bgmain.png` dengan foto/gambar kamu sendiri.

---

## 🧩 Fitur Utama

- ✅ **TextRepulsion** — Teks "Frontend Developer" bereaksi terhadap gerakan mouse (efek tolak-menolak huruf)
- ✅ **Parallax Scrolling** — Gambar background bergerak lebih lambat saat scroll
- ✅ **Particles Animation** — Partikel floating di background hero
- ✅ **Progress Bar Animasi** — Skill bar mengisi otomatis saat masuk viewport
- ✅ **Staggered Reveal** — Elemen muncul satu per satu dengan timing
- ✅ **Hover Lift Effect** — Kartu proyek terangkat saat di-hover
- ✅ **Sticky Navbar** — Navigasi dengan indikator active section real-time
- ✅ **Mobile Menu** — Animasi slide-in untuk tampilan mobile
- ✅ **Smooth Scroll** — Navigasi antar section dengan scroll halus
- ✅ **Dark Theme** — Tema gelap penuh dengan aksen warna primary
- ✅ **Responsive** — Sepenuhnya responsif (mobile, tablet, desktop)
- ✅ **Custom Scrollbar** — Scrollbar kustom dengan warna tema
- ✅ **SEO Ready** — Metadata Open Graph & keywords
- ✅ **Auth System** — Register & login dengan JWT + bcrypt

---

## 📦 Scripts

| Command         | Deskripsi                                  |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Menjalankan development server (Turbopack) |
| `npm run build` | Build production                           |
| `npm start`     | Menjalankan production server              |
| `npm run lint`  | Menjalankan ESLint                         |

---

## 🚢 Deployment

Deploy ke **Vercel** dengan satu klik:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Atau deploy manual:

```bash
npm run build
# Upload folder .next ke server Node.js / Vercel
```

---

## 📝 Lisensi

Proyek pribadi — bebas digunakan sebagai referensi atau template portfolio.
