"use client";

import {  Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Artist, useStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

interface ArtistListItemProps {
  artist: Artist;
}

export function ArtistListItem({ artist }: ArtistListItemProps) {
  const { toggleBookmark } = useStore();

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      <div 
        className="h-16 w-16 rounded-full bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url(${artist.profileImage})` }}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold truncate">{artist.name}</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{artist.genre}</Badge>
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
        </div>
        
        <div className="text-sm text-muted-foreground mt-1">
          {artist.location} • {artist.age} anos
        </div>
        
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <div>
            <span className="font-medium">{formatNumber(artist.followers)}</span>
            <span className="text-muted-foreground ml-1">seguidores</span>
          </div>
          <div>
            <span className="font-medium text-emerald-500">{artist.engagement}%</span>
            <span className="text-muted-foreground ml-1">engajamento</span>
          </div>
        </div>
      </div>
      
      <Link href={`/artists/${artist.id}`} passHref>
        <Button variant="outline" size="sm" className="flex-shrink-0">
          <ExternalLink className="h-4 w-4 mr-2" />
          Ver Perfil
        </Button>
      </Link>
    </div>
  );
}