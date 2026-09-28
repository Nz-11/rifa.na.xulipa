"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { site } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

/** Logo oficial — sempre em proporção 1:1, sem filtros nem recortes. */
export function Logo({ size = 48, className = "", preload = false }: { size?: number; className?: string; preload?: boolean }) {
  return (
    <Image
      src={site.media.logo}
      alt="Ripa na Xulipa — Assado na Rua"
      width={size}
      height={size}
      preload={preload}
      className={`aspect-square shrink-0 ${className}`}
      style={{ width: size, height: size }}
      sizes={`${size * 2}px`}
    />
  );
}

/** Linha rosa inspirada na logo, que atravessa a composição ao entrar em cena. */
export function StrikeLine({ className = "", delay = 0, origin = "left" }: { className?: string; delay?: number; origin?: "left" | "right" }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-[3px] bg-pink ${className}`}
      style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, delay, ease }}
    />
  );
}

/** Revelação suave ao entrar na viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/** Título com revelação por linhas usando máscara. */
export function MaskedLines({ lines, className = "", delay = 0 }: { lines: React.ReactNode[]; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mt-[0.16em] block overflow-hidden pb-[0.06em] pt-[0.16em] first:mt-0">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 1, delay: delay + i * 0.12, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionLabel({ index, children, tone = "light" }: { index: string; children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-mute" : "text-ink/70"}`}>
      <span className="text-pink">{index}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}

export function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.44 9.44Zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.3l5.7-1.5a11.33 11.33 0 0 0 5.77 1.47c6.26 0 11.36-5.1 11.37-11.36 0-3.03-1.18-5.89-3.33-8.03Z" />
    </svg>
  );
}
