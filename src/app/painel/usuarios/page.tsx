"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Usuarios from "@/components/painel-pages/Usuarios";

export default function UsuariosPage() {
  return (
    <DashboardLayout>
      <Usuarios />
    </DashboardLayout>
  );
}
