"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {  Search, Filter, Music, Mic2, Heart, Share2, BookmarkPlus, TrendingUp, Star } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";

// Mock lyrics data
const lyrics = [
  {
    id: '1',
    title: 'Electric Dreams',
    artist: 'Luna Ray',
    artistId: '1',
    genre: 'Electronic',
    content: `Neon lights in the midnight sky,
Electricity running through my veins.
Digital heartbeats, we're alive,
In this world we've created, nothing's the same.

[Chorus]
Electric dreams, they're taking over,
Electric dreams, we're falling deeper.
Electric dreams, they're never over,
In this digital world, we're the dreamers.`,
    likes: 1245,
    views: 5280,
    isTrending: true,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'City Lights',
    artist: 'Marcus Vibe',
    artistId: '2',
    genre: 'Hip Hop',
    content: `Streets alive with the rhythm of the night,
Hustlers moving, trying to make it right.
City lights shine down on the concrete dreams,
Nothing is ever exactly what it seems.

[Chorus]
City lights, guiding me home,
City lights, I'm never alone.
Through the darkness, they show me the way,
In this urban jungle, I'm here to stay.`,
    likes: 987,
    views: 3150,
    isTrending: false,
    rating: 4.5,
  },
  {
    id: '3',
    title: 'Starlight',
    artist: 'Aria Nova',
    artistId: '3',
    genre: 'Pop',
    content: `Gazing up at the endless night,
Stars like diamonds, shining so bright.
You're my constellation, guiding me through,
Under this starlight, I'm falling for you.

[Chorus]
Starlight, starlight, illuminate the way,
Starlight, starlight, please promise to stay.
When darkness surrounds me and I lose my sight,
I'll always find you, my guiding starlight.`,
    likes: 2156,
    views: 8720,
    isTrending: true,
    rating: 4.9,
  },
  {
    id: '4',
    title: 'Midnight Soul',
    artist: 'Rhythm Collective',
    artistId: '4',
    genre: 'R&B',
    content: `Midnight whispers, secrets of the soul,
Emotions running deep, taking their toll.
Velvet melodies, smooth as can be,
This midnight soul is setting me free.

[Chorus]
Midnight soul, rhythm of the heart,
Midnight soul, tearing me apart.
These feelings inside, they're taking control,
Can't fight the power of this midnight soul.`,
    likes: 873,
    views: 2980,
    isTrending: false,
    rating: 4.3,
  },
  {
    id: '5',
    title: 'Echoes of Tomorrow',
    artist: 'Echo Wave',
    artistId: '5',
    genre: 'Alternative',
    content: `Fragments of the future, echoing today,
Visions of what's coming, leading the way.
We're the architects of what's yet to be,
Building the tomorrow that we want to see.

[Chorus]
Echoes of tomorrow, ringing in my ears,
Echoes of tomorrow, dissolving all my fears.
The sound of the future is calling my name,
Nothing will ever be quite the same.`,
    likes: 1042,
    views: 4120,
    isTrending: true,
    rating: 4.6,
  },
  {
    id: '6',
    title: 'Whispers in the Wind',
    artist: 'Melody Spark',
    artistId: '6',
    genre: 'Indie',
    content: `Gentle whispers carried by the breeze,
Secrets of nature, rustling through the trees.
Messages of hope, floating all around,
In these whispers, wisdom can be found.

[Chorus]
Whispers in the wind, telling ancient tales,
Whispers in the wind, when all else fails.
Listen carefully to what they have to say,
The wind's whispers will guide you on your way.`,
    likes: 768,
    views: 2540,
    isTrending: false,
    rating: 4.4,
  },
];

