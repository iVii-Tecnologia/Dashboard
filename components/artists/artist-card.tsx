"use client";

import {  Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Artist, useStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const { toggleBookmark } = useStore();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${artist.profileImage})` }}
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{artist.name}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <Badge variant="outline">{artist.genre}</Badge>
              <span className="text-xs text-muted-foreground">{artist.location}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => toggleBookmark(artist.id)}
            className="text-muted-foreground hover:text-primary"
          >
            {artist.isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Seguidores</span>
            <span className="font-medium">{formatNumber(artist.followers)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Engajamento</span>
            <span className="font-medium text-emerald-500">{artist.engagement}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link href={`/artists/${artist.id}`} passHref>
          <Button variant="default" size="sm" className="w-full">
            Ver Perfil
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}