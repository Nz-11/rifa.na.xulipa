"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { instagramFeed } from "@/data/gallery";
import { site } from "@/data/site";
import { InstagramIcon, Reveal, SectionLabel } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;
// Deslocamentos verticais para um feed com ritmo editorial
const offsets = ["md:mt-0", "md:mt-16", "md:mt-6", "md:mt-24", "md:mt-2", "md:mt-12"];

export default function InstagramSection() {
  return (
    <section aria-labelledby="insta-title" className="relative overflow-hidden bg-sky py-24 text-ink md:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="04" tone="dark">
              Instagram
            </SectionLabel>
            <h2 id="insta-title" className="display mt-6 text-[clamp(3rem,10vw,8.5rem)] text-ink">
              Acompanhe <span className="relative inline-block">
                o Ripa.
                <span aria-hidden className="absolute left-[-4%] top-1/2 h-1 w-[108%] bg-pink" />
              </span>
            </h2>
          </div>
          <Reveal className="md:col-span-5">
            <p className="font-serif text-2xl leading-snug text-ink/85 md:text-[1.7rem]">
              O Ripa continua acontecendo fora daqui. Confira as novidades, os encontros e os próximos momentos.
            </p>
            <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="btn-dark mt-8">
              <InstagramIcon className="size-5" />
              Seguir no Instagram
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-24 md:grid-cols-6 md:gap-4">
          {instagramFeed.map((img, i) => (
            <motion.li
              key={img.id}
              className={offsets[i % offsets.length]}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.07, ease }}
            >
              <a
                href={img.href ?? site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${img.alt} — ver no Instagram (abre em nova aba)`}
                className="group relative block aspect-[4/5] overflow-hidden bg-ink/10"
              >
                <Image src={img.src} alt="" fill sizes="(min-width: 768px) 16vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-paper opacity-0 transition-all duration-500 group-hover:bg-ink/45 group-hover:opacity-100">
                  <InstagramIcon className="size-8" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <a
          href={site.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="display group mt-16 flex items-center justify-between gap-4 border-t-2 border-ink pt-6 text-[clamp(1.6rem,6vw,5rem)] md:mt-28"
        >
          <span className="truncate">{site.links.instagramHandle}</span>
          <ArrowUpRight className="size-10 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-16" aria-hidden />
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </div>
    </section>
  );
}
