"use client";
import { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-6 max-w-md">
        <div className="w-24 h-24 rounded-full bg-tourism-light flex items-center justify-center mx-auto mb-6">
          <Compass className="h-12 w-12 text-tourism-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-2 text-tourism-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8">
          Parece que você se perdeu no caminho. A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="bg-tourism-primary">
          <Link href={"/painel/dashboard"} className="text-white">
            Voltar ao Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
