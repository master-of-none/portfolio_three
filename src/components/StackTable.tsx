import { stack, education } from "@/content/stack";
import { Reveal } from "./Reveal";

export function StackTable() {
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {stack.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-2 border-b border-rule pb-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <div className="text-sm text-dim">
                <span className="text-accent">›</span> {group.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border border-rule px-2 py-0.5 text-[13px] text-fg/90 transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div>
          <p className="mb-3 text-sm text-dim">
            <span className="text-accent">›</span> Education
          </p>
          <div className="space-y-3">
            {education.map((e) => (
              <div
                key={e.school}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <span className="text-sm text-fg">{e.school}</span>
                  <span className="ml-2 text-xs text-dim">{e.detail}</span>
                </div>
                <span className="text-xs text-faint">
                  {e.period} · {e.place}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