export default function LyricsPage() {
  const { searchQuery, selectedGenre, setSearchQuery, setSelectedGenre } = useStore();
  const [selectedLyrics, setSelectedLyrics] = useState(lyrics[0]);
  const [sortBy, setSortBy] = useState("trending");
  
  // Get unique genres from lyrics
  const genres = Array.from(new Set(lyrics.map(lyric => lyric.genre)));
  
  // Filter and sort lyrics
  const filteredLyrics = lyrics.filter(lyric => {
    const matchesSearch = searchQuery === '' || 
      lyric.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lyric.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lyric.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesGenre = selectedGenre === '' || lyric.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    if (sortBy === "trending") {
      // Sort by trending status first, then by views
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.views - a.views;
    } else if (sortBy === "popular") {
      // Sort by likes
      return b.likes - a.likes;
    } else if (sortBy === "rating") {
      // Sort by rating
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Lyrics Library</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search lyrics by title, artist, or content..."
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
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Lyrics Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lyrics List */}
          <Card className="lg:col-span-1">
            <CardHeader className="px-4 py-3">
              <CardTitle>Lyrics</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredLyrics.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No lyrics found matching your criteria.</p>
                  </div>
                ) : (
                  filteredLyrics.map(lyric => (
                    <div 
                      key={lyric.id}
                      className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                        selectedLyrics?.id === lyric.id ? 'bg-accent/50' : ''
                      }`}
                      onClick={() => setSelectedLyrics(lyric)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{lyric.title}</h3>
                          <p className="text-sm text-muted-foreground">{lyric.artist}</p>
                        </div>
                        {lyric.isTrending && (
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Badge variant="outline" className="mr-2">{lyric.genre}</Badge>
                        <Heart className="h-3 w-3 mr-1" />
                        <span>{lyric.likes}</span>
                        <span className="mx-2">•</span>
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>{lyric.rating}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Lyrics Detail */}
          <Card className="lg:col-span-2">
            {selectedLyrics ? (
              <>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedLyrics.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">by {selectedLyrics.artist}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="mr-2">{selectedLyrics.genre}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>{selectedLyrics.rating}/5</span>
                      <span className="mx-2">•</span>
                      <span>{selectedLyrics.views} views</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="lyrics">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="lyrics">
                        <Mic2 className="h-4 w-4 mr-2" />
                        Lyrics
                      </TabsTrigger>
                      <TabsTrigger value="analysis">
                        <Music className="h-4 w-4 mr-2" />
                        Analysis
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="lyrics" className="mt-6">
                      <div className="whitespace-pre-line text-lg leading-relaxed">
                        {selectedLyrics.content}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="analysis" className="mt-6">
                      <div className="space-y-6">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Theme Analysis</h3>
                          <p className="text-muted-foreground">
                            This song explores themes of {selectedLyrics.genre === 'Electronic' ? 'technology and digital existence' : 
                              selectedLyrics.genre === 'Hip Hop' ? 'urban life and personal struggle' :
                              selectedLyrics.genre === 'Pop' ? 'love and emotional connection' :
                              selectedLyrics.genre === 'R&B' ? 'deep emotions and introspection' :
                              selectedLyrics.genre === 'Alternative' ? 'future possibilities and human potential' :
                              'nature and spiritual connection'
                            }. The lyrics use vivid imagery and metaphor to convey the artist's perspective.
                          </p>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Structure</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Verses</span>
                              <span>2</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Chorus</span>
                              <span>1</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Bridge</span>
                              <span>0</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Outro</span>
                              <span>0</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Sentiment Analysis</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Positivity</span>
                                <span>{Math.floor(Math.random() * 30) + 70}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-chart-1 h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Energy</span>
                                <span>{Math.floor(Math.random() * 40) + 60}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-chart-2 h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Complexity</span>
                                <span>{Math.floor(Math.random() * 50) + 50}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-chart-3 h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">Select lyrics to view details.</p>
              </div>
            )}
          </Card>
        </div>
        
        {/* Trending Lyrics */}
        <Card>
          <CardHeader>
            <CardTitle>Trending Lyrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lyrics.filter(lyric => lyric.isTrending).map(lyric => (
                <Card key={lyric.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{lyric.title}</h3>
                        <p className="text-sm text-muted-foreground">{lyric.artist}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm line-clamp-3 text-muted-foreground">
                      {lyric.content.split('\n\n')[0]}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Heart className="h-3 w-3 mr-1" />
                        <span>{lyric.likes}</span>
                        <span className="mx-2">•</span>
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>{lyric.rating}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedLyrics(lyric);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}