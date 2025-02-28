import { MainLayout } from "@/components/layout/main-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { GenreChart } from "@/components/dashboard/genre-chart";
import { TrendingArtists } from "@/components/dashboard/trending-artists";
import { PopularTracks } from "@/components/dashboard/popular-tracks";
import { RegionMap } from "@/components/dashboard/region-map";
import {  Users, Music2, TrendingUp, Headphones } from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Painel de Controle</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total de Artistas"
            value="12.543"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            description="Este mês"
            trend={12.5}
          />
          <StatsCard
            title="Total de Faixas"
            value="45.271"
            icon={<Music2 className="h-4 w-4 text-muted-foreground" />}
            description="Este mês"
            trend={8.3}
          />
          <StatsCard
            title="Gêneros em Alta"
            value="Hip Hop, Eletrônica"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            description="Baseado no crescimento"
          />
          <StatsCard
            title="Total de Reproduções"
            value="2,4M"
            icon={<Headphones className="h-4 w-4 text-muted-foreground" />}
            description="Este mês"
            trend={15.7}
          />
        </div>
        
        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TrendingArtists />
          <PopularTracks />
          <GenreChart />
        </div>
        
        {/* Region Map */}
        <RegionMap />
      </div>
    </MainLayout>
  );
}