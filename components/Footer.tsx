import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navItems, site, whatsappLink } from "@/data/site";
import { InstagramIcon, Logo, WhatsAppIcon } from "./ui";

export default function Footer() {
  const wa = whatsappLink();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink pt-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size={120} />
            <p className="display mt-6 text-4xl">{site.name}</p>
            <p className="mt-2 text-paper/60">{site.bio}.</p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-2">
            <p className="eyebrow text-mute">Navegue</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="font-semibold text-paper/80 hover:text-cyan">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow text-mute">Endereço</p>
            <address className="mt-5 not-italic leading-relaxed text-paper/80">
              {site.address.street}
              <br />
              {site.address.district} — {site.address.city}, {site.address.state}
              <br />
              CEP {site.address.postalCode}
            </address>
            {site.contact.phoneDisplay && (
              <a href={site.contact.phoneHref} className="mt-4 block font-semibold text-paper hover:text-cyan">
                {site.contact.phoneDisplay}
              </a>
            )}
            {site.contact.email && (
              <a href={`mailto:${site.contact.email}`} className="mt-2 block text-paper/80 hover:text-cyan">
                {site.contact.email}
              </a>
            )}
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-mute">Redes</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-paper/80 hover:text-cyan">
                  <InstagramIcon className="size-4" /> Instagram
                </a>
              </li>
              <li>
                <a href={site.links.linktree} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-paper/80 hover:text-cyan">
                  <ArrowUpRight className="size-4" aria-hidden /> Linktree
                </a>
              </li>
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-paper/80 hover:text-cyan">
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <p aria-hidden className="display pointer-events-none mt-20 select-none whitespace-nowrap text-center text-[13vw] leading-[0.8] text-paper/[0.04] lg:text-[13rem]">
          Assado na rua
        </p>

        <div className="flex flex-col gap-6 border-t border-paper/10 pb-24 pt-8 text-sm text-mute md:flex-row md:pr-20 md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs tracking-[0.12em]">
            Desenvolvido por{" "}
            {site.credits.studioUrl ? (
              <a href={site.credits.studioUrl} target="_blank" rel="noopener noreferrer" className="text-paper/70 hover:text-cyan">
                {site.credits.studio}
              </a>
            ) : (
              <span className="text-paper/70">{site.credits.studio}</span>
            )}
          </p>
          <a href="#inicio" className="inline-flex min-h-11 items-center gap-2 self-start font-bold uppercase tracking-[0.18em] text-paper hover:text-cyan md:self-auto">
            Voltar ao topo
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
