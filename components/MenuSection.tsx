"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Bike } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { formatPrice, menuCategories, menuItems, menuMeta, type MenuItem } from "@/data/menu";
import { site } from "@/data/site";
import { SectionLabel, StrikeLine } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;
const HIGHLIGHTS = "destaques";

const tabs = [
  { id: HIGHLIGHTS, label: "Destaques" },
  ...menuCategories.filter((c) => menuItems.some((i) => i.category === c.id)).map((c) => ({ id: c.id, label: c.label })),
];

function Price({ item }: { item: MenuItem }) {
  if (item.variants?.length) {
    return (
      <span className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-right">
        {item.variants.map((v) => (
          <span key={v.label} className="whitespace-nowrap">
            <span className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.15em] text-mute">{v.label}</span>{" "}
            <span className="text-cyan">{formatPrice(v.price)}</span>
          </span>
        ))}
      </span>
    );
  }
  if (item.price === undefined) return <span className="text-mute">Consulte</span>;
  return (
    <span className="whitespace-nowrap text-cyan">
      <span className="mr-1 font-sans text-[0.7rem] font-bold text-mute">R$</span>
      {formatPrice(item.price)}
    </span>
  );
}

function Availability({ item }: { item: MenuItem }) {
  if (!item.available) return <span className="eyebrow text-[0.6rem] text-mute">Indisponível no momento</span>;
  if (!item.availability) return null;
  return <span className="eyebrow border border-pink/50 px-2 py-1 text-[0.6rem] tracking-[0.18em] text-pink">{item.availability}</span>;
}

function ItemRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.5), ease }}
      className={`group flex gap-4 border-b border-paper/10 py-5 ${item.available ? "" : "opacity-50"}`}
    >
      {item.image && (
        <div className="relative size-16 shrink-0 overflow-hidden md:size-20">
          <Image src={item.image.src} alt={item.image.alt} fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="text-[1.02rem] font-extrabold uppercase leading-tight tracking-[0.04em] md:text-lg">
            {item.name}
            {item.featured && <span className="ml-2 inline-block size-1.5 -translate-y-1 bg-pink align-middle" aria-label="Destaque da casa" />}
          </h4>
          {!item.variants?.length && <span aria-hidden className="leader" />}
          {!item.variants?.length && (
            <span className="font-display text-xl">
              <Price item={item} />
            </span>
          )}
        </div>
        {item.description && <p className="mt-1.5 max-w-prose text-[0.92rem] leading-relaxed text-paper/60">{item.description}</p>}
        {(item.variants?.length || item.availability || !item.available) && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <Availability item={item} />
            {item.variants?.length ? (
              <span className="ml-auto font-display text-xl">
                <Price item={item} />
              </span>
            ) : null}
          </div>
        )}
      </div>
    </motion.li>
  );
}

function Highlights() {
  const items = menuItems.filter((i) => i.image && i.available);
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
      {items.map((item, i) => {
        const big = i === 0;
        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
            className={`group ${big ? "sm:col-span-2 lg:col-span-7 lg:row-span-2" : i <= 2 ? "lg:col-span-5" : "lg:col-span-6"}`}
          >
            <div className={`relative overflow-hidden bg-char ${big ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[16/10]"}`}>
              <Image
                src={item.image!.src}
                alt={item.image!.alt}
                fill
                sizes={big ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"}
                quality={80}
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-cine)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              {item.availability && (
                <span className="eyebrow absolute left-4 top-4 bg-ink/85 px-3 py-2 text-[0.6rem] text-pink">{item.availability}</span>
              )}
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[0.6rem] text-mute">{menuCategories.find((c) => c.id === item.category)?.label}</p>
                <h4 className={`display mt-2 ${big ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"}`}>{item.name}</h4>
              </div>
              <span className="font-display pt-5 text-2xl">
                <Price item={item} />
              </span>
            </div>
            {item.description && <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-paper/60">{item.description}</p>}
          </motion.article>
        );
      })}
    </div>
  );
}

