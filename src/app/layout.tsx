import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Incaper - Guia do Caparaó",
  description: "Um guia completo do Parque Nacional do Caparaó, com informações sobre atrativos, eventos, notícias e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
