"use client";
import React, { useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { Ghost, Icon, Menu, X} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


export function Navbar() {
    const [ isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <nav className="relative top-0 z-50">
            <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-4 bg-tourism-azul border-b">
                <div>
                    <Image src="/Logomarca.svg" alt="Logo Turismo Caparaó" width={80} height={80}></Image>
                </div>
                <div>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="flex gap-4 md:gap-6 lg:gap-12">
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link href="/" className="text-tourism-branco font-bold text-lg hover:text-tourism-rosa transition-colors">
                                        Início
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link href="/" className="text-tourism-branco font-medium text-lg hover:text-tourism-rosa transition-colors">
                                        Municípios
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link href="/" className="text-tourism-branco font-medium text-lg hover:text-tourism-rosa transition-colors">
                                        Atrativos
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link href="/" className="text-tourism-branco font-medium text-lg hover:text-tourism-rosa transition-colors">
                                        Noticias
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link href="/" className="text-tourism-branco font-medium text-lg hover:text-tourism-rosa transition-colors">
                                        Eventos
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Link href="/" className="text-tourism-branco font-medium text-lg hover:text-tourism-rosa transition-colors">
                                        Contato
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            
                {/* Menu para Mobile */}
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
                        <div className="w-full">
                            <div className="border-b border-tourism-rosa">
                                <Link href="/municipios" className="text-tourism-azul text-2xl font-medium py-4 w-full block text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                Municípios
                                </Link>
                            </div>
                            <div className="border-b border-tourism-rosa">
                                <Link href="/atrativos" className="text-tourism-azul text-2xl font-medium py-4 w-full block text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                Atrativos
                                </Link>
                            </div>
                            <div className="border-b border-tourism-rosa">
                                <Link href="/noticias" className="text-tourism-azul text-2xl font-medium py-4 w-full block text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                Notícias
                                </Link>
                            </div>
                            <div className="border-b border-tourism-rosa">
                                <Link href="/eventos" className="text-tourism-azul text-2xl font-medium py-4 w-full block text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                Eventos
                                </Link>
                            </div>
                            <div className="border-b border-tourism-rosa">
                                <Link href="/contato" className="text-tourism-azul text-2xl font-medium py-4 w-full block text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                Contato
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </nav>
    );
}

