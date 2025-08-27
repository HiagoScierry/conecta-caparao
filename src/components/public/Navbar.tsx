"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Municípios", href: "/municipios" },
    { label: "Atrativos", href: "/atrativos" },
    { label: "Notícias", href: "/noticias" },
    { label: "Eventos", href: "/eventos" },
    { label: "Contato", href: "/contato" },
    { label: "Painel", href: "/entrar" },

  ];

  return (
    <nav className="relative top-0 z-50">
      <div className="flex items-center justify-between gap-2 px-6 md:px-12 lg:px-24 py-4 bg-tourism-azul border-b">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/Logomarca.svg"
            alt="Logo Turismo Caparaó"
            width={80}
            height={80}
          />
        </Link>

        {/* Menu Desktop */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-4 md:gap-6 lg:gap-12">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className="text-tourism-branco font-medium text-lg hover:text-tourism-rosa transition-colors"
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-tourism-branco focus:outline-none p-2 transition-transform duration-300"
            aria-label="Abrir ou fechar menu"
          >
            {isMobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
          </button>

          <div
            className={`
              absolute top-full left-0 w-full bg-tourism-branco z-50 flex flex-col items-center justify-center
              transition-all duration-300 ease-in-out
              ${isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
            `}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-tourism-azul text-2xl font-medium py-4 w-full block text-center border-b border-tourism-rosa"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
