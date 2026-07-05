export const profile = {
  name: "Shrikrishna P. Bhat",
  handle: "master-of-none",
  shell: "shrikrishna@no_std",
  role: "Systems & Application Engineer",
  location: "Bangalore, India",
  email: "shrikrishna.bht@outlook.com",
  tagline:
    "I build systems that hold up under load — from AIAG-VDA FMEA software to self-hosted infra.",
  // Short first-person bio for the About section.
  bio: [
    "Application Developer at LearnEx Digital, where I build the commercial FMEA desktop software that quality engineers use to ship parts with fewer defects — Process FMEA today, Design FMEA alongside it.",
    "MS in Computer Science from Portland State University (GPA 3.89). Before that, two years at Accenture doing large-scale SAP integration work across Australian government and telecom clients.",
    "I like problems that touch the metal: bare-metal Rust on microcontrollers, CUDA kernels, OCaml data structures, and keeping my own VPS alive. Most of my week is TypeScript and Rust; my weekends are usually a compiler or a GPU.",
  ],
  availability: "Open to systems / full-stack roles",
} as const;

export type Profile = typeof profile;
