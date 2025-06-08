"use client";
import { 
  LayoutDashboard, 
  MapPin, 
  Compass, 
  Calendar, 
  Newspaper, 
  Store, 
  Settings, 
  Menu 
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }: SidebarItemProps) => {
  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-3 py-2 h-auto",
          active ? "bg-tourism-light text-tourism-primary" : "hover:bg-muted"
        )}
      >
        <Icon className="h-5 w-5" />
        {!collapsed && <span className="font-medium">{label}</span>}
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/painel/dashboard" },
    { icon: MapPin, label: "Municípios", href: "/painel/municipios" },
    { icon: Compass, label: "Atrações", href: "/painel/atracoes" },
    { icon: Calendar, label: "Eventos", href: "/painel/eventos" },
    { icon: Newspaper, label: "Notícias", href: "/painel/noticias" },
    { icon: Store, label: "Serviços", href: "/painel/servicos" },
    { icon: Settings, label: "Configurações", href: "/painel/configuracoes" },
  ];

  return (
    <div 
      className={cn(
        "border-r bg-background flex flex-col h-screen p-4 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <h1 className="text-xl font-bold text-tourism-primary">Turismo Digital</h1>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-1 flex-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </div>
      <div className="border-t pt-4">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            Dashboard Turismo Digital v1.0
          </div>
        )}
      </div>
    </div>
  );
}
