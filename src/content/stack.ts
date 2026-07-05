export type StackGroup = {
  label: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    label: "Languages",
    items: [
      "TypeScript",
      "Rust",
      "Python",
      "Go",
      "C/C++",
      "OCaml",
      "Java",
      "SAP ABAP",
      "SQL",
    ],
  },
  {
    label: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Vue",
      "Node.js",
      "Tauri",
      "Electron",
      "Flask",
      "PyTorch",
      "TensorFlow",
      "gRPC",
      "GraphQL",
    ],
  },
  {
    label: "Infra & Tools",
    items: [
      "Docker",
      "Kubernetes",
      "GKE",
      "AWS",
      "GCP",
      "PostgreSQL",
      "SQLite",
      "nginx",
      "self-hosted VPS",
      "GitHub Actions",
      "Jenkins",
      "Linux",
    ],
  },
];

export const education = [
  {
    school: "Portland State University",
    detail: "M.S. Computer Science · GPA 3.89/4",
    period: "2022 — 2024",
    place: "Portland, OR",
  },
  {
    school: "SDM College of Engineering & Technology",
    detail: "B.E. Computer Science · GPA 8.79/10",
    period: "2015 — 2019",
    place: "Dharwad, IN",
  },
];
