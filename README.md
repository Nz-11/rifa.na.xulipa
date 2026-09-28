# Ripa na Xulipa — site oficial

Site do Ripa na Xulipa (Assado na Rua), desenvolvido por Cezario's.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run typecheck  # verificação de TypeScript
npm run build      # build de produção
npm start          # servir o build
```

Defina `NEXT_PUBLIC_SITE_URL` (ex.: `https://www.ripanaxulipa.com.br`) no deploy para ativar a URL canônica e as URLs absolutas do Open Graph.

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Endereço, telefone, WhatsApp, horário, links, vídeo da abertura | `data/site.ts` |
| Cardápio (categorias, itens, preços, fotos, disponibilidade) | `data/menu.ts` |
| Galeria e imagens da seção do Instagram | `data/gallery.ts` |
| Eventos com data e experiências fixas | `data/events.ts` |

Campos vazios ficam ocultos no site: `openingHours: []` esconde o horário, `whatsapp: ""` esconde todos os botões de WhatsApp e `upcomingEvents: []` mostra só as experiências fixas.

## Origem do conteúdo

- **Logo:** arquivo enviado pelo cliente (`assets/original/logo-original.jfif`), convertido sem alterações para `public/images/logo-ripa-na-xulipa.png`.
- **Cardápio, preços e fotos dos pratos:** vêm do cardápio oficial em PDF, vinculado no Linktree (`assets/original/cardapio-oficial.pdf`). As fotos foram extraídas desse PDF.
- **Telefone/WhatsApp (11) 3815-9555 e link de delivery:** vêm do Linktree oficial e do cardápio.
- **Vídeo da abertura** (`public/videos/hero-video*.mp4`): montagem com as fotos oficiais. Para trocar pelo vídeo da casa (brasa, churrasqueira, laje), basta manter os nomes dos arquivos ou mudar os caminhos em `data/site.ts`. Use H.264 MP4, sem áudio, com até cerca de 3 MB.
- **Instagram:** não há integração com a API nem scraping. As imagens da seção são configuráveis e levam ao perfil oficial. Para uma integração futura com a Instagram Graph API, basta trocar `instagramFeed` por dados no mesmo formato.

## Pendências para o cliente confirmar

- Horário de funcionamento.
- Programação de eventos (datas e atrações).
- E-mail de contato (opcional).
- Vídeo e fotos próprias da churrasqueira e do ambiente, para ampliar a galeria.
- Conferir os preços do PDF antes de publicar.
