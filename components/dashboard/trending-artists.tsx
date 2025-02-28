"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

export function TrendingArtists() {
  const { artists } = useStore();
  
  // Sort artists by engagement score (descending)
  const trendingArtists = [...artists]
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 5);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Artistas em Alta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingArtists.map((artist) => (
            <div key={artist.id} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={artist.profileImage} alt={artist.name} />
                <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{artist.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {artist.genre}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{formatNumber(artist.followers)} seguidores</span>
                  <span className="mx-2">•</span>
                  <span className="text-emerald-500 font-medium">{artist.engagement}% engajamento</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}