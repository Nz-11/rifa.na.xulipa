"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, site, whatsappLink, fullAddress } from "@/data/site";
import { InstagramIcon, Logo } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#inicio");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const contactHref = whatsappLink() ?? "#localizacao";
  const contactExternal = contactHref.startsWith("http");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca a seção visível na navegação
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Menu mobile: trava a rolagem, fecha com Esc e mantém o foco dentro do painel
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel) {
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled && !open ? "border-b border-paper/8 bg-ink/75 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 md:h-20 lg:px-10">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Ripa na Xulipa — voltar ao início">
          <Logo size={44} preload className="md:hidden" />
          <Logo size={52} preload className="hidden md:block" />
          <span className="hidden leading-none sm:block">
            <span className="display block text-lg tracking-wide">Ripa na Xulipa</span>
            <span className="eyebrow mt-1 block text-[0.6rem] text-sky">Assado na rua</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "location" : undefined}
                  className="group relative py-2 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-paper/80 transition-colors hover:text-paper aria-[current]:text-paper"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-pink transition-transform duration-500 ${
                      active === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contactHref}
            {...(contactExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="btn-primary hidden min-h-11 px-5 lg:inline-flex"
          >
            Contato
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="relative z-[60] grid size-12 place-items-center text-paper lg:hidden"
          >
            {open ? <X className="size-7" aria-hidden /> : <Menu className="size-7" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink px-6 pb-8 pt-24 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <motion.span
              aria-hidden
              className="absolute left-0 top-[42%] h-[3px] w-full origin-left bg-pink/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
            />
            <nav aria-label="Navegação mobile" className="relative">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline gap-4 py-2 text-[clamp(2.8rem,13vw,4.5rem)] text-paper transition-colors hover:text-cyan"
                    >
                      <span className="font-sans text-xs font-bold tracking-[0.2em] text-pink">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative mt-auto space-y-5 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href={contactHref}
                {...(contactExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Fale com o Ripa
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <div className="flex items-center justify-between gap-4 text-sm text-mute">
                <p>{fullAddress}</p>
                <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram do Ripa na Xulipa" className="grid size-12 shrink-0 place-items-center border border-paper/20 text-paper">
                  <InstagramIcon />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
