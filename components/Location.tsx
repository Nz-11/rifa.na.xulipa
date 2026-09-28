"use client";

import { ArrowUpRight, MapPin, Navigation, Phone, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { maps, site } from "@/data/site";
import { MaskedLines, Reveal, SectionLabel, StrikeLine } from "./ui";

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  // O iframe do Google Maps só é carregado quando a seção se aproxima da tela
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="localizacao" aria-labelledby="location-title" className="bg-ink py-24 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 sm:px-6 md:grid-cols-12 md:gap-10 lg:px-10">
        <div className="md:col-span-6 lg:col-span-5">
          <SectionLabel index="06">Localização</SectionLabel>
          <h2 id="location-title" className="display mt-6 text-[clamp(3rem,7vw,7.5rem)]">
            <MaskedLines lines={["Te esperamos", <span key="r" className="text-sky">no Ripa.</span>]} />
          </h2>
          <StrikeLine className="mt-5 w-1/2" />

          <Reveal>
            <address className="mt-12 not-italic">
              <p className="flex items-start gap-3">
                <MapPin className="mt-1.5 size-5 shrink-0 text-pink" aria-hidden />
                <span>
                  <span className="display block text-4xl md:text-5xl">{site.address.street}</span>
                  <span className="mt-2 block text-lg text-paper/70">
                    {site.address.district} — {site.address.city}, {site.address.state}
                  </span>
                  <span className="block text-sm text-mute">CEP {site.address.postalCode}</span>
                </span>
              </p>

              {site.contact.phoneDisplay && (
                <p className="mt-6 flex items-center gap-3">
                  <Phone className="size-5 shrink-0 text-pink" aria-hidden />
                  <a href={site.contact.phoneHref} className="text-lg font-semibold hover:text-cyan">
                    {site.contact.phoneDisplay}
                  </a>
                </p>
              )}

              {site.openingHours.length > 0 && (
                <div className="mt-6 flex items-start gap-3">
                  <Clock className="mt-1 size-5 shrink-0 text-pink" aria-hidden />
                  <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                    {site.openingHours.map((h) => (
                      <div key={h.days} className="contents">
                        <dt className="font-semibold">{h.days}</dt>
                        <dd className="text-paper/70">{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </address>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={maps.directions} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Navigation className="size-4" aria-hidden />
              Traçar rota
              <span className="sr-only">(abre o Google Maps em nova aba)</span>
            </a>
            <a href={maps.search} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Abrir no Google Maps
              <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </Reveal>
        </div>

        <div className="md:col-span-6 lg:col-span-7">
          <div ref={mapRef} className="group relative aspect-[4/5] w-full overflow-hidden bg-char sm:aspect-[4/3] md:aspect-[4/5] lg:aspect-[5/4]">
            {showMap ? (
              <iframe
                title={`Mapa: ${site.name}, ${site.address.street}, ${site.address.district}`}
                src={maps.embed}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.85] contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-mute">
                <MapPin className="size-10 animate-pulse text-pink" aria-hidden />
                <span className="sr-only">Carregando mapa…</span>
              </div>
            )}
            <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-1 w-24 bg-pink" />
            <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-24 w-1 bg-cyan" />
          </div>
        </div>
      </div>
    </section>
  );
}
