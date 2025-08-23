import { Banner } from "@/components/public/Banner";
import { LayoutPublic } from "@/components/public/Layout";

export default function PaginaMunicipios() {
  return (
    <LayoutPublic>
      <div className="container mx-auto py-8 px-4 md:px-16">
        <Banner titulo="Contate-nos" cor="bg-tourism-verde" />

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Formulário (primeiro no mobile, segundo no desktop) */}
          <form className="order-1 md:order-2 space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="nome"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-tourism-verde"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-tourism-verde"
                placeholder="Seu email"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="telefone"
              >
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-tourism-verde"
                placeholder="Seu telefone"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="assunto"
              >
                Assunto
              </label>
              <input
                type="text"
                id="assunto"
                className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-tourism-verde"
                placeholder="Assunto da mensagem"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="mensagem"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-tourism-verde"
                placeholder="Sua mensagem"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-tourism-verde text-white
                         rounded-md hover:bg-tourism-verde-escuro transition-colors"
            >
              Enviar
            </button>
          </form>

          {/* Informações (segundo no mobile, primeiro no desktop) */}
          <div className="order-2 md:order-1 space-y-4">
            <h1 className="text-2xl font-bold">Fale Conosco</h1>
            <p>
              📞 <span className="font-medium">Telefone:</span> (99) 9999-9999
            </p>
            <p>
              💬 <span className="font-medium">WhatsApp:</span> (99) 9999-9999
            </p>
            <p>
              ✉️ <span className="font-medium">Email:</span> contato@example.com
            </p>
            <p>
              📍 <span className="font-medium">Instagram:</span> @exemplo
            </p>
          </div>
        </main>
      </div>
    </LayoutPublic>
  );
}
