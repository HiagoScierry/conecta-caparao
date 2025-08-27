"use client";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDash } from "@/hooks/http/useDash";
import { MapPin, Compass, Calendar, Newspaper, Store, Users } from "lucide-react";

export default function Dashboard() {
  // Dados fictícios para demonstração
  const {
    data: stats,
  } = useDash();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do portal de turismo digital.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard 
          title="Municípios"
          value={stats?.municipios | 0}
          icon={<MapPin className="h-4 w-4" />}
          className="bg-tourism-light border-tourism-primary/20"
        />
        <StatCard 
          title="Atrações"
          value={stats?.atracoes | 0}
          icon={<Compass className="h-4 w-4" />}
        />
        <StatCard 
          title="Eventos"
          value={stats?.eventos | 0}
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard 
          title="Notícias"
          value={stats?.noticias | 0}
          icon={<Newspaper className="h-4 w-4" />}
        />
        <StatCard 
          title="Serviços Turísticos"
          value={stats?.servicos | 0}
          icon={<Store className="h-4 w-4" />}
        />
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Atrações Turísticas por Município</CardTitle>
            <CardDescription>
              Distribuição de atrações turísticas por município
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Gráfico de barras aqui</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>
              Eventos programados para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded">
                    <Calendar className="h-4 w-4 text-tourism-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Festival Cultural</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString()}, Município {i}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Últimas Notícias</CardTitle>
            <CardDescription>
              Notícias publicadas recentemente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                  <h3 className="font-medium">Notícia importante sobre turismo {i}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod 
                    nunc non risus finibus, at viverra neque gravida.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Serviços Populares</CardTitle>
            <CardDescription>
              Serviços turísticos mais buscados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/10 p-2 rounded">
                      <Store className="h-4 w-4 text-tourism-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">Serviço Turístico {i}</p>
                      <p className="text-xs text-muted-foreground">Município {i}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{Math.floor(Math.random() * 1000)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
