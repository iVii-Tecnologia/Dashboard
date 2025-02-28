"use client";

import { useParams } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { TrackListItem } from "@/components/music/track-list-item";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import {  Mail, MapPin, Calendar, Users, BarChart, Music, Bookmark, BookmarkCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

// Mock growth data for the artist
const growthData = [
  { month: 'Jan', followers: 12000, engagement: 5.2 },
  { month: 'Feb', followers: 15000, engagement: 5.8 },
  { month: 'Mar', followers: 18000, engagement: 6.3 },
  { month: 'Apr', followers: 22000, engagement: 6.7 },
  { month: 'May', followers: 28000, engagement: 7.2 },
  { month: 'Jun', followers: 32000, engagement: 7.8 },
  { month: 'Jul', followers: 38000, engagement: 8.3 },
  { month: 'Aug', followers: 45000, engagement: 8.7 },
];

export default function ArtistProfilePage() {
  const params = useParams();
  const artistId = params.id as string;
  
  const { artists, tracks, toggleBookmark } = useStore();
  
  // Find the artist by ID
  const artist = artists.find(a => a.id === artistId);
  
  // Find tracks by this artist
  const artistTracks = tracks.filter(track => track.artistId === artistId);
  
  if (!artist) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold">Artist not found</h2>
          <p className="text-muted-foreground mt-2">The artist you're looking for doesn't exist or has been removed.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Artist Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div 
            className="h-48 w-48 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${artist.profileImage})` }}
          />
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{artist.name}</h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{artist.location}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{artist.age} years old</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => toggleBookmark(artist.id)}
              >
                {artist.isBookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2 text-primary" />
                    Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Bookmark
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center p-4 border rounded-lg">
                <Users className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Followers</p>
                  <p className="font-semibold">{formatNumber(artist.followers)}</p>
                </div>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <BarChart className="h-5 w-5 mr-3 text-emerald-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="font-semibold">{artist.engagement}%</p>
                </div>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <Music className="h-5 w-5 mr-3 text-violet-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Tracks</p>
                  <p className="font-semibold">{artistTracks.length}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Contact Artist
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="tracks">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracks" className="mt-6">
            {artistTracks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tracks available for this artist.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {artistTracks.map((track, index) => (
                  <TrackListItem key={track.id} track={track} index={index} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Growth Analytics</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={growthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 10]}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          color: "hsl(var(--card-foreground))"
                        }} 
                      />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="followers" 
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1)/0.2)" 
                        name="Followers"
                      />
                      <Area 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="hsl(var(--chart-2))" 
                        fill="hsl(var(--chart-2)/0.2)" 
                        name="Engagement (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Audience Demographics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>18-24</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-chart-3 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>25-34</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-chart-3 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-sm">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>35-44</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-chart-3 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-sm">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>45+</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-chart-3 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm">10%</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Top Regions</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>United States</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-chart-4 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>United Kingdom</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-chart-4 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Canada</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-chart-4 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-sm">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Australia</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-chart-4 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}