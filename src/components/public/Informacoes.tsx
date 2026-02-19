import { useMemo, useState } from "react";
import { MapPin, AlertTriangle, Phone, Mail, Globe } from "lucide-react";

type Props = {
  contato: {
    telefone: string;
    email: string;
    site: string;
  };
  mapa?: string;
};

/**
 * Valida se a URL é um mapa válido do Google Maps
 */
function isValidGoogleMapsUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }

  const googleMapsPatterns = [
    /^https:\/\/(www\.)?google\.com\/maps/,
    /^https:\/\/(www\.)?maps\.google\.com/,
    /^https:\/\/(www\.)?google\.[a-z]{2,}\/maps/,
    /^https:\/\/maps\.app\.goo\.gl/,
    /embed\?pb=/i,
  ];

  return googleMapsPatterns.some((pattern) => pattern.test(url));
}

export function Informacoes({ contato: { telefone, email, site }, mapa }: Props) {
  const [mapError, setMapError] = useState(false);

  const formattedSite = useMemo(() => {
    if (!site) {
      return "";
    }
    const withProtocol = site.startsWith("http") ? site : `https://${site}`;
    try {
      const url = new URL(withProtocol);
      return url.href;
    } catch {
      return site;
    }
  }, [site]);

  const safeMapUrl = useMemo(() => {
    if (!mapa) {
      return null;
    }
    return isValidGoogleMapsUrl(mapa) ? mapa : null;
  }, [mapa]);

  const handleMapError = () => setMapError(true);

  return (
    <section className="w-full bg-white py-12">
      <div className={`container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 gap-6 md:grid-cols-2`}>
        <div className="rounded-2xl shadow-md border border-tourism-menta/30 overflow-hidden w-full md:self-start">
          <div className="bg-tourism-marinho text-white px-5 py-3 text-sm font-semibold tracking-[0.3em] uppercase">
            Informações
          </div>
          <div className="p-5 space-y-3 text-tourism-cinza-escuro">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-tourism-marinho" />
              <span className="text-base font-semibold">
                {telefone || "Não informado"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-tourism-marinho" />
              {email ? (
                <a href={`mailto:${email}`} className="text-base font-semibold  underline-offset-4 hover:underline">
                  {email}
                </a>
              ) : (
                <span className="text-base font-semibold">Não informado</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-tourism-marinho" />
              {formattedSite ? (
                <a
                  href={formattedSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold underline-offset-4 hover:underline"
                >
                  {formattedSite.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                <span className="text-base font-semibold">Não informado</span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl shadow-md border border-tourism-menta/30 overflow-hidden">
          <div className="bg-tourism-marinho text-white px-5 py-3 text-sm font-semibold tracking-[0.3em] uppercase flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Mapa
          </div>
          <div className="h-64 bg-tourism-menta/20">
            {!safeMapUrl || mapError ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-tourism-cinza-escuro px-6">
                <AlertTriangle className="h-10 w-10 text-amber-500" />
                <p className="text-base font-semibold">Mapa não disponível</p>
                {mapa ? (
                  <a
                    href={mapa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-tourism-azul underline-offset-4 hover:underline"
                  >
                    Abrir no Google Maps
                  </a>
                ) : (
                  <span className="text-sm">Nenhum link fornecido.</span>
                )}
              </div>
            ) : (
              <iframe
                src={safeMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onError={handleMapError}
                title="Mapa de localização"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
