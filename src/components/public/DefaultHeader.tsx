"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DefaultHeaderProps {
  titulo: string;
  imagemUrl: string;
  linkHref: string;
  linkText: string;
  linkStyle?: "text" | "button";
}

export function DefaultHeader({ titulo, imagemUrl, linkHref, linkText, linkStyle = "text" }: DefaultHeaderProps) {
  const altText = `Imagem para a publicação: ${titulo}`;

  return (
    <Card className="w-full md:w-3/4 mx-4 h-fit overflow-hidden border-2 border-tourism-verde-escuro shadow-lg bg-white">
      {/* Imagem */}
      <div className="relative w-full h-48 md:h-96">
        <Image
          src={imagemUrl}
          alt={altText}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="text-base font-bold text-gray-800 leading-tight">
          {titulo}
        </h3>
        <div className="mt-4">
          {linkStyle === "text" ? (
            <a href={linkHref} className="text-tourism-verde-escuro font-semibold flex items-center space-x-1 hover:underline">
              <span>{linkText}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 12h-11m0 0l4-4m-4 4l4 4" />
              </svg>
            </a>
          ) : (
            <Button asChild className="w-full bg-tourism-verde text-white hover:bg-tourism-verde-escuro transition-colors duration-300">
              <a href={linkHref}>
                {linkText}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
