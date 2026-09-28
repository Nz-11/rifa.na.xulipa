"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReduced } from "./useReduced";
import { site, fullAddress } from "@/data/site";
import { Logo } from "./ui";
import Embers from "./Embers";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReduced();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // Escolhe o vídeo conforme a tela; sem vídeo para movimento reduzido ou economia de dados
  useEffect(() => {
    if (reduce) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const portrait = window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches;
    setVideoSrc(portrait ? site.media.heroVideoMobile : site.media.heroVideo);
  }, [reduce]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    video.play().catch(() => {
      /* autoplay bloqueado: o poster permanece visível */
    });
  }, [videoSrc]);

  return (
    <section ref={ref} id="inicio" aria-label="Abertura" className="grain relative isolate h-[100svh] min-h-[560px] overflow-hidden bg-ink">
      <motion.div className="absolute inset-0 -z-10" style={{ y: reduce ? 0 : mediaY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        >
          <Image
            src={site.media.heroPosterMobile}
            alt=""
            fill
            preload
            sizes="100vw"
            quality={70}
            className="object-cover md:hidden"
          />
          <Image src={site.media.heroPoster} alt="" fill preload sizes="100vw" quality={70} className="hidden object-cover md:block" />
          {videoSrc && (
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${videoReady ? "opacity-100" : "opacity-0"}`}
              src={videoSrc}
              poster={site.media.heroPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              onCanPlay={() => setVideoReady(true)}
            />
          )}
        </motion.div>
        {/* Gradação cinematográfica para leitura do texto */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(8,8,8,0.35),rgba(8,8,8,0.85)_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
        <div className="absolute inset-0 bg-[#3a1405]/25 mix-blend-multiply" />
      </motion.div>

      <Embers density={0.6} className="-z-[5] opacity-80" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="mx-auto flex h-full max-w-[1440px] flex-col justify-end px-4 pb-20 pt-24 sm:px-6 md:pb-28 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="mb-6 w-fit shadow-[0_30px_80px_-20px_rgba(144,218,247,0.45)] md:mb-10"
        >
          <Logo size={88} preload className="md:hidden" />
          <Logo size={148} preload className="hidden md:block" />
        </motion.div>

        <h1 className="display relative text-[clamp(2.8rem,14.5vw,11.5rem)] text-paper">
          <span className="relative block overflow-hidden pb-[0.04em] pt-[0.12em] -mt-[0.12em]">
            <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.55, ease }}>
              Assado na rua.
            </motion.span>
          </span>
          <span className="relative block overflow-hidden pb-[0.04em] pt-[0.12em] -mt-[0.12em]">
            <motion.span className="block text-sky" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.7, ease }}>
              Feito pra viver.
            </motion.span>
          </span>
          <motion.span
            aria-hidden
            className="absolute left-[-4vw] top-[24%] h-[3px] w-[calc(100%+8vw)] origin-left bg-pink md:h-1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.2, ease }}
          />
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md font-serif text-[1.35rem] leading-snug text-paper/90 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease }}
          >
            Brasa acesa, comida de verdade e o clima que só o Ripa tem.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease }}
          >
            <a href="#cardapio" className="btn-primary">
              Explorar o cardápio
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a href="#o-ripa" className="btn-ghost backdrop-blur-sm">
              Conheça o Ripa
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#o-ripa"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 right-10 hidden flex-col items-center gap-2 text-paper/60 hover:text-paper md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="relative block h-10 w-px overflow-hidden bg-paper/20">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-pink [animation:scroll-cue_1.8s_var(--ease-cine)_infinite]" />
        </span>
        <ArrowDown className="size-3.5" aria-hidden />
      </motion.a>

      <motion.p
        className="eyebrow absolute bottom-7 left-10 hidden text-paper/50 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {fullAddress}
      </motion.p>
    </section>
  );
}
