"use client";

import { useState, useEffect } from "react";
import {  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/lib/store";

export function MusicPlayer() {
  const { currentTrack, isPlaying, togglePlayPause } = useStore();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate current time based on progress and duration
  const durationParts = currentTrack.duration.split(':');
  const durationInSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
  const currentTimeInSeconds = (progress / 100) * durationInSeconds;

  return (
    <div className={`border-t bg-card p-2 transition-all ${isExpanded ? 'h-96' : 'h-20'}`}>
      <div className="flex items-center h-full">
        {/* Album art and track info */}
        <div className="flex items-center space-x-4 w-1/4">
          <div 
            className={`bg-cover bg-center rounded ${isExpanded ? 'h-32 w-32' : 'h-14 w-14'}`}
            style={{ backgroundImage: `url(${currentTrack.imageUrl})` }}
          />
          <div className="flex flex-col">
            <span className="font-medium truncate">{currentTrack.title}</span>
            <span className="text-sm text-muted-foreground truncate">{currentTrack.artist}</span>
          </div>
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center justify-center flex-1 px-4 space-y-2">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center w-full space-x-2">
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(currentTimeInSeconds)}
            </span>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              className="flex-1"
              onValueChange={(value) => setProgress(value[0])}
            />
            <span className="text-xs text-muted-foreground w-10">
              {currentTrack.duration}
            </span>
          </div>
        </div>

        {/* Volume and expand controls */}
        <div className="flex items-center space-x-4 w-1/4 justify-end pr-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              className="w-24"
              onValueChange={(value) => {
                setVolume(value[0]);
                setIsMuted(value[0] === 0);
              }}
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}