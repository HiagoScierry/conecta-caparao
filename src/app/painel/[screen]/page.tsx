import Atracoes from "@/components/pages/Atracoes";
import Configuracoes from "@/components/pages/Configuracoes";
import Dashboard from "@/components/pages/Dashboard";
import Eventos from "@/components/pages/Eventos";
import Municipios from "@/components/pages/Municipios";
import NotFound from "@/components/pages/NotFound";
import Noticias from "@/components/pages/Noticias";
import Servicos from "@/components/pages/Servicos";
import { useMemo } from "react";

export default function Page({
  params,
}: Readonly<{ params: { screen: string } }>) {
  const { screen } = params;

  const screens = [
    { name: "dashboard", Component: () => <Dashboard /> },
    { name: "municipios", Component: () => <Municipios /> },
    { name: "atracoes", Component: () => <Atracoes /> },
    { name: "eventos", Component: () => <Eventos /> },
    { name: "noticias", Component: () => <Noticias /> },
    { name: "servicos", Component: () => <Servicos /> },
    { name: "configuracoes", Component: () => <Configuracoes /> },
  ];

  const currentScreen = useMemo(() => {
    return screens.find((s) => s.name === screen);
  }, [screen, screens]);

  return (
      currentScreen ? <currentScreen.Component /> : <NotFound />
  );
}
