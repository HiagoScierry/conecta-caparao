"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useGetAllPrincipaisAtrativos } from "@/hooks/http/usePrincipaisAtrativos";
import { Skeleton } from "@/components/ui/skeleton";

export default function PrincipaisAtratizosDisplay() {
  const { data: response, isLoading } = useGetAllPrincipaisAtrativos();

  const principais = response?.principais || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    );
  }

  if (principais.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum principal atrativo cadastrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {principais
        .sort((a, b) => a.posicao - b.posicao)
        .map((item) => (
          <Card
            key={item.id}
            className="relative overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                <Star className="w-3 h-3 mr-1" />
                Posição {item.posicao}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">
                {item.atracaoTuristica.nome}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {item.atracaoTuristica.municipio?.nome || "Município não definido"}
              </p>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
