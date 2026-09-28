"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Embers from "./Embers";
import { MaskedLines, Reveal } from "./ui";
import { useReduced } from "./useReduced";

const facts = [
  { big: "100%", label: "Espetos feitos na casa" },
  { big: "Zero", label: "Conservantes, aromatizante e amaciantes" },
  { big: "15 min", label: "Tempo de preparo do churrasco do seu jeito" },
  { big: "À vontade", label: "Farofa e vinagrete em todos os espetos" },
];

export default function GrillSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1.05]);
  const x = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 0.8, 0.4]);

  return (
    <section ref={ref} aria-labelledby="grill-title" className="grain relative isolate overflow-hidden bg-ink">
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { scale, x }}>
        <Image
          src="/images/menu/churrasco-picanha.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={80}
          className="object-cover object-[35%_50%] brightness-[0.45] contrast-125 saturate-[1.1]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/30 to-ink" />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,110,40,0.55),transparent_65%)] mix-blend-screen"
        style={{ opacity: reduce ? 0.6 : glow }}
      />
      {/* Fumaça */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute bottom-[-20%] h-[70%] w-[55%] rounded-full bg-paper/[0.06] blur-3xl"
            style={{ left: `${i * 28}%` }}
            animate={{ y: ["0%", "-35%"], opacity: [0, 0.9, 0], scale: [0.9, 1.25] }}
            transition={{ duration: 14, repeat: Infinity, delay: i * 4.5, ease: "easeOut" }}
          />
        ))}
      </div>
      <Embers density={1.1} className="-z-[5]" />

      <div className="mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-center px-4 py-28 sm:px-6 lg:px-10">
        <p className="eyebrow text-pink">Assado na rua</p>
        <h2 id="grill-title" className="display relative mt-6 text-[clamp(3.2rem,12.5vw,12rem)] text-paper">
          <MaskedLines lines={["O segredo", "está na", <span key="b" className="relative inline-block text-[#ffb27a]">brasa.
            <motion.span
              aria-hidden
              className="absolute left-[-6%] top-1/2 h-[3px] w-[112%] origin-left bg-pink md:h-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>]} />
        </h2>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-paper/15 pt-10 md:mt-24 md:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.1}>
              <dt className="display text-4xl text-sky md:text-5xl">{f.big}</dt>
              <dd className="mt-3 max-w-[16rem] text-sm leading-relaxed text-paper/75">{f.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
