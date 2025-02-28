"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Play, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

export function PopularTracks() {
  const { tracks, setCurrentTrack } = useStore();
  
  // Sort tracks by plays (descending)
  const popularTracks = [...tracks]
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 5);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Popular Tracks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularTracks.map((track) => (
            <div key={track.id} className="flex items-center gap-4">
              <div 
                className="relative h-12 w-12 rounded-md bg-cover bg-center" 
                style={{ backgroundImage: `url(${track.imageUrl})` }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md hover:bg-black/60"
                  onClick={() => setCurrentTrack(track)}
                >
                  <Play className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{track.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <BarChart className="h-3 w-3 mr-1" />
                    <span>{formatNumber(track.plays)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}