export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  stack: string[];
  link?: { label: string; href: string };
};

export const experience: Experience[] = [
  {
    company: "LearnEx Digital",
    role: "Application Developer",
    period: "Oct 2025 — Present",
    location: "Bangalore, IN",
    current: true,
    summary:
      "Building LearnEx's commercial FMEA desktop suite and the company's e-learning website.",
    bullets: [
      "Lead developer on Zero Defect Pro (PFMEA Suite) — a commercial Process-FMEA desktop app implementing the AIAG-VDA 7-step methodology.",
      "Contributor on the Kavach DFMEA suite (Design-FMEA companion) built on a Rust/Tauri stack.",
      "Building the LearnEx e-learning website in Next.js + React — improved page responsiveness ~35% and cut bounce ~18% through SEO-focused, accessible UI.",
    ],
    stack: ["TypeScript", "React", "Electron", "Tauri", "Rust", "SQLite", "Next.js"],
  },
  {
    company: "AudioBVI · Audemy",
    role: "Lead Web Developer",
    period: "Sep 2024 — Sep 2025",
    location: "Virginia, US · Remote",
    summary:
      "Led the platform for an accessible, AI-driven education product for blind and low-vision learners.",
    bullets: [
      "Designed an event-driven, serverless backend with JWT auth and Prisma ORM on PostgreSQL.",
      "Built modular RESTful API layers (Node.js + Vue) in a microservices architecture serving 100K+ daily requests.",
      "Embedded real-time voice via Google Cloud Speech-to-Text and OpenAI GPT for adaptive learning; optimized Whisper for edge inference with ONNX/OpenVINO.",
      "Ran fault-tolerant autoscaling for 5K+ concurrent users on GKE; blue-green CI/CD via GitHub Actions across AWS and GCP.",
    ],
    stack: ["Node.js", "Vue", "PostgreSQL", "Prisma", "GKE", "Docker", "OpenAI"],
    link: { label: "audemy.org", href: "https://audemy.org/" },
  },
  {
    company: "Accenture",
    role: "Application Development Analyst",
    period: "Jun 2019 — Jun 2021",
    location: "Bangalore, IN",
    summary:
      "SAP integration and support for enterprise clients, including Australian government and telecom.",
    bullets: [
      "Led a 4-person team automating SAP IDoc job scheduling and monitoring, improving delivery and invoicing efficiency.",
      "Resolved 500+ ServiceNow tickets under SLA; recognized by multiple clients for timely delivery.",
      "Engineered a custom SAP BAPI for high-volume SHPMNT IDocs in Material Management on S/4HANA.",
      "Delivered NBN (National Broadband Network, Australia) network integration and SAP ABAP invoicing for the Dept. of Justice, Australia.",
    ],
    stack: ["SAP ABAP", "S/4HANA", "ServiceNow", "JIRA", "TDD"],
  },
];
