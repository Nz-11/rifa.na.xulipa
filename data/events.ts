/**
 * Eventos e experiências.
 *
 * `upcomingEvents` começa vazio: nenhum evento foi confirmado pela casa.
 * Enquanto estiver vazio, o site mostra apenas as experiências fixas abaixo
 * (festas na laje e aniversários, divulgadas no Linktree oficial).
 *
 * Exemplo de evento:
 * {
 *   id: "samba-na-laje",
 *   title: "Samba na laje",
 *   date: "2026-10-18",          // AAAA-MM-DD
 *   time: "16h",
 *   description: "Descrição confirmada pela casa.",
 *   image: { src: "/images/gallery/laje-encontro.jpg", alt: "…", width: 908, height: 1210 },
 *   ctaLabel: "Mais informações",
 *   ctaHref: "https://www.instagram.com/ripanaxulipa_bar/",
 * }
 */

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  image?: { src: string; alt: string; width: number; height: number };
  ctaLabel?: string;
  ctaHref?: string;
};

export const upcomingEvents: EventItem[] = [];

export type Experience = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image?: { src: string; alt: string; width: number; height: number };
};

/** Experiências confirmadas no Linktree e no cardápio oficial */
export const experiences: Experience[] = [
  {
    id: "festa-na-laje",
    kicker: "Eventos na laje",
    title: "Sua festa na nossa laje",
    description:
      "O espaço perfeito pra fazer aquele churrasquinho na laje com a galera, com samba e cerveja gelada. Fale com a gente pra fazer sua reserva.",
    image: { src: "/images/gallery/laje-encontro.jpg", alt: "Laje do Ripa na Xulipa cheia, com música ao vivo", width: 908, height: 1210 },
  },
  {
    id: "aniversarios",
    kicker: "Aniversários",
    title: "Comemora aqui",
    description: "Aniversário com churrasco, espeto e cerveja gelada. Chama no WhatsApp pra combinar os detalhes.",
    image: { src: "/images/menu/churrasco-picanha.jpg", alt: "Picanha fatiada na travessa, ideal para compartilhar", width: 1837, height: 1225 },
  },
];
