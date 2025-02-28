"use client";

import {  Play, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Track, useStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  const { setCurrentTrack } = useStore();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${track.imageUrl})` }}
        />
        <Button 
          variant="default" 
          size="icon" 
          className="absolute bottom-4 right-4 rounded-full h-12 w-12 shadow-lg"
          onClick={() => setCurrentTrack(track)}
        >
          <Play className="h-6 w-6" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{track.title}</h3>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>
          <Badge variant="outline">{track.genre}</Badge>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center">
            <BarChart className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{formatNumber(track.plays)} plays</span>
          </div>
          <div className="text-muted-foreground">{track.duration}</div>
        </div>
      </CardContent>
    </Card>
  );
}