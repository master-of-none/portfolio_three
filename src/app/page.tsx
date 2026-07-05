import { TerminalHero } from "@/components/TerminalHero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { WorkLog } from "@/components/WorkLog";
import { ProjectCard } from "@/components/ProjectCard";
import { StackTable } from "@/components/StackTable";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { profile } from "@/content/profile";
import { featured, learning } from "@/content/projects";
import { socials } from "@/content/socials";

export default function Home() {
  return (
    <>
      <TerminalHero />

      {/* 01 · About */}
      <Section id="about" index="01" title="about" subtitle="cat ~/about.md">
        <div className="max-w-3xl space-y-4">
          {profile.bio.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-[15px] leading-relaxed text-fg/90">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <p className="pt-2 text-sm text-dim">
              <span className="text-accent">status:</span> {profile.availability}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 02 · Work */}
      <Section id="work" index="02" title="work" subtitle="git log --author='shrikrishna'">
        <WorkLog />
      </Section>

      {/* 03 · Projects */}
      <Section id="projects" index="03" title="projects" subtitle="ls -la ~/projects">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mb-3 mt-12 text-sm text-dim">
            <span className="text-accent">›</span> also always learning
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {learning.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="panel block h-full p-4 transition-colors hover:border-accent"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-fg">{p.name}</span>
                  <span className="text-xs text-faint">↗</span>
                </div>
                <p className="mt-1 text-xs text-dim">{p.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.stack.map((t) => (
                    <span key={t} className="border border-rule px-1.5 py-0.5 text-[10px] text-dim">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 04 · Stack */}
      <Section id="stack" index="04" title="stack" subtitle="which everything">
        <StackTable />
      </Section>

      {/* 05 · Contact */}
      <Section id="contact" index="05" title="contact" subtitle="./say-hello.sh">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <Reveal>
              <p className="max-w-md text-[15px] leading-relaxed text-fg/90">
                Building something at the intersection of systems, web, and reliability?
                I&apos;d like to hear about it.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <CopyEmail email={profile.email} />
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-2 pt-2">
                {socials
                  .filter((s) => s.label !== "Email")
                  .map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-sm"
                      >
                        <span className="w-16 text-dim">{s.label.toLowerCase()}</span>
                        <span className="text-fg/90 transition-colors group-hover:text-accent">
                          {s.handle}
                        </span>
                        <span className="text-faint transition-colors group-hover:text-accent">↗</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <footer className="border-t border-rule px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 text-xs text-faint sm:flex-row sm:items-center">
          <span>
            <span className="text-accent">$</span> built from scratch · next.js · no templates
          </span>
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </div>
      </footer>
    </>
  );
}
