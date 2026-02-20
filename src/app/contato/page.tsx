import { Banner } from "@/components/public/Banner";
import { LayoutPublic } from "@/components/public/Layout";
import { Section } from "@/components/public/Section";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function PaginaMunicipios() {
  return (
    <LayoutPublic>
      <Section bgClass="bg-gradient-menta">
        <div className="container mx-auto py-16 px-8  md:px-16 ">
          <Banner titulo="Contate-nos" cor="bg-tourism-marinho" />

          <main className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 w-full">
            {/* Formulário (primeiro no mobile, segundo no desktop) */}
            <form className="w-full order-1 md:order-2 space-y-4">
              <div>
                <label className="sr-only" htmlFor="nome">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full px-4 py-3 border text-tourism-cinza placeholder:text-tourism-cinza border-gray-300 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-tourism-marinho bg-white/50"
                  placeholder="Nome Completo"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border text-tourism-cinza placeholder:text-tourism-cinza border-gray-300 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-tourism-marinho bg-white/50"
                  placeholder="E-mail"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="telefone">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  className="w-full px-4 py-3 border text-tourism-cinza placeholder:text-tourism-cinza border-gray-300 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-tourism-marinho bg-white/50"
                  placeholder="Telefone"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="assunto">
                  Assunto
                </label>
                <input
                  type="text"
                  id="assunto"
                  className="w-full px-4 py-3 border text-tourism-cinza placeholder:text-tourism-cinza border-gray-300 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-tourism-marinho bg-white/50"
                  placeholder="Assunto"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="mensagem">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  className="w-full px-4 py-3 border text-tourism-cinza placeholder:text-tourism-cinza border-gray-300 rounded-md
                          focus:outline-none focus:ring-2 focus:ring-tourism-marinho bg-white/50"
                  placeholder="Mensagem"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-tourism-marinho text-white rounded-md hover:bg-tourism-marinho/80 hover:shadow-lg transition-colors"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>

            {/* Informações (segundo no mobile, primeiro no desktop) */}
            <div className="w-full order-2 md:order-1 space-y-4">
              <h1 className="font-title text-4xl text-tourism-marinho font-bold">
                Fale Conosco
              </h1>
              <p>
                <span>
                  <FiPhone className="w-5 h-5 inline mr-2" />
                </span>{" "}
                (99) 9999-9999
              </p>
              <p>
                <span>
                  <FaWhatsapp className="w-5 h-5 inline mr-2" />
                </span>{" "}
                (99) 9999-9999
              </p>
              <p>
                <span>
                  <FiMail className="w-5 h-5 inline mr-2" />
                </span>{" "}
                contato@example.com
              </p>
              <p>
                <span>
                  <FaInstagram className="w-5 h-5 inline mr-2" />
                </span>
                <span>
                  <FaFacebook className="w-5 h-5 inline mr-2" />
                </span>
              </p>
            </div>
          </main>
        </div>
      </Section>
    </LayoutPublic>
  );
}
