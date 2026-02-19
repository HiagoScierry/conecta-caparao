"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Municípios", href: "/municipios" },
    { label: "Atrativos", href: "/atrativos" },
    { label: "Notícias", href: "/noticias" },
    { label: "Eventos", href: "/eventos" },
    { label: "Cultura", href: "/cultura" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <nav className="relative top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 md:px-12 lg:px-20 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Logomarca.svg"
            alt="Logo Turismo Caparaó"
            width={60}
            height={60}
            className="md:w-[70px] md:h-[70px]"
          />
        </Link>

        {/* Menu Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={`font-medium text-base transition-all px-5 py-2.5 rounded-lg ${
                        isActive
                          ? "bg-tourism-cinzaescuro text-white shadow-md ring-2 ring-tourism-cinzaescuro/50"
                          : "text-tourism-cinzaescuro hover:font-bold"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Menu Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-tourism-marinho focus:outline-none p-2 transition-transform duration-300"
            aria-label="Abrir ou fechar menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div
            className={`
              absolute top-full left-0 w-full bg-white shadow-lg z-50 flex flex-col
              transition-all duration-300 ease-in-out
              ${isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
            `}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium py-4 px-6 border-b border-gray-100 transition-colors ${
                    isActive
                      ? "bg-tourism-cinzaescuro text-white shadow-md"
                      : "text-tourism-cinzaescuro hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

