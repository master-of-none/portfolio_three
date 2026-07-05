import type { Project } from "@/content/projects";

const statusMeta: Record<Project["status"], { label: string; cls: string }> = {
  commercial: { label: "commercial", cls: "border-med text-med" },
  "open-source": { label: "open-source", cls: "border-ok text-ok" },
  "in-progress": { label: "in-progress", cls: "border-accent text-accent" },
  learning: { label: "learning", cls: "border-rule-bright text-dim" },
};

export function ProjectCard({ project }: { project: Project }) {
  const s = statusMeta[project.status];
  return (
    <article className="panel glow-hover group flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl leading-none text-fg">{project.name}</h3>
          <p className="mt-1.5 text-sm text-dim">{project.subtitle}</p>
        </div>
        <span className={`shrink-0 border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${s.cls}`}>
          {s.label}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-faint">
        <span className="text-accent">{project.role}</span>
        {project.org && (
          <>
            <span>·</span>
            <span>{project.org}</span>
          </>
        )}
        <span>·</span>
        <span>{project.year}</span>
      </div>

      <p className="mt-3 text-sm text-fg/90">{project.description}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-3 space-y-1">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-[13px] text-dim">
              <span className="mt-[0.15rem] shrink-0 text-accent">·</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-1 flex-wrap items-end gap-1.5">
        {project.stack.map((t) => (
          <span key={t} className="border border-rule px-1.5 py-0.5 text-[11px] text-dim">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 border-t border-rule pt-3 text-xs">
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            → {project.repo.replace("https://github.com/", "github.com/")}
          </a>
        ) : project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            → {project.link}
          </a>
        ) : (
          <span className="text-faint">closed-source · commercial product</span>
        )}
      </div>
    </article>
  );
}
