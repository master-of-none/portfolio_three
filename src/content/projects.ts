export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  role: string;
  status: "commercial" | "open-source" | "in-progress" | "learning";
  org?: string;
  year: string;
  description: string;
  highlights: string[];
  stack: string[];
  repo?: string;
  link?: string;
  closed?: boolean; // closed-source: no repo link
};

/** Headline work — boxed cards. */
export const featured: Project[] = [
  {
    slug: "pfmea",
    name: "Zero Defect Pro",
    subtitle: "PFMEA Suite — Process Failure Mode & Effects Analysis",
    role: "Author · Lead Developer",
    status: "commercial",
    org: "LearnEx Digital",
    year: "2026",
    closed: true,
    description:
      "A commercial desktop application that walks manufacturing quality engineers through the full AIAG-VDA 7-step Process-FMEA lifecycle — structure, function, failure, risk, optimization, and documentation — scoped per production line.",
    highlights: [
      "Local-first Electron app over a 42-table SQLite schema (better-sqlite3)",
      "Excel Control Plan export built to the AIAG template with pixel-faithful borders",
      "On-device RAG assist (Ollama nomic-embed-text + OpenRouter) with a full AI-governance audit log",
      "Role-based auth with per-step approval workflow; Fishbone, P-Diagram, 8D, PPTX/PDF export",
      "Commercial licensing via Keygen.sh with machine-ID hardware locking",
    ],
    stack: ["Electron", "React", "TypeScript", "SQLite", "Zustand", "Vite"],
  },
  {
    slug: "dfmea",
    name: "Kavach",
    subtitle: "DFMEA Suite — Design Failure Mode & Effects Analysis",
    role: "Contributor",
    status: "commercial",
    org: "LearnEx × RightBrain India",
    year: "2026",
    closed: true,
    description:
      "The design-side companion to Zero Defect Pro: an AIAG-VDA 7-step Design-FMEA tool with a Rust/Tauri core. Contributor work on a fork of RightBrain India's Design-FMEA product.",
    highlights: [
      "Tauri 2 desktop app — Rust backend (102 tauri commands) over bundled SQLite (rusqlite)",
      "Product Structure Tree with a deterministic item-coding algorithm; boundary / interface / design matrices",
      "DVPR (Design Verification Plan & Report) with a tester workflow and plan-vs-actual Gantt",
      "Approval-gated change-request governance; HMAC hardware-fingerprint licensing",
    ],
    stack: ["Tauri", "Rust", "React", "TypeScript", "SQLite"],
  },
  {
    slug: "scheduler",
    name: "Schedule Enforcer",
    subtitle: "Cross-OS schedule enforcement with self-hosted sync",
    role: "Author",
    status: "open-source",
    year: "2026",
    description:
      "An offline-first desktop app that enforces a daily schedule, keeps structured problem logs and journals, and syncs to my own VPS. My hands-on SRE playground.",
    highlights: [
      "Electron + React 19 desktop client with an Express + PostgreSQL sync API",
      "Offline-first: mutations are queued locally and replayed on the next successful sync",
      "JWT auth, shared TypeScript domain package, Docker Compose deploy",
      "Self-hosted on my VPS — the box I keep alive",
    ],
    stack: ["Electron", "React", "Express", "PostgreSQL", "Docker", "VPS"],
    repo: "https://github.com/master-of-none/scheduler",
  },
  {
    slug: "learnex-web",
    name: "LearnEx Website",
    subtitle: "E-learning platform — in progress",
    role: "Developer",
    status: "in-progress",
    org: "LearnEx Digital",
    year: "2026",
    description:
      "The company's e-learning and product website, being built in Next.js + React with a focus on performance, SEO, and accessibility.",
    highlights: [
      "Next.js + React, server-rendered for SEO",
      "SEO-focused, accessible UI — ~35% faster page responsiveness, ~18% lower bounce",
      "Currently under active development",
    ],
    stack: ["Next.js", "React", "TypeScript"],
  },
  {
    slug: "embedded-rust",
    name: "Embedded Rust",
    subtitle: "Bare-metal firmware for ESP32-C6 & BBC micro:bit",
    role: "Author",
    status: "open-source",
    year: "2026",
    description:
      "Bare-metal firmware for RISC-V (ESP32-C6) and ARM Cortex-M4 (micro:bit) microcontrollers using the embassy-rs async executor and no_std embedded HAL.",
    highlights: [
      "no_std async/await with embassy-rs and zero-cost abstractions",
      "I2C peripheral drivers and GPIO interrupt handling",
      "Type-safe memory management on constrained hardware",
    ],
    stack: ["Rust", "embassy-rs", "no_std", "RISC-V", "ARM"],
    repo: "https://github.com/master-of-none/rust",
  },
  {
    slug: "go-blogger",
    name: "Blogger in Go",
    subtitle: "Scalable RESTful blogging platform",
    role: "Author",
    status: "open-source",
    year: "2024",
    description:
      "A high-performance blogging platform in Go with RESTful services, load balancing, and caching, deployed in containers.",
    highlights: [
      "RESTful web services with load balancing and caching",
      "Containerized deployment with Docker and Kubernetes",
    ],
    stack: ["Go", "REST", "Docker", "Kubernetes"],
    repo: "https://github.com/master-of-none/rest-auth",
  },
];

/** Secondary — the "always learning" strip. */
export const learning: Project[] = [
  {
    slug: "ocamlino",
    name: "ocamlino",
    subtitle: "OCaml data structures & DSA playground",
    role: "Author",
    status: "learning",
    year: "2025",
    description:
      "Persistent data structures, bit vectors, and functional patterns in OCaml, with a Docker + Jenkins + GitHub Actions CI pipeline.",
    highlights: [],
    stack: ["OCaml", "dune", "Jenkins", "Docker"],
    repo: "https://github.com/master-of-none/ocamlino",
  },
  {
    slug: "machine-learning",
    name: "machine-learning",
    subtitle: "Hands-on ML journey",
    role: "Author",
    status: "learning",
    year: "2025",
    description:
      "Working through Géron and Dive-into-Deep-Learning — classification, training models, and neural nets in PyTorch & TensorFlow.",
    highlights: [],
    stack: ["Python", "PyTorch", "TensorFlow", "scikit-learn"],
    repo: "https://github.com/master-of-none/machine-learning",
  },
  {
    slug: "cuda",
    name: "cuda",
    subtitle: "GPU kernels from scratch",
    role: "Author",
    status: "learning",
    year: "2025",
    description:
      "Learning CUDA C/C++ — grid-stride kernels, host/device memory, and vector math on the GPU.",
    highlights: [],
    stack: ["CUDA", "C/C++"],
    repo: "https://github.com/master-of-none/cuda",
  },
];
