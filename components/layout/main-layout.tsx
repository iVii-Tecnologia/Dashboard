import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MusicPlayer } from "@/components/music/music-player";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0">
          <Sidebar />
        </div>
        <div className="md:pl-64 flex flex-col flex-1 h-full">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}