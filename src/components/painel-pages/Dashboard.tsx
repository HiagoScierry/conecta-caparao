"use client";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  useDash,
  useDashboardAtracoesPorMunicipio, 
  useDashboardProximosEventos, 
  useDashboardUltimasNoticias
} from "@/hooks/http/useDash";
import { MapPin, Compass, Calendar, Newspaper, Store } from "lucide-react";

export default function Dashboard() {
  const { data: stats } = useDash();
  const { data: atracoesPorMunicipio } = useDashboardAtracoesPorMunicipio();
  const { data: proximosEventos } = useDashboardProximosEventos(3);
  const { data: ultimasNoticias } = useDashboardUltimasNoticias(3);

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
          value={stats?.municipios || 0}
          icon={<MapPin className="h-4 w-4" />}
          className="bg-tourism-light border-tourism-primary/20"
        />
        <StatCard 
          title="Atrações"
          value={stats?.atracoes || 0}
          icon={<Compass className="h-4 w-4" />}
        />
        <StatCard 
          title="Eventos"
          value={stats?.eventos || 0}
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard 
          title="Notícias"
          value={stats?.noticias || 0}
          icon={<Newspaper className="h-4 w-4" />}
        />
        <StatCard 
          title="Serviços Turísticos"
          value={stats?.servicos || 0}
          icon={<Store className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Atrações Turísticas por Município</CardTitle>
            <CardDescription>
              Distribuição de atrações turísticas por município
            </CardDescription>
          </CardHeader>
          <CardContent>
            {atracoesPorMunicipio && atracoesPorMunicipio.length > 0 ? (
              <div className="space-y-3">
                {atracoesPorMunicipio.slice(0, 6).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <MapPin className="h-4 w-4" style={{ color: '#2563EB' }} />
                      </div>
                      <span className="font-medium">{item.municipio}</span>
                    </div>
                    <span className="text-lg font-bold" style={{ color: '#2563EB' }}>
                      {item.quantidade}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Carregando dados...</p>
              </div>
            )}
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
              {ultimasNoticias && ultimasNoticias.length > 0 ? (
                ultimasNoticias.map((noticia) => (
                  <div key={noticia.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <h3 className="font-medium">{noticia.titulo}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {noticia.resumo}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">Nenhuma notícia encontrada</p>
              )}
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
              {proximosEventos && proximosEventos.length > 0 ? (
                proximosEventos.map((evento) => (
                  <div key={evento.id} className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded">
                      <Calendar className="h-4 w-4" style={{ color: '#2563EB' }} />
                    </div>
                    <div>
                      <p className="font-medium">{evento.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(evento.data).toLocaleDateString('pt-BR')}, {evento.municipio}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">Nenhum evento próximo encontrado</p>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
