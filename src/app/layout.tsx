"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { useState, useEffect } from "react";
import Head from "next/head";
import { AuthProvider } from "@/hooks/auth-context";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // Suprimir warnings de hidratação causados por extensões do navegador
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Text content does not match server-rendered HTML')) {
        return;
      }
      if (typeof args[0] === 'string' && args[0].includes('Hydration failed because the initial UI does not match')) {
        return;
      }
      if (typeof args[0] === 'string' && args[0].includes('A tree hydrated but some attributes of the server rendered HTML')) {
        return;
      }
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Incaper - Guia do Caparaó</title>
        <meta name="description" content="Um guia completo do Parque Nacional do Caparaó, com informações sobre atrativos, eventos, notícias e muito mais." />
      </Head>
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
            <Toaster />
            <Sonner />
              {children}
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
