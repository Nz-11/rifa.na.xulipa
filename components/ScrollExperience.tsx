"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useReduced } from "./useReduced";

type Chapter = {
  id: string;
  title: string;
  text: string;
  image: { src: string; alt: string };
};

const chapters: Chapter[] = [
  {
    id: "brasa",
    title: "A brasa.",
    text: "Espetos feitos na casa. Sem conservantes, aromatizante e amaciantes.",
    image: { src: "/images/menu/churrasco-picanha.jpg", alt: "Picanha fatiada, assada na brasa" },
  },
  {
    id: "mesa",
    title: "A mesa.",
    text: "Farofa e vinagrete acompanham todos os espetos. E são à vontade.",
    image: { src: "/images/menu/file-oswaldo-aranha.jpg", alt: "Filé Oswaldo Aranha servido com arroz e batata chips" },
  },
  {
    id: "laje",
    title: "A laje.",
    text: "Samba, cerveja gelada e a galera reunida lá em cima.",
    image: { src: "/images/gallery/laje-encontro.jpg", alt: "Encontro na laje com música ao vivo" },
  },
];

function Layer({ chapter, index, total, progress }: { chapter: Chapter; index: number; total: number; progress: MotionValue<number> }) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  // Revelação por máscara (de baixo para cima) e zoom lento de câmera
  const clip = useTransform(progress, [start - seg * 0.35, start + seg * 0.05], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(progress, [start - seg * 0.35, end], [1.25, 1]);
  const textOpacity = useTransform(progress, [start, start + seg * 0.2, end - seg * 0.2, end], index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const textY = useTransform(progress, [start, start + seg * 0.25, end], [60, 0, -40]);
  const firstOpacity = useTransform(progress, [0, end - seg * 0.2, end], [1, 1, 0]);
  const first = index === 0;

  return (
    <>
      <motion.div className="absolute inset-0 overflow-hidden" style={first ? undefined : { clipPath: clip }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src={chapter.image.src} alt={chapter.image.alt} fill sizes="100vw" quality={80} className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/50" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 md:pb-24 lg:px-10"
        style={{ opacity: first ? firstOpacity : textOpacity, y: textY }}
      >
        <p className="eyebrow text-pink">
          0{index + 1} / 0{total}
        </p>
        <h3 className="display mt-3 text-[clamp(3.8rem,15vw,13rem)] text-paper">{chapter.title}</h3>
        <p className="mt-4 max-w-md font-serif text-xl leading-snug text-paper/90 md:text-2xl">{chapter.text}</p>
      </motion.div>
    </>
  );
}

export default function ScrollExperience() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduce) {
    return (
      <section aria-label="A atmosfera do Ripa" className="bg-ink">
        {chapters.map((c, i) => (
          <div key={c.id} className="relative h-[80svh] overflow-hidden">
            <Image src={c.image.src} alt={c.image.alt} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/40" />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10">
              <p className="eyebrow text-pink">0{i + 1} / 0{chapters.length}</p>
              <h3 className="display mt-3 text-[clamp(3.8rem,15vw,13rem)]">{c.title}</h3>
              <p className="mt-4 max-w-md font-serif text-xl text-paper/90 md:text-2xl">{c.text}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="A atmosfera do Ripa" className="relative bg-ink" style={{ height: `${chapters.length * 110}svh` }}>
      <div className="grain sticky top-0 h-[100svh] overflow-hidden">
        {chapters.map((c, i) => (
          <Layer key={c.id} chapter={c} index={i} total={chapters.length} progress={scrollYProgress} />
        ))}

        {/* Indicador de progresso inspirado na linha da logo */}
        <div aria-hidden className="absolute right-4 top-1/2 z-20 h-40 w-[3px] -translate-y-1/2 bg-paper/15 md:right-10 md:h-56">
          <motion.div className="h-full w-full origin-top bg-pink" style={{ scaleY: bar }} />
        </div>
      </div>
    </section>
  );
}
