"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { useState } from "react";
import Head from "next/head";
import { AuthProvider } from "@/hooks/auth-context";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <Head>
        <title>Incaper - Guia do Caparaó</title>
        <meta name="description" content="Um guia completo do Parque Nacional do Caparaó, com informações sobre atrativos, eventos, notícias e muito mais." />
      </Head>
      <body>
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
