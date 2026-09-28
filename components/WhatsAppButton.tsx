"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./ui";

/** Botão flutuante — fica oculto enquanto nenhum número oficial estiver configurado em data/site.ts. */
export default function WhatsAppButton() {
  const href = whatsappLink();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!href) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com o Ripa na Xulipa pelo WhatsApp (abre em nova aba)"
          className="group fixed bottom-4 right-4 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#1f8f4e] pl-4 pr-4 text-paper shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] ring-1 ring-paper/15 transition-colors hover:bg-[#25a55a] md:bottom-6 md:right-6"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <WhatsAppIcon className="size-6 shrink-0" />
          <span className="max-w-0 whitespace-nowrap text-[0.72rem] font-extrabold uppercase tracking-[0.16em] opacity-0 transition-all duration-500 group-hover:ml-3 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-40 group-focus-visible:opacity-100">
            Fale com a gente
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
