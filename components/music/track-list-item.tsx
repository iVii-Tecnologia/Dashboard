"use client";

import {  Play, Pause, BarChart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Track, useStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

interface TrackListItemProps {
  track: Track;
  index: number;
}

export function TrackListItem({ track, index }: TrackListItemProps) {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlayPause } = useStore();
  
  const isCurrentTrack = currentTrack?.id === track.id;
  
  const handlePlayPause = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="w-6 text-center text-muted-foreground">{index + 1}</div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full h-8 w-8"
        onClick={handlePlayPause}
      >
        {isCurrentTrack && isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      
      <div 
        className="h-10 w-10 rounded bg-cover bg-center flex-shrink-0"
        style={{ backgroundImage: `url(${track.imageUrl})` }}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate">{track.title}</h3>
          <Badge variant="outline" className="ml-2">{track.genre}</Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <BarChart className="h-4 w-4 mr-1" />
          <span>{formatNumber(track.plays)}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{track.uploadDate}</span>
        </div>
        <div>{track.duration}</div>
      </div>
    </div>
  );
}