# shrikrishna.dev — portfolio

Personal portfolio of **Shrikrishna P. Bhat** — a terminal / dev-brutalist site built from
scratch (no template). Warm amber-phosphor on near-black, self-hosted mono type (VT323 +
IBM Plex Mono), an interactive command line, and a `⌘K` command palette.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens in `src/app/globals.css`)
- **framer-motion** for restrained scroll reveals
- Fonts self-hosted via `@fontsource` (no runtime Google Fonts)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Content

All copy lives in typed modules under `src/content/` — edit these, not the components:

- `profile.ts` — name, role, tagline, bio
- `experience.ts` — work history
- `projects.ts` — `featured` + `learning`
- `stack.ts` — skills + education
- `socials.ts` — links, résumé, email

The résumé PDF is served from `public/Resume.pdf`.

## Interactive terminal

The hero accepts commands: `help`, `whoami`, `ls`, `ls projects`, `open <name>`,
`cat resume`, `socials`, `theme <amber|green|ice>`, `clear`. The command registry lives in
`src/lib/commands.ts`. `⌘K` / `Ctrl+K` opens the command palette.

## Contact form

`POST /api/contact` sends mail via **Resend** when configured, else returns `{ fallback: true }`
and the client opens the visitor's mail client. To enable server-side sending set:

```
RESEND_API_KEY=...
CONTACT_FROM="Portfolio <hi@yourdomain.com>"
```

## Deploy (Vercel)

Import the repo into Vercel — framework auto-detected. Add the two env vars above if you want
the contact form to send server-side. Everything else is zero-config.
