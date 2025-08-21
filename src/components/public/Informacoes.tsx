export function Informacoes() {
  return (
    <div className="flex flex-col md:flex-row justify-between lg:gap-48 lg:px-20 gap-8 p-8 mt-8">
      <div className="order-1 md:order-1 flex-1 space-y-2 rounded-md">
        <div className="w-full  bg-[#0096E180] rounded-sm overflow-hidden pb-2">
          <h2 className="text-2xl w-full font-bold bg-tourism-verde pl-2 mb-2">
            Informações
          </h2>
          <p className="pl-2">Telefone: (99) 9999-9999</p>
          <p className="pl-2">Email: contato@example.com</p>
          <p className="pl-2">Site: www.exemplo.com</p>
        </div>
      </div>

      <div className="order-2 md:order-2 flex-1">
        <div className="w-full h-96 bg-gray-200 rounded-sm overflow-hidden">
          <h2 className="text-2xl w-full font-bold bg-tourism-verde pl-2 mb-2">
            Mapa
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1234567890123!2d-46.63330968412345!3d-23.55052012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c123456789%3A0x123456789abcdef0!2sSão%20Paulo%2C%20SP%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1610000000000!5m2!1spt-BR!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
