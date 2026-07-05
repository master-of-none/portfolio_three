import { experience } from "@/content/experience";
import { Reveal } from "./Reveal";

export function WorkLog() {
  return (
    <div className="space-y-10">
      {experience.map((job, i) => (
        <Reveal key={job.company} delay={i * 0.05}>
          <article className="relative border-l border-rule pl-6 sm:pl-8">
            {/* node */}
            <span
              className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 ${
                job.current ? "bg-accent" : "bg-rule-bright"
              }`}
              style={job.current ? { boxShadow: "0 0 8px var(--color-accent)" } : undefined}
              aria-hidden
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-medium text-fg">
                {job.role} <span className="text-dim">@</span>{" "}
                <span className="text-accent">{job.company}</span>
              </h3>
              <span className="text-xs text-dim">
                {job.period}
                {job.current && (
                  <span className="ml-2 border border-ok px-1 text-ok">active</span>
                )}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-faint">{job.location}</p>
            <p className="mt-2 text-sm text-dim">{job.summary}</p>

            <ul className="mt-3 space-y-1.5">
              {job.bullets.map((b, j) => (
                <li key={j} className="flex gap-2 text-sm text-fg/90">
                  <span className="mt-[0.15rem] shrink-0 text-accent">›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.stack.map((t) => (
                <span
                  key={t}
                  className="border border-rule px-1.5 py-0.5 text-[11px] text-dim"
                >
                  {t}
                </span>
              ))}
            </div>

            {job.link && (
              <a
                href={job.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs text-accent underline-offset-4 hover:underline"
              >
                → {job.link.label}
              </a>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
