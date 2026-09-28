/**
 * Informações comerciais centralizadas do Ripa na Xulipa.
 *
 * Fontes confirmadas:
 * - Linktree oficial: https://linktr.ee/ripa.na.xulipa
 * - Cardápio oficial (PDF vinculado no Linktree) — cópia em assets/original/cardapio-oficial.pdf
 *
 * Campos vazios ("" ou []) são ocultados automaticamente no site.
 * Preencha-os somente com dados confirmados pelo estabelecimento.
 */

export const site = {
  name: "Ripa na Xulipa",
  tagline: "Assado na Rua",
  /** Bio do Linktree oficial */
  bio: "Churrasco na laje & cerveja gelada",

  /** URL pública do site (ex.: "https://www.ripanaxulipa.com.br"). Usada em canonical e Open Graph. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ""),

  address: {
    street: "Rua Purpurina, 403",
    district: "Sumarezinho",
    city: "São Paulo",
    state: "SP",
    postalCode: "05435-030",
  },

  contact: {
    /** Telefone publicado no cardápio oficial e no Linktree */
    phoneDisplay: "(11) 3815-9555",
    phoneHref: "tel:+551138159555",
    /**
     * WhatsApp oficial (link "Eventos na laje" / "Aniversários" do Linktree).
     * Somente dígitos, com DDI + DDD. Deixe "" para ocultar todos os botões de WhatsApp.
     */
    whatsapp: "551138159555",
    whatsappMessage:
      "Olá, Ripa na Xulipa! Vim pelo site e gostaria de mais informações sobre a casa.",
    whatsappEventMessage:
      "Olá, Ripa na Xulipa! Vim pelo site e gostaria de saber sobre eventos e aniversários na laje.",
    email: "",
  },

  /**
   * Horário de funcionamento — não confirmado. Preencha para exibir no site.
   * Ex.: [{ days: "Ter a Sex", hours: "12h às 23h" }]
   */
  openingHours: [] as { days: string; hours: string }[],

  links: {
    instagram: "https://www.instagram.com/ripanaxulipa_bar/",
    instagramHandle: "@ripanaxulipa_bar",
    linktree: "https://linktr.ee/ripa.na.xulipa",
    /** Delivery oficial listado no Linktree */
    delivery:
      "https://www.ifood.com.br/delivery/sao-paulo-sp/ripa-na-xulipa---churrasco---pf-sumarezinho/e8302208-4742-4fd3-b1b9-9edf55e032f4",
  },

  media: {
    logo: "/images/logo-ripa-na-xulipa.png",
    /**
     * Vídeo da abertura. A versão atual é uma montagem com as fotografias oficiais
     * do cardápio. Substitua pelo vídeo oficial da casa (brasa, churrasqueira, laje)
     * mantendo os mesmos caminhos ou alterando-os aqui.
     */
    heroVideo: "/videos/hero-video.mp4",
    heroVideoMobile: "/videos/hero-video-mobile.mp4",
    heroPoster: "/images/hero-poster.jpg",
    heroPosterMobile: "/images/hero-poster-mobile.jpg",
    ogImage: "/images/og-image.jpg",
  },

  credits: {
    studio: "Cezario's",
    /** Link opcional para o site da Cezario's */
    studioUrl: "",
  },
} as const;

export const fullAddress = `${site.address.street} — ${site.address.district}, ${site.address.city} — ${site.address.state}`;

const mapsQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}, ${site.address.postalCode}`,
);

export const maps = {
  embed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  search: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
};

/** Link de WhatsApp com mensagem inicial, ou null se nenhum número estiver configurado. */
export function whatsappLink(message: string = site.contact.whatsappMessage) {
  const number = site.contact.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "O Ripa", href: "#o-ripa" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Galeria", href: "#galeria" },
  { label: "Localização", href: "#localizacao" },
] as const;
