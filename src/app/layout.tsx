import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/vt323/400.css";
import "./globals.css";
import { TopBar } from "@/components/TopBar";
import { CommandPalette } from "@/components/CommandPalette";
import { profile } from "@/content/profile";

const url = "https://shrikrishna.dev";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  keywords: [
    "Shrikrishna Bhat",
    "software engineer",
    "systems engineer",
    "Rust",
    "TypeScript",
    "FMEA",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    url,
    siteName: `${profile.name} · portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  width: "device-width",
  initialScale: 1,
};

// set phosphor before paint to avoid a flash
const themeScript = `try{var p=localStorage.getItem('phosphor');if(p)document.documentElement.setAttribute('data-phosphor',p);}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-phosphor="amber" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative">
        <div className="relative z-10">
          <TopBar />
          <CommandPalette />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
