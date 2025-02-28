"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  LayoutDashboard, Users, Music2, BarChart3, Handshake, Settings, LogOut, Music, Mic2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Artist Discovery",
    icon: Users,
    href: "/artists",
    color: "text-violet-500",
  },
  {
    label: "Music Library",
    icon: Music2,
    href: "/music",
    color: "text-pink-500",
  },
  {
    label: "Lyrics Library",
    icon: Mic2,
    href: "/lyrics",
    color: "text-orange-500",
  },
  {
    label: "Trends & Analytics",
    icon: BarChart3,
    href: "/analytics",
    color: "text-emerald-500",
  },
  {
    label: "Collaborations",
    icon: Handshake,
    href: "/collaborations",
    color: "text-blue-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card text-card-foreground border-r">
      <div className="px-3 py-2 flex-1">
        <div className="flex items-center pl-3 mb-8">
          <Music className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-2xl font-bold">
            <span className="text-primary">i</span>
            <span className="text-primary">V</span>
            <span className="text-primary">ii</span>
          </h1>
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
          Logout
        </Button>
      </div>
    </div>
  );
}