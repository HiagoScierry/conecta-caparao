import { useState } from "react";
import { MapPin, AlertTriangle } from "lucide-react";

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
  if (!url || typeof url !== 'string') return false;
  
  const googleMapsPatterns = [
    /^https:\/\/(www\.)?google\.com\/maps/,
    /^https:\/\/(www\.)?maps\.google\.com/,
    /^https:\/\/(www\.)?google\.[a-z]{2,}\/maps/,
    /^https:\/\/maps\.app\.goo\.gl/,
    /embed\?pb=/i
  ];
  
  return googleMapsPatterns.some(pattern => pattern.test(url));
}

export function Informacoes({contato: {telefone, email, site }, mapa}: Props) {
  const [mapError, setMapError] = useState(false);
  const isValidMap = mapa ? isValidGoogleMapsUrl(mapa) : false;

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between lg:gap-48 lg:px-20 gap-8 p-8 mt-8">
      <div className="order-1 md:order-1 flex-1 space-y-2 rounded-md">
        <div className="w-full bg-[#0096E180] rounded-sm overflow-hidden pb-2">
          <h2 className="text-2xl w-full font-bold bg-tourism-verde pl-2 mb-2">
            Informações
          </h2>
          <p className="pl-2">Telefone: {telefone}</p>
          <p className="pl-2">Email: {email}</p>
          <p className="pl-2">Site: {site}</p>
        </div>
      </div>

      {mapa && (
        <div className="order-2 md:order-2 flex-1">
          <div className="w-full h-96 bg-gray-200 rounded-sm overflow-hidden">
            <h2 className="text-2xl w-full font-bold bg-tourism-verde pl-2 mb-2 flex items-center gap-2">
              <MapPin size={20} />
              Mapa
            </h2>
            
            {!isValidMap || mapError ? (
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-600 p-4">
                <AlertTriangle size={48} className="text-amber-500 mb-3" />
                <p className="text-lg font-semibold mb-2">Mapa não disponível</p>
                <p className="text-sm text-center">
                  {!isValidMap 
                    ? "URL do mapa inválida ou não é do Google Maps"
                    : "Erro ao carregar o mapa"
                  }
                </p>
                {!isValidMap && mapa && (
                  <a 
                    href={mapa} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    Abrir link em nova aba
                  </a>
                )}
              </div>
            ) : (
              <iframe
                src={mapa}
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
      )}
    </div>
  );
}
