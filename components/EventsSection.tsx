"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { experiences, upcomingEvents } from "@/data/events";
import { site, whatsappLink } from "@/data/site";
import { MaskedLines, Reveal, SectionLabel, WhatsAppIcon } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return { day: "", month: "", weekday: "" };
  return {
    day: date.toLocaleDateString("pt-BR", { day: "2-digit" }),
    month: date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
    weekday: date.toLocaleDateString("pt-BR", { weekday: "long" }),
  };
}

export default function EventsSection() {
  const eventCta = whatsappLink(site.contact.whatsappEventMessage);
  const ctaHref = eventCta ?? site.links.instagram;
  const today = new Date().toISOString().slice(0, 10);
  const events = upcomingEvents.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section id="eventos" aria-labelledby="events-title" className="bg-char py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionLabel index="05">Eventos e experiências</SectionLabel>
        <h2 id="events-title" className="display mt-6 max-w-5xl text-[clamp(2.6rem,8vw,7.5rem)]">
          <MaskedLines lines={["Os próximos", "encontros", <span key="a" className="text-sky">acontecem aqui.</span>]} />
        </h2>

        {events.length > 0 && (
          <ul className="mt-16 divide-y divide-paper/10 border-y border-paper/10">
            {events.map((event, i) => {
              const d = formatDate(event.date);
              return (
                <Reveal as="li" key={event.id} delay={i * 0.06} className="grid gap-6 py-8 md:grid-cols-12 md:items-center">
                  <p className="flex items-baseline gap-3 md:col-span-2">
                    <span className="display text-6xl text-cyan">{d.day}</span>
                    <span className="eyebrow text-pink">{d.month}</span>
                  </p>
                  <div className="md:col-span-6">
                    <p className="eyebrow flex items-center gap-2 text-mute">
                      <CalendarDays className="size-4" aria-hidden />
                      {d.weekday}
                      {event.time ? ` · ${event.time}` : ""}
                    </p>
                    <h3 className="display mt-2 text-4xl">{event.title}</h3>
                    <p className="mt-2 max-w-lg text-paper/65">{event.description}</p>
                  </div>
                  {event.image && (
                    <div className="relative aspect-[16/10] overflow-hidden md:col-span-2">
                      <Image src={event.image.src} alt={event.image.alt} fill sizes="(min-width: 768px) 16vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <a
                    href={event.ctaHref ?? ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-ghost md:col-span-2 ${event.image ? "" : "md:col-start-11"}`}
                  >
                    {event.ctaLabel ?? "Mais informações"}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </Reveal>
              );
            })}
          </ul>
        )}

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              className={`group relative overflow-hidden bg-ink ${i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24"}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: i * 0.12, ease }}
            >
              {exp.image && (
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3]" : "aspect-[4/3] md:aspect-[4/5]"}`}>
                  <Image
                    src={exp.image.src}
                    alt={exp.image.alt}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/20 to-transparent md:block" />
                </div>
              )}
              <div className="relative p-6 md:absolute md:inset-x-0 md:bottom-0 md:p-8">
                <p className="eyebrow text-pink">{exp.kicker}</p>
                <h3 className="display mt-3 text-5xl md:text-6xl">{exp.title}</h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-paper/75">{exp.description}</p>
                <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
                  {eventCta ? <WhatsAppIcon className="size-5" /> : null}
                  {eventCta ? "Reservar pelo WhatsApp" : "Saiba mais"}
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {events.length === 0 && (
          <p className="mt-12 max-w-xl text-sm leading-relaxed text-mute">
            A programação da casa é divulgada no{" "}
            <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="text-paper underline decoration-pink underline-offset-4 hover:text-cyan">
              Instagram oficial
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