export default function MenuSection() {
  const [active, setActive] = useState<string>(HIGHLIGHTS);
  const topRef = useRef<HTMLDivElement>(null);
  const category = menuCategories.find((c) => c.id === active);
  const items = useMemo(() => menuItems.filter((i) => i.category === active), [active]);

  const select = (id: string, el: HTMLButtonElement) => {
    setActive(id);
    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    // Mantém o início da lista visível ao trocar de categoria no celular
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="cardapio" aria-labelledby="menu-title" className="relative bg-ink py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel index="02">Cardápio</SectionLabel>
            <h2 id="menu-title" className="display mt-6 text-[clamp(3rem,10vw,9rem)]">
              Da brasa <span className="text-sky">pra mesa.</span>
            </h2>
            <StrikeLine className="mt-5 w-40 md:w-72" />
          </div>
          <p className="font-serif text-2xl text-paper/85 md:col-span-4 md:pb-4 md:text-right md:text-3xl">{menuMeta.subtitle}</p>
        </div>
      </div>

      {/* Filtro de categorias */}
      <div ref={topRef} className="sticky top-16 z-30 mt-14 border-y border-paper/10 bg-ink/90 backdrop-blur-md md:top-20 md:mt-20">
        <div className="mx-auto max-w-[1440px]">
          <div role="group" aria-label="Filtrar cardápio por categoria" className="no-scrollbar flex gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:flex-wrap lg:px-10">
            {tabs.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="menu-panel"
                  onClick={(e) => select(tab.id, e.currentTarget)}
                  className={`relative min-h-11 shrink-0 px-4 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-ink" : "text-paper/70 hover:text-paper"
                  }`}
                >
                  {isActive && <motion.span layoutId="menu-pill" className="absolute inset-0 bg-cyan" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="menu-panel" aria-live="polite" className="mx-auto mt-12 min-h-[60svh] max-w-[1440px] px-4 sm:px-6 md:mt-16 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35 }}
          >
            {active === HIGHLIGHTS || !category ? (
              <Highlights />
            ) : (
              <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                <aside className="md:col-span-5">
                  <div className="md:sticky md:top-44">
                    {category.cover ? (
                      <motion.div
                        className="relative aspect-[16/10] overflow-hidden md:aspect-[4/5]"
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        animate={{ clipPath: "inset(0 0% 0 0)" }}
                        transition={{ duration: 0.9, ease }}
                      >
                        <Image src={category.cover.src} alt={category.cover.alt} fill sizes="(min-width: 768px) 40vw, 100vw" quality={80} className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
                        <h3 className="display absolute bottom-5 left-5 right-5 text-5xl md:text-7xl">{category.label}</h3>
                      </motion.div>
                    ) : (
                      <div className="relative overflow-hidden bg-char px-6 py-10 md:py-16">
                        <span aria-hidden className="absolute left-0 top-1/2 h-[3px] w-full bg-pink/80" />
                        <h3 className="display relative text-6xl text-sky md:text-8xl">{category.label}</h3>
                      </div>
                    )}
                    {category.intro && <p className="mt-6 font-serif text-2xl leading-snug text-paper/90">{category.intro}</p>}
                    {category.notes?.length ? (
                      <ul className="mt-5 space-y-2 border-l-2 border-pink pl-4 text-sm leading-relaxed text-paper/65">
                        {category.notes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </aside>
                <ul className="border-t border-paper/10 md:col-span-7">
                  {items.map((item, i) => (
                    <ItemRow key={item.id} item={item} index={i} />
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-20 max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 border-t border-paper/10 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-lg text-sm leading-relaxed text-mute">{menuMeta.disclaimer}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.links.linktree} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Ver cardápio completo
              <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
            {site.links.delivery && (
              <a href={site.links.delivery} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Bike className="size-4" aria-hidden />
                Pedir delivery
                <span className="sr-only">(abre o iFood em nova aba)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
