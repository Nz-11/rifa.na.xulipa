/**
 * Cardápio do Ripa na Xulipa.
 *
 * Fonte: cardápio oficial em PDF, vinculado no Linktree da casa
 * (cópia em assets/original/cardapio-oficial.pdf). Todas as fotos em
 * /public/images/menu foram extraídas desse mesmo material oficial.
 *
 * Para editar:
 * - Preços em reais (number). Use `variants` quando o item tiver mais de um preço.
 * - `available: false` mostra o item como "Indisponível no momento".
 * - `availability` exibe uma observação (ex.: "Aos domingos").
 * - Para adicionar uma categoria, inclua-a em `menuCategories` e use o mesmo `id` nos itens.
 */

export type MenuImage = { src: string; alt: string; width: number; height: number };

export type MenuCategory = {
  id: string;
  label: string;
  /** Texto curto exibido no topo da categoria */
  intro?: string;
  /** Observações do cardápio oficial (acompanhamentos, regras etc.) */
  notes?: string[];
  cover?: MenuImage;
};

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description?: string;
  /** Preço único em reais */
  price?: number;
  /** Preços por variação (tamanho, sabor etc.) */
  variants?: { label: string; price: number }[];
  image?: MenuImage;
  available: boolean;
  availability?: string;
  featured?: boolean;
};

const photos = {
  picanha: { src: "/images/menu/churrasco-picanha.jpg", alt: "Picanha fatiada na travessa, com farofa e vinagrete", width: 1837, height: 1225 },
  oswaldo: { src: "/images/menu/file-oswaldo-aranha.jpg", alt: "Filé Oswaldo Aranha com alho frito, arroz e batata chips", width: 1600, height: 1067 },
  parmegiana: { src: "/images/menu/parmegiana.jpg", alt: "Parmegiana com molho de tomate caseiro, arroz branco e batata chips", width: 1652, height: 1101 },
  pf: { src: "/images/menu/pf-do-ripa.jpg", alt: "PF do Ripa com espetos, arroz, salada, feijão, farofa e vinagrete", width: 882, height: 587 },
  coquetel: { src: "/images/menu/coquetel-maracuja.jpg", alt: "Coquetel da casa com maracujá e gelo", width: 884, height: 589 },
  batidinha: { src: "/images/menu/batidinha-de-coco.jpg", alt: "Batidinha de coco no copo", width: 490, height: 734 },
  cha: { src: "/images/menu/cha-mate.jpg", alt: "Copo gelado com limão, do cardápio de bebidas", width: 797, height: 591 },
} satisfies Record<string, MenuImage>;

export const menuCategories: MenuCategory[] = [
  {
    id: "churrasco",
    label: "Churrasco",
    intro: "Churrasco do seu jeito. Ideal para compartilhar.",
    notes: [
      "Tempo de preparo: 15 minutos.",
      "Acompanham uma porção de farofa e vinagrete.",
      "Compre um churrasco e adicione uma taça de vinho da casa (branco ou tinto) por R$ 18.",
    ],
    cover: photos.picanha,
  },
  {
    id: "espetos",
    label: "Espetos",
    intro: "Feitos na casa. Sem conservantes, aromatizante e amaciantes.",
    notes: ["Farofa e vinagrete acompanham todos os espetos e são à vontade."],
  },
  {
    id: "pratos",
    label: "Pratos",
    cover: photos.oswaldo,
  },
  {
    id: "rango-da-semana",
    label: "Rango da semana",
    intro: "Pratos servidos de segunda a sexta, até às 16h.",
    cover: photos.pf,
  },
  {
    id: "sandubas",
    label: "Sandubas",
    notes: ["Acompanham batata chips."],
  },
  { id: "paes-de-alho", label: "Pães de alho" },
  { id: "porcoes", label: "Frituras e porções" },
  {
    id: "acompanhamentos",
    label: "Monte do seu jeito",
    intro: "Acompanhamentos para montar a mesa.",
  },
  { id: "sobremesas", label: "Sobremesas" },
  {
    id: "cervejas",
    label: "Chope e cerveja",
    intro: "Cerveja bem gelada é o forte da casa.",
  },
  {
    id: "coqueteis",
    label: "Coquetéis",
    intro: "Coquetéis especiais com consultoria do Alê D'Agostino.",
    notes: ["Vinho: consulte as opções, escolhidas a dedo."],
    cover: photos.coquetel,
  },
  {
    id: "cachacas",
    label: "Cachaças",
    intro: "Doses de cachaças especiais.",
  },
  {
    id: "sem-alcool",
    label: "Sem álcool",
    notes: ["Água fresca do filtro de barro é sempre à vontade."],
    cover: photos.cha,
  },
];

