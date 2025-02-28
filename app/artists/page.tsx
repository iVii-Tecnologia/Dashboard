"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ArtistCard } from "@/components/artists/artist-card";
import { ArtistListItem } from "@/components/artists/artist-list-item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  LayoutGrid, List, Search, Filter, Bookmark } from "lucide-react";
import { Artist, useStore } from "@/lib/store";

export default function ArtistsPage() {
  const { 
    artists, 
    bookmarkedArtists, 
    searchQuery, 
    selectedGenre, 
    viewMode,
    setSearchQuery,
    setSelectedGenre,
    setViewMode
  } = useStore();
  
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artists);
  
  // Get unique genres from artists
  const genres = Array.from(new Set(artists.map(artist => artist.genre)));
  
  // Filter artists based on search, genre, and bookmarked status
  useEffect(() => {
    let result = [...artists];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        artist => 
          artist.name.toLowerCase().includes(query) || 
          artist.genre.toLowerCase().includes(query) ||
          artist.location.toLowerCase().includes(query)
      );
    }
    
    if (selectedGenre) {
      result = result.filter(artist => artist.genre === selectedGenre);
    }
    
    if (showBookmarked) {
      result = result.filter(artist => bookmarkedArtists.includes(artist.id));
    }
    
    setFilteredArtists(result);
  }, [artists, searchQuery, selectedGenre, showBookmarked, bookmarkedArtists]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Artist Discovery</h1>
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
              placeholder="Search artists by name, genre, or location..."
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
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant={showBookmarked ? 'default' : 'outline'}
              onClick={() => setShowBookmarked(!showBookmarked)}
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmarked
            </Button>
          </div>
        </div>
        
        {/* Artists Grid/List */}
        {filteredArtists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg text-muted-foreground">No artists found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArtists.map(artist => (
              <ArtistListItem key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}