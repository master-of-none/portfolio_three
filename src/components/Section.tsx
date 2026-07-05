import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  index,
  title,
  subtitle,
  children,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-20 border-t border-rule px-5 py-16 sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-2xl leading-none text-accent">
              {index}
            </span>
            <div className="flex-1">
              <h2 className="text-lg font-medium tracking-tight text-fg sm:text-xl">
                <span className="text-accent">#</span> {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-sm text-dim">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="mt-2 h-px w-full bg-rule" />
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
