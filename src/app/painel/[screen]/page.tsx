"use client";

import Head from "next/head";
import { useEffect, useMemo } from "react";
import Atracoes from "@/components/pages/Atracoes";
import Configuracoes from "@/components/pages/Configuracoes";
import Dashboard from "@/components/pages/Dashboard";
import Eventos from "@/components/pages/Eventos";
import Municipios from "@/components/pages/Municipios";
import NotFound from "@/components/pages/NotFound";
import Noticias from "@/components/pages/Noticias";
import Servicos from "@/components/pages/Servicos";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  const screens = useMemo(() => [
    { name: "dashboard", Component: Dashboard },
    { name: "municipios", Component: Municipios },
    { name: "atracoes", Component: Atracoes },
    { name: "eventos", Component: Eventos },
    { name: "noticias", Component: Noticias },
    { name: "servicos", Component: Servicos },
    { name: "configuracoes", Component: Configuracoes },
  ], []);

  const currentScreen = useMemo(() => {
    return screens.find((s) => s.name === params.screen);
  }, [params.screen, screens]);

  const formattedTitle = currentScreen
    ? `Painel - ${capitalize(currentScreen.name)}`
    : "Painel - 404";

  useEffect(() => {
    document.title = formattedTitle;
  }, [formattedTitle]);
  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        <meta
          name="description"
          content="Painel de controle para gerenciar o sistema"
        />
      </Head>
      {currentScreen ? (
        <currentScreen.Component />
      ) : (
        <NotFound />
      )}
    </>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
