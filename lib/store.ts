import { create } from 'zustand';

// Types
export type Artist = {
  id: string;
  name: string;
  genre: string;
  location: string;
  age: number;
  followers: number;
  engagement: number;
  profileImage: string;
  isBookmarked: boolean;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  genre: string;
  duration: string;
  plays: number;
  uploadDate: string;
  audioUrl: string;
  imageUrl: string;
};

export type Genre = {
  name: string;
  count: number;
  growth: number;
};

export type Region = {
  name: string;
  artistCount: number;
  engagement: number;
};

// Store types
type StoreState = {
  artists: Artist[];
  tracks: Track[];
  genres: Genre[];
  regions: Region[];
  bookmarkedArtists: string[];
  currentTrack: Track | null;
  isPlaying: boolean;
  searchQuery: string;
  selectedGenre: string;
  selectedRegion: string;
  viewMode: 'grid' | 'list';
};

type StoreActions = {
  toggleBookmark: (artistId: string) => void;
  setCurrentTrack: (track: Track | null) => void;
  togglePlayPause: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string) => void;
  setSelectedRegion: (region: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
};

// Mock data
const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Luna Ray',
    genre: 'Eletrônica',
    location: 'Los Angeles, EUA',
    age: 24,
    followers: 45200,
    engagement: 8.7,
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    isBookmarked: false,
  },
  {
    id: '2',
    name: 'Marcus Vibe',
    genre: 'Hip Hop',
    location: 'Atlanta, EUA',
    age: 28,
    followers: 32100,
    engagement: 7.2,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    isBookmarked: true,
  },
  {
    id: '3',
    name: 'Blacka',
    genre: 'Funk',
    location: 'São Paulo, Brasil',
    age: 22,
    followers: 67800,
    engagement: 9.1,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    isBookmarked: false,
  },
  {
    id: '4',
    name: 'Rhythm Collective',
    genre: 'R&B',
    location: 'Toronto, Canadá',
    age: 26,
    followers: 28500,
    engagement: 6.8,
    profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop',
    isBookmarked: false,
  },
  {
    id: '5',
    name: 'Echo Wave',
    genre: 'Alternativo',
    location: 'Berlim, Alemanha',
    age: 29,
    followers: 41300,
    engagement: 7.9,
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop',
    isBookmarked: true,
  },
  {
    id: '6',
    name: 'Melody Spark',
    genre: 'Indie',
    location: 'Melbourne, Austrália',
    age: 25,
    followers: 36700,
    engagement: 8.2,
    profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop',
    isBookmarked: false,
  },
];

const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Sonhos Elétricos',
    artist: 'Luna Ray',
    artistId: '1',
    genre: 'Eletrônica',
    duration: '3:42',
    plays: 124500,
    uploadDate: '15/11/2023',
    audioUrl: 'https://example.com/audio/electric-dreams.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Luzes da Cidade',
    artist: 'Marcus Vibe',
    artistId: '2',
    genre: 'Hip Hop',
    duration: '4:17',
    plays: 98700,
    uploadDate: '03/12/2023',
    audioUrl: 'https://example.com/audio/city-lights.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Luz das Estrelas',
    artist: 'Aria Nova',
    artistId: '3',
    genre: 'Pop',
    duration: '3:28',
    plays: 215600,
    uploadDate: '22/01/2024',
    audioUrl: 'https://example.com/audio/starlight.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Alma da Meia-noite',
    artist: 'Rhythm Collective',
    artistId: '4',
    genre: 'R&B',
    duration: '4:05',
    plays: 87300,
    uploadDate: '18/10/2023',
    audioUrl: 'https://example.com/audio/midnight-soul.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Ecos do Amanhã',
    artist: 'Echo Wave',
    artistId: '5',
    genre: 'Alternativo',
    duration: '5:12',
    plays: 104200,
    uploadDate: '07/02/2024',
    audioUrl: 'https://example.com/audio/echoes-of-tomorrow.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Sussurros ao Vento',
    artist: 'Melody Spark',
    artistId: '6',
    genre: 'Indie',
    duration: '3:56',
    plays: 76800,
    uploadDate: '29/09/2023',
    audioUrl: 'https://example.com/audio/whispers-in-the-wind.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop',
  },
];

const mockGenres: Genre[] = [
  { name: 'Funk', count: 1250, growth: 12.5 },
  { name: 'Sertanejo', count: 980, growth: 15.2 },
  { name: 'Eletrônica', count: 870, growth: 8.7 },
  { name: 'R&B', count: 650, growth: 5.3 },
  { name: 'Alternativo', count: 520, growth: 7.1 },
  { name: 'Indie', count: 480, growth: 9.8 },
];

const mockRegions: Region[] = [
  { name: 'América do Sul', artistCount: 3200, engagement: 8.5 },
  { name: 'Europa', artistCount: 2800, engagement: 7.9 },
  { name: 'Ásia', artistCount: 2100, engagement: 9.2 },
  { name: 'América do Norte', artistCount: 1500, engagement: 8.1 },
  { name: 'Austrália', artistCount: 950, engagement: 7.6 },
  { name: 'África', artistCount: 1200, engagement: 8.8 },
];

// Create store
export const useStore = create<StoreState & StoreActions>((set) => ({
  artists: mockArtists,
  tracks: mockTracks,
  genres: mockGenres,
  regions: mockRegions,
  bookmarkedArtists: mockArtists.filter(artist => artist.isBookmarked).map(artist => artist.id),
  currentTrack: null,
  isPlaying: false,
  searchQuery: '',
  selectedGenre: '',
  selectedRegion: '',
  viewMode: 'grid',

  toggleBookmark: (artistId) => {
    set((state) => {
      const updatedArtists = state.artists.map((artist) => {
        if (artist.id === artistId) {
          return { ...artist, isBookmarked: !artist.isBookmarked };
        }
        return artist;
      });

      const updatedBookmarks = updatedArtists
        .filter((artist) => artist.isBookmarked)
        .map((artist) => artist.id);

      return {
        artists: updatedArtists,
        bookmarkedArtists: updatedBookmarks,
      };
    });
  },

  setCurrentTrack: (track) => {
    set({ currentTrack: track, isPlaying: track !== null });
  },

  togglePlayPause: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSelectedGenre: (genre) => {
    set({ selectedGenre: genre });
  },

  setSelectedRegion: (region) => {
    set({ selectedRegion: region });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },
}));