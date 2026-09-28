"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import { SectionLabel, StrikeLine } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

const aspect: Record<GalleryImage["shape"], string> = {
  wide: "aspect-[3/2]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
};

function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (dir: 1 | -1) => void }) {
  const image = galleryImages[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      onNav(d);
    },
    [onNav],
  );

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button"));
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, go]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} de ${galleryImages.length}: ${image.caption ?? image.alt}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="eyebrow text-mute" aria-live="polite">
          <span className="text-pink">{String(index + 1).padStart(2, "0")}</span> / {String(galleryImages.length).padStart(2, "0")}
        </p>
        <button type="button" data-autofocus onClick={onClose} aria-label="Fechar galeria" className="grid size-12 place-items-center text-paper hover:text-cyan">
          <X className="size-7" aria-hidden />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={image.id}
            custom={dir}
            className="absolute inset-4 sm:inset-x-20 sm:inset-y-4"
            initial={{ opacity: 0, x: dir * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -80 }}
            transition={{ duration: 0.5, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
          >
            <Image src={image.src} alt={image.alt} fill sizes="100vw" quality={90} className="pointer-events-none select-none object-contain" />
          </motion.div>
        </AnimatePresence>

        <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-ink/60 text-paper hover:bg-cyan hover:text-ink sm:left-4">
          <ChevronLeft className="size-6" aria-hidden />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-ink/60 text-paper hover:bg-cyan hover:text-ink sm:right-4">
          <ChevronRight className="size-6" aria-hidden />
        </button>
      </div>

      <p className="px-4 pb-6 pt-3 text-center font-serif text-xl text-paper/85 sm:px-6">{image.caption ?? image.alt}</p>
    </motion.div>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    triggerRef.current?.focus();
  }, []);
  const nav = useCallback((d: 1 | -1) => setOpen((i) => (i === null ? i : (i + d + galleryImages.length) % galleryImages.length)), []);

  return (
    <section id="galeria" aria-labelledby="gallery-title" className="bg-ink py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="columns-2 gap-3 sm:gap-4 md:columns-3 md:gap-6">
          <div className="mb-3 break-inside-avoid pb-8 pt-2 sm:mb-4 md:mb-6 md:pb-14">
            <SectionLabel index="03">Galeria</SectionLabel>
            <h2 id="gallery-title" className="display mt-6 text-[clamp(2.4rem,6.5vw,6rem)]">
              Um pouco do que <span className="text-sky">é o Ripa.</span>
            </h2>
            <StrikeLine className="mt-5 w-2/3" />
          </div>

          {galleryImages.map((image, i) => (
            <motion.figure
              key={image.id}
              className="mb-3 break-inside-avoid sm:mb-4 md:mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease }}
            >
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={`Ampliar foto: ${image.caption ?? image.alt}`}
                className={`group relative block w-full overflow-hidden bg-char ${aspect[image.shape]}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 32vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-cine)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Expand className="absolute right-3 top-3 size-5 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
              </button>
              <figcaption className="mt-2 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-mute">
                <span className="text-pink">{image.tag}</span>
                <span aria-hidden className="h-px w-3 bg-mute/50" />
                <span className="truncate">{image.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  );
}