export const menuItems: MenuItem[] = [
  // Churrasco do seu jeito
  { id: "churrasco-picanha", category: "churrasco", name: "Picanha", description: "Aprox. 403g", price: 127, image: photos.picanha, available: true, featured: true },
  { id: "churrasco-bife-ancho", category: "churrasco", name: "Bife Ancho", description: "Aprox. 403g", price: 112, available: true },
  { id: "churrasco-linguica", category: "churrasco", name: "Linguiça toscana artesanal", description: "Aprox. 403g", price: 73, available: true },
  { id: "churrasco-fraldinha-red", category: "churrasco", name: "Fraldinha Red", description: "Aprox. 403g", price: 127, available: true },
  { id: "churrasco-frango-tv", category: "churrasco", name: "Frango assado na TV de cachorro", price: 63, available: true, availability: "Servido aos domingos" },

  // Espetos
  { id: "espeto-picanha", category: "espetos", name: "Picanha", price: 27, available: true, featured: true },
  { id: "espeto-carne", category: "espetos", name: "Carne", price: 20, available: true },
  { id: "espeto-kafta", category: "espetos", name: "Kafta", price: 19, available: true },
  { id: "espeto-fraldinha", category: "espetos", name: "Fraldinha", price: 27, available: true },
  { id: "espeto-linguica", category: "espetos", name: "Linguiça artesanal", price: 20, available: true },
  { id: "espeto-misto", category: "espetos", name: "Misto", description: "Carne, linguiça, frango, cebola e pimentão intercalados", price: 18, available: true },
  { id: "espeto-frango", category: "espetos", name: "Frango", price: 17, available: true },
  { id: "espeto-coracao", category: "espetos", name: "Coração", price: 17, available: true },
  { id: "espeto-queijo", category: "espetos", name: "Queijo coalho", description: "De verdade!", price: 18, available: true },
  { id: "espeto-milho", category: "espetos", name: "Milho", price: 15, available: true },

  // Pratos
  { id: "prato-oswaldo-aranha", category: "pratos", name: "Filé Oswaldo Aranha", description: "Dos botecos cariocas para o Ripa na Xulipa: bife Ancho assado na brasa caprichado no alho frito, acompanhado de batatas chips, arroz e farofa", price: 59, image: photos.oswaldo, available: true, featured: true },
  { id: "prato-parmegiana", category: "pratos", name: "Parmegiana", description: "Com molho de tomate caseiro, acompanha arroz branco e batata chips da casa", variants: [{ label: "Carne", price: 51 }, { label: "Frango", price: 45 }], image: photos.parmegiana, available: true },

  // Rango da semana
  { id: "rango-pf", category: "rango-da-semana", name: "PF do Ripa", description: "Arroz, feijão, farofa, vinagrete, salada (já temperada) e DOIS espetos à sua escolha (exceto picanha e fraldinha)", price: 48, image: photos.pf, available: true, availability: "Seg. a sex., até 16h", featured: true },
  { id: "rango-milanesa", category: "rango-da-semana", name: "Milanesa", description: "Acompanha arroz e feijão", variants: [{ label: "Carne", price: 38 }, { label: "Frango", price: 35 }], available: true, availability: "Seg. a sex., até 16h" },

  // Sandubas
  { id: "sanduba-xulipao", category: "sandubas", name: "Xulipão de frango", description: "Baguete caprichada na pasta de alho, frango, queijo coalho e vinagrete", price: 40, available: true, featured: true },
  { id: "sanduba-x-churrasco", category: "sandubas", name: "O clássico X-Churrasco", description: "Baguete, bife Ancho, queijo, tomate, alface e maionese da casa", price: 44, available: true },
  { id: "sanduba-choripao", category: "sandubas", name: "Choripão", description: "Baguete, linguiça toscana, maionese e vinagrete", price: 39, available: true },

  // Pães de alho
  { id: "pao-tradicional", category: "paes-de-alho", name: "Tradicional", description: "Feito aqui com baguete fresquinha e pasta de alho caseira", price: 17, available: true },
  { id: "pao-tomate", category: "paes-de-alho", name: "De tomate", description: "Nosso pão de alho com tomate assado", price: 19, available: true },
  { id: "pao-beringela", category: "paes-de-alho", name: "De beringela", description: "Versão para os veggies e não veggies: com bastante alho e pasta de beringela", price: 19, available: true },
  { id: "pao-recheado", category: "paes-de-alho", name: "Recheado com linguiça e queijo", description: "Pão de alho recheado com linguiça artesanal e queijo coalho", price: 32, available: true },

  // Frituras e porções
  { id: "porcao-torresmo", category: "porcoes", name: "Torresmo de rolo", price: 30, available: true },
  { id: "porcao-mandioca", category: "porcoes", name: "Mandioca frita", price: 25, available: true },
  { id: "porcao-batata", category: "porcoes", name: "Batata chips", price: 25, available: true },
  { id: "porcao-coxinha-frango", category: "porcoes", name: "Coxinha de frango", description: "4 unidades", price: 36, available: true },
  { id: "porcao-bolinho-porco", category: "porcoes", name: "Bolinho de porco defumado", description: "4 unidades", price: 40, available: true },
  { id: "porcao-coxinha-cogumelos", category: "porcoes", name: "Coxinha de cogumelos", description: "6 unidades", price: 40, available: true },
  { id: "porcao-pastel", category: "porcoes", name: "Pastel", description: "8 unidades", variants: [{ label: "Carne", price: 34 }, { label: "Queijo", price: 34 }, { label: "Misto", price: 34 }], available: true },
  { id: "porcao-legumes", category: "porcoes", name: "Legumes na brasa", price: 23, available: true },
  { id: "porcao-baguete", category: "porcoes", name: "Baguete fatiado", price: 7, available: true },

  // Monte do seu jeito
  { id: "acomp-arroz-brocolis", category: "acompanhamentos", name: "Arroz de brócolis", price: 22, available: true },
  { id: "acomp-arroz", category: "acompanhamentos", name: "Arroz", price: 18, available: true },
  { id: "acomp-feijao", category: "acompanhamentos", name: "Feijão", price: 18, available: true },
  { id: "acomp-pao-alho", category: "acompanhamentos", name: "Pão de alho caseiro", price: 17, available: true },
  { id: "acomp-farofa", category: "acompanhamentos", name: "Farofa", price: 7, available: true },
  { id: "acomp-vinagrete", category: "acompanhamentos", name: "Vinagrete", price: 7, available: true },
  { id: "acomp-legumes", category: "acompanhamentos", name: "Legumes na brasa", price: 23, available: true },
  { id: "acomp-saladona", category: "acompanhamentos", name: "Saladona da casa", price: 18, available: true },
  { id: "acomp-batata-chips", category: "acompanhamentos", name: "Batata chips", price: 25, available: true },
  { id: "acomp-mandioca", category: "acompanhamentos", name: "Mandioca frita", price: 25, available: true },
  { id: "acomp-pao-frances", category: "acompanhamentos", name: "Pão francês fatiado", price: 7, available: true },
  { id: "acomp-batata-bolinha", category: "acompanhamentos", name: "Batata bolinha", price: 11, available: true, availability: "Aos domingos" },

  // Sobremesas
  { id: "sobremesa-pudim", category: "sobremesas", name: "Pudim de leite condensado", description: "Delicioso. Igual da sua avó", price: 16, available: true },
  { id: "sobremesa-brigadeiro", category: "sobremesas", name: "Brigadeiro de colher", price: 13, available: true },

  // Chope e cerveja
  { id: "chope-ipa", category: "cervejas", name: "Chope artesanal IPA", description: "Da Tarantino, cervejaria da zona norte de São Paulo", variants: [{ label: "300ml", price: 23 }, { label: "450ml", price: 32 }], available: true, featured: true },
  { id: "chope-lager", category: "cervejas", name: "Chope artesanal Lager", description: "Da Tarantino, cervejaria da zona norte de São Paulo", variants: [{ label: "300ml", price: 16 }, { label: "450ml", price: 23 }], available: true },
  { id: "garrafa-heineken", category: "cervejas", name: "Heineken", description: "Garrafa 600ml", price: 23, available: true },
  { id: "garrafa-original", category: "cervejas", name: "Original", description: "Garrafa 600ml", price: 22, available: true },
  { id: "garrafa-amstel", category: "cervejas", name: "Amstel", description: "Garrafa 600ml", price: 17, available: true },
  { id: "long-heineken-zero", category: "cervejas", name: "Heineken 0.0", description: "Long neck", price: 17, available: true },
  { id: "long-stella", category: "cervejas", name: "Stella (sem glúten)", description: "Long neck", price: 17, available: true },
  { id: "long-corona", category: "cervejas", name: "Corona", description: "Long neck", price: 17, available: true },

  // Coquetéis
  { id: "coquetel-caipirinha", category: "coqueteis", name: "Caipirinha tradicional", description: "Montada como deve ser, com cachaça, limão, açúcar e gelo", price: 30, available: true },
  { id: "coquetel-dois-limoes", category: "coqueteis", name: "Caipirinha dois limões", description: "Feita com cachaça, limão taiti e limão siciliano, rapadura e gelo", price: 34, available: true },
  { id: "coquetel-macunaima", category: "coqueteis", name: "Macunaíma", description: "Clássico moderno da coquetelaria brasileira, criado no bar Boca de Ouro, leva cachaça especial, Fernet, suco de limão e xarope de açúcar. Servido no copo pequeno, sem gelo, mas bem gelado", price: 30, available: true },
  { id: "coquetel-jorge-amado", category: "coqueteis", name: "Jorge Amado", description: "De Paraty para o Ripa na Xulipa: é feito com cachaça paratiana Gabriela (de cravo e canela), limão, maracujá e xarope de açúcar. Servido no copo grande com gelo", price: 37, available: true, featured: true },
  { id: "coquetel-spritz", category: "coqueteis", name: "Spritz Amazônico", description: "Cachaça de jambu, Aperol, Campari, tônica, limão e xarope de açúcar", price: 36, available: true },
  { id: "coquetel-mate-adulto", category: "coqueteis", name: "Mate de adulto", description: "Nosso chá mate com limão, rum picante, tônica e xarope de açúcar", price: 35, available: true },
  { id: "classico-rabo-de-galo", category: "coqueteis", name: "Rabo de galo", description: "Clássico", price: 33, available: true },
  { id: "classico-negroni", category: "coqueteis", name: "Negroni", description: "Clássico", price: 34, available: true },
  { id: "classico-fitzgerald", category: "coqueteis", name: "Fitzgerald", description: "Clássico", price: 34, available: true },
  { id: "batidinha-coco", category: "coqueteis", name: "Batidinha de coco", price: 19, image: photos.batidinha, available: true },

  // Cachaças
  { id: "cachaca-gabriela", category: "cachacas", name: "Gabriela cravo e canela", description: "De Paraty", price: 20, available: true },
  { id: "cachaca-jambruna", category: "cachacas", name: "Jambruna", description: "Cachaça mineira com jambu da Amazônia", price: 20, available: true },
  { id: "cachaca-umburana", category: "cachacas", name: "Mato Dentro — Umburana", price: 18, available: true },
  { id: "cachaca-jequitiba", category: "cachacas", name: "Mato Dentro — Jequitibá Rosa", price: 18, available: true },
  { id: "cachaca-jaqueira", category: "cachacas", name: "Mato Dentro — Jaqueira", price: 18, available: true },
  { id: "cachaca-prata", category: "cachacas", name: "Mato Dentro (Prata)", price: 16, available: true },
  { id: "cachaca-seleta", category: "cachacas", name: "Seleta", price: 14, available: true },
  { id: "cachaca-regua", category: "cachacas", name: "Régua degustação", description: "4 versões de Mato Dentro", price: 60, available: true, featured: true },

  // Sem álcool
  { id: "sem-refresco", category: "sem-alcool", name: "Refresco da casa", description: "Deliciosa limonada com infusão de hibisco", price: 17, available: true },
  { id: "sem-cha-mate", category: "sem-alcool", name: "Chá mate com limão", description: "Batido na hora", price: 17, available: true },
  { id: "sem-suco", category: "sem-alcool", name: "Suco laranja ou limão", price: 17, available: true },
  { id: "sem-refri", category: "sem-alcool", name: "Refri", description: "Coca-Cola (é KS, de vidro!), Itubaína, guaraná e tônica", price: 10, available: true },
  { id: "sem-agua", category: "sem-alcool", name: "Água", description: "Com ou sem gás", price: 9, available: true },
  { id: "sem-cafe", category: "sem-alcool", name: "Café Nespresso", price: 9.5, available: true },
];

export const menuMeta = {
  title: "DA BRASA PRA MESA.",
  subtitle: "Descubra os sabores do Ripa.",
  disclaimer:
    "Itens e preços conforme o cardápio oficial publicado pela casa. Valores em reais, sujeitos a alteração — confirme no local ou no cardápio completo.",
};

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 });
}
