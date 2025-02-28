"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  LayoutDashboard, Users, Music2, BarChart3, Handshake, Settings, LogOut, Music, Mic2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const routes = [
  {
    label: "Painel de Controle",
    icon: LayoutDashboard,
    href: "/",
    color: "text-primary",
  },
  {
    label: "Descobrir Artistas",
    icon: Users,
    href: "/artists",
    color: "text-primary",
  },
  {
    label: "Biblioteca de Músicas",
    icon: Music2,
    href: "/music",
    color: "text-primary",
  },
  {
    label: "Biblioteca de Letras",
    icon: Mic2,
    href: "/lyrics",
    color: "text-primary",
  },
  {
    label: "Tendências e Análises",
    icon: BarChart3,
    href: "/analytics",
    color: "text-primary",
  },
  {
    label: "Colaborações",
    icon: Handshake,
    href: "/collaborations",
    color: "text-primary",
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/settings",
    color: "text-muted-foreground",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card text-card-foreground border-r">
      <div className="px-3 py-2 flex-1">
        <div className="flex items-center pl-3 mb-8">
          <Link href="/">
            <img 
              src="https://cdn.prod.website-files.com/67312dfea585bda016b09804/67316d711da46b92a7def12e_LOGOTIPO%20IVII.svg"
              alt="iVii Logo"
              className="h-8"
            />
          </Link>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "bg-primary/10" : "transparent"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </Button>
      </div>
    </div>
  );
}