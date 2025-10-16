"use client";

import Head from "next/head";
import { useEffect, useMemo } from "react";
import Atracoes from "@/components/painel-pages/Atracoes";
import Dashboard from "@/components/painel-pages/Dashboard";
import Eventos from "@/components/painel-pages/Eventos";
import Municipios from "@/components/painel-pages/Municipios";
import NotFound from "@/components/painel-pages/NotFound";
import Noticias from "@/components/painel-pages/Noticias";
import Usuarios from "@/components/painel-pages/Usuarios";
import Servicos from "@/components/painel-pages/Servicos";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/auth-context";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const route = useRouter();
  const params = useParams();

  const screens = useMemo(
    () => [
      { name: "dashboard", Component: Dashboard },
      { name: "municipios", Component: Municipios },
      { name: "atracoes", Component: Atracoes },
      { name: "eventos", Component: Eventos },
      { name: "noticias", Component: Noticias },
      { name: "servicos", Component: Servicos },
      { name: "usuarios", Component: Usuarios },
      // { name: "configuracoes", Component: Configuracoes },
    ],
    []
  );

  const currentScreen = useMemo(() => {
    return screens.find((s) => s.name === params.screen);
  }, [params.screen, screens]);

  const formattedTitle = currentScreen
    ? `Painel - ${capitalize(currentScreen.name)}`
    : "Painel - 404";

  useEffect(() => {
    document.title = formattedTitle;
  }, [formattedTitle]);

  useEffect(() => {
    if (!isAuthenticated) {
      route.push("/entrar")
    }
  }, [isAuthenticated, route])
  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        <meta
          name="description"
          content="Painel de controle para gerenciar o sistema"
        />
      </Head>
      {currentScreen ? <currentScreen.Component /> : <NotFound />}
    </>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
