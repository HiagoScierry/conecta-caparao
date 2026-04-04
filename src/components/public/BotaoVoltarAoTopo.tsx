"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
export function BotaoVoltarAoTopo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    const scrollListenerOptions = { passive: true };

    window.addEventListener("scroll", toggleVisibility, scrollListenerOptions);

    return () =>
      window.removeEventListener("scroll", toggleVisibility, scrollListenerOptions);
  }, []);

  // Função para subir a página suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 bg-tourism-verde text-white rounded-full shadow-xl hover:bg-tourism-verde/80 hover:-translate-y-1 transition-all duration-300"
      aria-label="Voltar ao topo da página"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
