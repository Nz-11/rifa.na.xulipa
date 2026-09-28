"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReduced } from "./useReduced";
import { MaskedLines, Reveal, SectionLabel, StrikeLine } from "./ui";

const manifesto = [
  { n: "01", text: "Aqui não tem gato. Tudo é feito na casa." },
  { n: "02", text: "Da churrasqueira direto pra sua mesa." },
  { n: "03", text: "Churrasco na laje & cerveja gelada." },
  { n: "04", text: "Água fresca do filtro de barro é sempre à vontade." },
];

const marquee = ["Espetos na brasa", "Churrasco na laje", "Cerveja bem gelada", "Coquetéis de cachaça", "PF do Ripa", "Assado na rua"];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section ref={ref} id="o-ripa" aria-labelledby="about-title" className="relative overflow-hidden bg-ink pt-24 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionLabel index="01">O universo Ripa</SectionLabel>

        <h2 id="about-title" className="display mt-6 text-[clamp(2.6rem,9vw,8.5rem)]">
          <MaskedLines lines={["Mais que um bar.", <span key="b" className="text-sky">Um lugar pra</span>, <span key="c" className="text-sky">se encontrar.</span>]} />
        </h2>
        <StrikeLine className="mt-6 w-[62%] md:w-[48%]" delay={0.4} />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
          {/* Texto */}
          <div className="md:col-span-5 md:pt-16 lg:col-span-4">
            <Reveal>
              <p className="font-serif text-2xl leading-snug text-paper md:text-[1.9rem]">
                Espeto na brasa, cerveja bem gelada e a laje cheia de gente.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm leading-relaxed text-paper/65">
                O Ripa na Xulipa é assado na rua: comida feita na casa, servida da churrasqueira direto pra mesa, num boteco pra chegar sem cerimônia.
              </p>
            </Reveal>

            <ol className="mt-12 border-t border-paper/10">
              {manifesto.map((item, i) => (
                <Reveal as="li" key={item.n} delay={0.08 * i} className="flex gap-5 border-b border-paper/10 py-5">
                  <span className="eyebrow pt-1 text-pink">{item.n}</span>
                  <span className="text-[1.05rem] font-semibold leading-snug">{item.text}</span>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Composição fotográfica assimétrica */}
          <div className="relative md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <motion.figure
              className="relative ml-auto aspect-[3/4] w-[88%] overflow-hidden md:w-[78%]"
              style={reduce ? undefined : { y: bigY }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/gallery/laje-encontro.jpg"
                alt="Laje do Ripa na Xulipa cheia de gente, com música ao vivo e varal de luzes"
                fill
                sizes="(min-width: 768px) 45vw, 88vw"
                quality={80}
                className="object-cover"
              />
              <figcaption className="eyebrow absolute bottom-4 left-4 bg-ink/80 px-3 py-2 text-paper/80">A laje</figcaption>
            </motion.figure>

            <motion.figure
              className="absolute -bottom-10 left-0 aspect-[4/3] w-[58%] overflow-hidden border-[6px] border-ink md:-bottom-16 md:w-[52%]"
              style={reduce ? undefined : { y: smallY }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/menu/pf-do-ripa.jpg"
                alt="PF do Ripa com espetos, arroz, salada, feijão, farofa e vinagrete"
                fill
                sizes="(min-width: 768px) 30vw, 58vw"
                className="object-cover"
              />
            </motion.figure>
          </div>
        </div>
      </div>

      {/* Faixa de manifesto */}
      <div className="relative mt-32 -rotate-2 bg-pink py-4 text-ink md:mt-48" aria-hidden>
        <div className="flex w-max [animation:marquee_38s_linear_infinite]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {marquee.map((word) => (
                <span key={word + k} className="display flex items-center gap-8 px-4 text-3xl md:text-5xl">
                  {word}
                  <span className="inline-block h-[3px] w-10 bg-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-16 md:h-24" />
    </section>
  );
}
