"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { TrackCard } from "@/components/music/track-card";
import { TrackListItem } from "@/components/music/track-list-item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  LayoutGrid, List, Search, Filter, TrendingUp } from "lucide-react";
import { Track, useStore } from "@/lib/store";

export default function MusicPage() {
  const { 
    tracks, 
    searchQuery, 
    selectedGenre, 
    viewMode,
    setSearchQuery,
    setSelectedGenre,
    setViewMode
  } = useStore();
  
  const [sortBy, setSortBy] = useState("recent");
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(tracks);
  
  // Get unique genres from tracks
  const genres = Array.from(new Set(tracks.map(track => track.genre)));
  
  // Filter and sort tracks
  useEffect(() => {
    let result = [...tracks];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        track => 
          track.title.toLowerCase().includes(query) || 
          track.artist.toLowerCase().includes(query) ||
          track.genre.toLowerCase().includes(query)
      );
    }
    
    // Apply genre filter
    if (selectedGenre) {
      result = result.filter(track => track.genre === selectedGenre);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "recent":
        result.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
        break;
      case "popular":
        result.sort((a, b) => b.plays - a.plays);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    setFilteredTracks(result);
  }, [tracks, searchQuery, selectedGenre, sortBy]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Music Library</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tracks by title, artist, or genre..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-40">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Genres</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-40">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Tracks Grid/List */}
        {filteredTracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg text-muted-foreground">No tracks found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTracks.map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTracks.map((track, index) => (
              <TrackListItem key={track.id} track={track} index={index} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}