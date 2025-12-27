# 🖌️ Inktober Archive

![banner](/public/bannerbig.webp)

🔗 **Check it out!** [https://ba-ink.victim-crasher.com](https://ba-ink.victim-crasher.com)

A modern, responsive personal portfolio website showcasing my Inktober artwork with a Blue Archive theme. Built with **Next.js**, **TypeScript**, and **Material UI**, featuring a dynamic, JSON-driven entry list and fully responsive layout optimized for all devices.

## 📖 About

**Inktober Archive** is a personal project that documents my journey through Inktober challenges, specifically themed around the game Blue Archive. Starting in 2024, I decided to add a consistent theme to my Inktober drawings, and what better theme than the diverse and beloved characters from Blue Archive?

The name is a playful pun combining "Inktober" and "Blue Archive", creating a digital archive of 62 days of drawings featuring 100+ characters from the game.

## ✨ Features

- **Gallery View**: Browse all Inktober entries in a responsive grid layout
- **Search & Filter**: Search by character name, title, or school, and filter by year
- **Individual Entry Pages**: Detailed view for each artwork with descriptions, notes, and social media links
- **School & Club Organization**: Entries organized by schools (Abydos, Trinity, Gehenna, Millennium, etc.) and clubs
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Static Export**: Pre-rendered static site for fast loading and easy deployment
- **Social Media Integration**: Links to Pixiv, Twitter, and BlueSky for each entry

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.1.1
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material UI (MUI)](https://mui.com/) 7.3.6
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Date Handling**: [Moment.js](https://momentjs.com/)
- **Build**: Static export for deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or use your preferred Node.js version manager)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bainktober
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production static site
- `npm run start` - Start the production server (for testing the build locally)
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
bainktober/
├── app/                    # Next.js app directory
│   ├── [year]/[day]/      # Dynamic routes for individual entries
│   ├── about/              # About page
│   ├── artist/             # Artist/contact page
│   ├── components/         # App-specific components
│   └── page.tsx            # Home page
├── lib/                    # Library code
│   ├── entries.ts         # Entry data and utilities
│   ├── header.ts          # Header configuration
│   └── types.ts           # TypeScript type definitions
├── src/                    # Source code
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   ├── theme.ts           # MUI theme configuration
│   └── utils.ts           # Utility functions
├── public/                 # Static assets
│   ├── entries/           # Artwork images
│   └── school-logos/      # School logo images
└── out/                    # Static export output (generated)
```

## 🎨 Adding New Entries

Entries are defined in `lib/entries.ts`. Each entry follows this structure:

```typescript
{
  date: "YYYY-MM-DD",
  title: "Entry Title",
  description: ["Description line 1", "Description line 2"],
  note: ["Note 1", "Note 2"],
  school: "School Name" | undefined,
  characters: [
    {
      name: "Character Name",
      club: "Club Name" | undefined
    }
  ],
  isLandscape: boolean,
  image: "/entries/YYYY-MM-DD.webp",
  pixiv?: "Pixiv URL",
  twitter?: "Twitter URL",
  blueSky?: "BlueSky URL"
}
```

## 🚢 Deployment

This project is configured for static export, making it easy to deploy to any static hosting service:

1. Build the static site:
```bash
npm run build
```

2. The `out/` directory contains the static files ready for deployment.

### Recommended Hosting Platforms

- **Vercel** (recommended for Next.js projects)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**
- Any static file hosting service

## 📝 License

This project is private and personal. All artwork is original work by the artist.

## 🔗 Links

- **Website**: [ba-ink.victim-crasher.com](https://ba-ink.victim-crasher.com)
- **Artist Website**: [victim-crasher.com](https://victim-crasher.com)
- **Twitter**: [@Victim_Crasher](https://x.com/Victim_Crasher)
- **BlueSky**: [@victim-crasher.com](https://bsky.app/profile/victim-crasher.com)
- **Pixiv**: [User Profile](https://www.pixiv.net/en/users/22160611)

## 🙏 Acknowledgments

- Blue Archive by Yostar Games / Nexon Games
- All the amazing characters and stories that inspired these drawings
- The Inktober community for the annual challenge

---

Made with ❤️ by [Victim Crasher](https://victim-crasher.com)
