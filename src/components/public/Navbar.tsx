"use client";
import React, { useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X} from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"



export function Navbar() {
    const [ isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <nav>
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
                    <button>
                        
                    </button>
                </div>
            </div>
        </nav>
    );
}

