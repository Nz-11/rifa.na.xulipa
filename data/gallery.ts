/**
 * Galeria e feed do Instagram.
 *
 * Todas as fotos atuais vêm do material oficial da casa (cardápio publicado no Linktree).
 * Para adicionar novas fotos: coloque o arquivo em /public/images/gallery e inclua um item abaixo
 * com as dimensões reais (width/height) para evitar layout shift.
 *
 * `shape` controla o formato no grid editorial: "wide" (horizontal), "tall" (vertical) ou "square".
 */

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  shape: "wide" | "tall" | "square";
  tag: "Ambiente" | "Comida" | "Bebida" | "Encontros" | "Churrasqueira" | "Detalhes";
};

export const galleryImages: GalleryImage[] = [
  { id: "laje", src: "/images/gallery/laje-encontro.jpg", alt: "Encontro na laje do Ripa na Xulipa com música ao vivo e varal de luzes", width: 908, height: 1210, caption: "Samba e encontro na laje", shape: "tall", tag: "Encontros" },
  { id: "picanha", src: "/images/menu/churrasco-picanha.jpg", alt: "Picanha fatiada na travessa, com farofa e vinagrete", width: 1837, height: 1225, caption: "Churrasco do seu jeito", shape: "wide", tag: "Comida" },
  { id: "coquetel", src: "/images/menu/coquetel-maracuja.jpg", alt: "Coquetel da casa com maracujá e gelo", width: 884, height: 589, caption: "Coquetelaria à base de cachaça", shape: "square", tag: "Bebida" },
  { id: "oswaldo", src: "/images/menu/file-oswaldo-aranha.jpg", alt: "Filé Oswaldo Aranha com alho frito, arroz e batata chips", width: 1600, height: 1067, caption: "Filé Oswaldo Aranha", shape: "wide", tag: "Comida" },
  { id: "batidinha", src: "/images/menu/batidinha-de-coco.jpg", alt: "Batidinha de coco no copo", width: 490, height: 734, caption: "Batidinha de coco", shape: "tall", tag: "Bebida" },
  { id: "pf", src: "/images/menu/pf-do-ripa.jpg", alt: "PF do Ripa com espetos, arroz, salada, feijão, farofa e vinagrete", width: 882, height: 587, caption: "PF do Ripa", shape: "square", tag: "Comida" },
  { id: "parmegiana", src: "/images/menu/parmegiana.jpg", alt: "Parmegiana com molho de tomate caseiro, arroz e batata chips", width: 1652, height: 1101, caption: "Parmegiana", shape: "wide", tag: "Comida" },
  { id: "cha", src: "/images/menu/cha-mate.jpg", alt: "Copo gelado com limão, do cardápio de bebidas", width: 797, height: 591, caption: "Gelado, do jeito certo", shape: "square", tag: "Bebida" },
];

/**
 * Imagens exibidas na seção do Instagram.
 * Não há integração oficial com a API do Instagram: estas imagens são configuráveis
 * e cada uma leva ao perfil oficial. Para integrar no futuro, substitua `instagramFeed`
 * por dados vindos da Instagram Graph API (com token autorizado pelo estabelecimento),
 * mantendo o mesmo formato.
 */
export type FeedImage = Pick<GalleryImage, "id" | "src" | "alt" | "width" | "height"> & { href?: string };

export const instagramFeed: FeedImage[] = ["laje", "picanha", "coquetel", "pf", "batidinha", "oswaldo"]
  .map((id) => galleryImages.find((image) => image.id === id))
  .filter((image): image is GalleryImage => Boolean(image))
  .map(({ id, src, alt, width, height }) => ({ id, src, alt, width, height }));
