export function Informacoes({contato: {telefone, email, site }, mapa}: {contato: {telefone: string; email: string; site: string;}; mapa?: string}) {
  return (
    <div className="flex flex-col md:flex-row justify-between lg:gap-48 lg:px-20 gap-8 p-8 mt-8">
      <div className="order-1 md:order-1 flex-1 space-y-2 rounded-md">
        <div className="w-full  bg-[#0096E180] rounded-sm overflow-hidden pb-2">
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
          <h2 className="text-2xl w-full font-bold bg-tourism-verde pl-2 mb-2">
            Mapa
          </h2>
          <iframe
            src={mapa}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      )}
    </div>
  );
}
