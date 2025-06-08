"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Save } from "lucide-react";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Settings className="h-5 w-5 text-tourism-primary" />
            <CardTitle>Configurações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Nome do Portal</Label>
              <Input id="site-name" defaultValue="Portal de Turismo Digital" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Descrição do Portal</Label>
              <Input id="site-description" defaultValue="Informações turísticas completas" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email de Contato</Label>
              <Input id="contact-email" type="email" defaultValue="contato@turismodigital.com" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
              <Switch id="maintenance-mode" />
            </div>
            <Button className="bg-tourism-primary w-full mt-4">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup e Restauração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Backup de Dados</Label>
              <p className="text-sm text-muted-foreground">
                Faça backup completo dos dados do sistema.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              Gerar Backup
            </Button>
            
            <div className="space-y-2 pt-4">
              <Label>Restaurar Dados</Label>
              <p className="text-sm text-muted-foreground">
                Restaure os dados a partir de um arquivo de backup.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              Selecionar Arquivo de Backup
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
