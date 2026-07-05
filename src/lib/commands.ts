import { profile } from "@/content/profile";
import { featured, learning } from "@/content/projects";
import { socials } from "@/content/socials";

export type Tone = "fg" | "dim" | "accent" | "high" | "ok";
export type Line = { text: string; tone?: Tone };

export type CommandContext = {
  navigate: (id: string) => void;
  setTheme: (t: string) => void;
  clear: () => void;
  open: (url: string) => void;
};

export type CommandResult = { lines: Line[] };

const l = (text: string, tone?: Tone): Line => ({ text, tone });

const COMMANDS = [
  ["help", "list available commands"],
  ["whoami", "who is this"],
  ["ls", "list sections / projects"],
  ["open <name>", "jump to a section or project"],
  ["cat resume", "download my résumé"],
  ["socials", "where to find me"],
  ["theme <amber|green|ice>", "switch phosphor color"],
  ["clear", "clear the screen"],
] as const;

const allProjects = [...featured, ...learning];
const sections = ["about", "work", "projects", "stack", "contact"];

export function runCommand(raw: string, ctx: CommandContext): CommandResult {
  const input = raw.trim();
  if (!input) return { lines: [] };
  const echo = l(`${profile.shell}:~$ ${input}`, "dim");
  const [cmd, ...rest] = input.split(/\s+/);
  const arg = rest.join(" ").toLowerCase();
  const out = (lines: Line[]): CommandResult => ({ lines: [echo, ...lines] });

  switch (cmd.toLowerCase()) {
    case "help":
      return out([
        l("available commands:", "accent"),
        ...COMMANDS.map(([c, d]) => l(`  ${c.padEnd(26)} ${d}`)),
        l("tip: try `ls`, `open pfmea`, or `theme green`.", "dim"),
      ]);

    case "whoami":
      return out([
        l(`${profile.name}`, "accent"),
        l(profile.role),
        l(profile.location, "dim"),
        l(profile.tagline),
      ]);

    case "ls": {
      if (arg === "" || arg === "sections") {
        return out([
          l("sections/", "accent"),
          ...sections.map((s) => l(`  ${s}`)),
          l("try `ls projects`", "dim"),
        ]);
      }
      if (arg.startsWith("project") || arg === "work") {
        return out([
          l("projects/", "accent"),
          ...allProjects.map((p) =>
            l(`  ${p.slug.padEnd(18)} ${p.name}`),
          ),
        ]);
      }
      return out([l(`ls: cannot access '${arg}': no such directory`, "high")]);
    }

    case "open": {
      if (!arg) return out([l("usage: open <section|project>", "high")]);
      if (sections.includes(arg)) {
        ctx.navigate(arg);
        return out([l(`→ ${arg}`, "ok")]);
      }
      const proj = allProjects.find((p) => p.slug === arg || p.name.toLowerCase() === arg);
      if (proj) {
        if (proj.repo) {
          ctx.open(proj.repo);
          return out([l(`→ opening ${proj.repo}`, "ok")]);
        }
        ctx.navigate("projects");
        return out([l(`→ ${proj.name} (closed-source) — see projects`, "ok")]);
      }
      return out([l(`open: '${arg}' not found. try \`ls\`.`, "high")]);
    }

    case "cat": {
      if (arg === "resume" || arg === "resume.pdf" || arg === "cv") {
        ctx.open("/Resume.pdf");
        return out([l("→ downloading Resume.pdf", "ok")]);
      }
      return out([l(`cat: ${arg || "?"}: no such file`, "high")]);
    }

    case "resume":
    case "cv":
      ctx.open("/Resume.pdf");
      return out([l("→ downloading Resume.pdf", "ok")]);

    case "socials":
    case "links":
      return out(socials.map((s) => l(`  ${s.label.padEnd(10)} ${s.handle}`)));

    case "theme": {
      const t = arg || "amber";
      if (!["amber", "green", "ice"].includes(t))
        return out([l(`theme: unknown '${t}'. options: amber, green, ice`, "high")]);
      ctx.setTheme(t);
      return out([l(`→ phosphor set to ${t}`, "ok")]);
    }

    case "clear":
    case "cls":
      ctx.clear();
      return { lines: [] };

    case "sudo":
      return out([l("nice try.", "high")]);

    case "about":
    case "work":
    case "projects":
    case "stack":
    case "contact":
      ctx.navigate(cmd.toLowerCase());
      return out([l(`→ ${cmd.toLowerCase()}`, "ok")]);

    default:
      return out([
        l(`command not found: ${cmd}`, "high"),
        l("type `help` for a list.", "dim"),
      ]);
  }
}

export const bootLines: Line[] = [
  l("booting shrikrishna.dev …", "dim"),
  l("loading modules: [systems] [web] [ml] [infra]  ok", "ok"),
  l("mounting /work /projects /stack  ok", "ok"),
  l("", "dim"),
];
