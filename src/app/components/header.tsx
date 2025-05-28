"use client";
import { useState } from "react";
import {FaBars, FaXmark} from "react-icons/fa6";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-azul-claro border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-20 py-4 flex justify-between items-center">
        <span className="grid h-16 w-auto min-w-[8rem] place-content-center px-2">
          <img src="/Logomarca.svg" alt="Logo" className="h-20 w-auto" />
        </span>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-azul-claro text-azul-claro rounded-lg p-2"
            aria-label="Abrir menu" 
            aria-expanded={isMenuOpen} 
          >
            {isMenuOpen ? <FaXmark className="h-8 w-8 text-branco" /> : <FaBars className="h-8 w-8 text-branco" />}
          </button>
        </div>
        <nav
          className={`
            ${isMenuOpen ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto
            w-full lg:static absolute top-24 left-0 bg-white lg:bg-transparent shadow-lg lg:shadow-none rounded-b-lg lg:rounded-none p-4 lg:p-0 z-40
          `}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0">
            <li>
              <Link
                href="/municipios"
                className="block rounded-lg lg:bg-transparent px-4 py-2 text-lg font-bold text-azul-claro lg:text-branco hover:text-cinza-rochoso text-center font-montserrat border-b border-gray-200 lg:border-0"
              >
                Municípios
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-lg font-bold text-azul-claro lg:text-branco hover:text-cinza-rochoso text-center font-montserrat border-b border-gray-200 lg:border-0"
              >
                Atrativos
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-lg font-bold text-azul-claro lg:text-branco hover:text-cinza-rochoso text-center font-montserrat border-b border-gray-200 lg:border-0"
              >
                Noticias
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-lg font-bold text-azul-claro lg:text-branco hover:text-cinza-rochoso text-center font-montserrat border-b border-gray-200 lg:border-0"
              >
                Eventos
              </Link>
            </li><li>
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-lg font-bold text-azul-claro lg:text-branco hover:text-cinza-rochoso text-center font-montserrat lg:border-0"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
