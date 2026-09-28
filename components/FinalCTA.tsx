"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, MapPin, UtensilsCrossed } from "lucide-react";
import { useRef } from "react";
import { site } from "@/data/site";
import { InstagramIcon, MaskedLines, Reveal } from "./ui";
import { useReduced } from "./useReduced";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="grain relative isolate overflow-hidden">
      <motion.div className="absolute inset-[-12%_0] -z-10" style={reduce ? undefined : { y }}>
        <Image src="/images/gallery/laje-encontro.jpg" alt="" fill sizes="100vw" quality={75} className="object-cover object-[50%_40%]" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-ink/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink" />

      <div className="mx-auto flex min-h-[90svh] max-w-[1440px] flex-col justify-center px-4 py-28 sm:px-6 lg:px-10">
        <h2 id="cta-title" className="display max-w-6xl text-[clamp(2.8rem,9.5vw,9rem)]">
          <MaskedLines lines={["Seu próximo", "encontro tem", <span key="e" className="relative inline-block text-sky">endereço.
            <motion.span
              aria-hidden
              className="absolute left-[-4%] top-1/2 h-[3px] w-[108%] origin-left bg-pink md:h-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>]} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-8 font-serif text-2xl text-paper/90 md:text-3xl">Chama a galera e vem viver o Ripa.</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#cardapio" className="btn-primary">
            <UtensilsCrossed className="size-4" aria-hidden />
            Ver o cardápio
          </a>
          <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost backdrop-blur-sm">
            <InstagramIcon className="size-4" />
            Instagram
            <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <a href="#localizacao" className="btn-ghost backdrop-blur-sm">
            <MapPin className="size-4" aria-hidden />
            Como chegar
          </a>
        </Reveal>
      </div>
    </section>
  );
}
