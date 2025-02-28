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

// Dados simulados de letras
const lyrics = [
  {
    id: '1',
    title: 'Sonhos Elétricos',
    artist: 'Luna Ray',
    artistId: '1',
    genre: 'Eletrônica',
    content: `Luzes de neon no céu da meia-noite,
Eletricidade correndo pelas minhas veias.
Batidas digitais, estamos vivos,
Neste mundo que criamos, nada é igual.

[Refrão]
Sonhos elétricos, estão tomando conta,
Sonhos elétricos, estamos caindo mais fundo.
Sonhos elétricos, eles nunca acabam,
Neste mundo digital, somos os sonhadores.`,
    likes: 1245,
    views: 5280,
    isTrending: true,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Luzes da Cidade',
    artist: 'Marcus Vibe',
    artistId: '2',
    genre: 'Hip Hop',
    content: `Ruas vivas com o ritmo da noite,
Pessoas em movimento, tentando fazer dar certo.
Luzes da cidade brilham sobre sonhos de concreto,
Nada é exatamente o que parece.

[Refrão]
Luzes da cidade, me guiando para casa,
Luzes da cidade, nunca estou sozinho.
Através da escuridão, elas me mostram o caminho,
Nesta selva urbana, vim para ficar.`,
    likes: 987,
    views: 3150,
    isTrending: false,
    rating: 4.5,
  },
  {
    id: '3',
    title: 'Luz das Estrelas',
    artist: 'Blacka',
    artistId: '3',
    genre: 'Funk',
    content: `Olhando para a noite sem fim,
Estrelas como diamantes, brilhando tão forte.
Você é minha constelação, me guiando,
Sob esta luz estelar, estou me apaixonando por você.

[Refrão]
Luz estelar, luz estelar, ilumine o caminho,
Luz estelar, luz estelar, prometa ficar.
Quando a escuridão me rodeia e perco minha visão,
Sempre te encontrarei, minha luz guia.`,
    likes: 2156,
    views: 8720,
    isTrending: true,
    rating: 4.9,
  },
  {
    id: '4',
    title: 'Alma da Meia-noite',
    artist: 'Rhythm Collective',
    artistId: '4',
    genre: 'R&B',
    content: `Sussurros da meia-noite, segredos da alma,
Emoções profundas, cobrando seu preço.
Melodias de veludo, suaves como podem ser,
Esta alma da meia-noite está me libertando.

[Refrão]
Alma da meia-noite, ritmo do coração,
Alma da meia-noite, me despedaçando.
Estes sentimentos dentro, estão tomando controle,
Não posso lutar contra o poder desta alma da meia-noite.`,
    likes: 873,
    views: 2980,
    isTrending: false,
    rating: 4.3,
  },
  {
    id: '5',
    title: 'Ecos do Amanhã',
    artist: 'Echo Wave',
    artistId: '5',
    genre: 'Alternativo',
    content: `Fragmentos do futuro, ecoando hoje,
Visões do que está por vir, mostrando o caminho.
Somos os arquitetos do que ainda está por ser,
Construindo o amanhã que queremos ver.

[Refrão]
Ecos do amanhã, soando em meus ouvidos,
Ecos do amanhã, dissolvendo todos os meus medos.
O som do futuro está chamando meu nome,
Nada será exatamente igual.`,
    likes: 1042,
    views: 4120,
    isTrending: true,
    rating: 4.6,
  },
  {
    id: '6',
    title: 'Sussurros ao Vento',
    artist: 'Melody Spark',
    artistId: '6',
    genre: 'Indie',
    content: `Suaves sussurros levados pela brisa,
Segredos da natureza, farfalhando pelas árvores.
Mensagens de esperança, flutuando ao redor,
Nestes sussurros, sabedoria pode ser encontrada.

[Refrão]
Sussurros ao vento, contando histórias antigas,
Sussurros ao vento, quando tudo mais falha.
Ouça atentamente o que eles têm a dizer,
Os sussurros do vento vão guiar seu caminho.`,
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
  
  // Obter gêneros únicos das letras
  const genres = Array.from(new Set(lyrics.map(lyric => lyric.genre)));
  
  // Filtrar e ordenar letras
  const filteredLyrics = lyrics.filter(lyric => {
    const matchesSearch = searchQuery === '' || 
      lyric.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lyric.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lyric.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesGenre = selectedGenre === '' || lyric.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    if (sortBy === "trending") {
      // Ordenar por status de tendência primeiro, depois por visualizações
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.views - a.views;
    } else if (sortBy === "popular") {
      // Ordenar por curtidas
      return b.likes - a.likes;
    } else if (sortBy === "rating") {
      // Ordenar por avaliação
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Biblioteca de Letras</h1>
        
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar letras por título, artista ou conteúdo..."
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
                  <SelectValue placeholder="Gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Gêneros</SelectItem>
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
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Em Alta</SelectItem>
                  <SelectItem value="popular">Mais Populares</SelectItem>
                  <SelectItem value="rating">Melhor Avaliadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Conteúdo de Letras */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Letras */}
          <Card className="lg:col-span-1">
            <CardHeader className="px-4 py-3">
              <CardTitle>Letras</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredLyrics.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">Nenhuma letra encontrada com esses critérios.</p>
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
                            Em Alta
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
          
          {/* Detalhes da Letra */}
          <Card className="lg:col-span-2">
            {selectedLyrics ? (
              <>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedLyrics.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">por {selectedLyrics.artist}</p>
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
                      <span>{selectedLyrics.views} visualizações</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="lyrics">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="lyrics">
                        <Mic2 className="h-4 w-4 mr-2" />
                        Letra
                      </TabsTrigger>
                      <TabsTrigger value="analysis">
                        <Music className="h-4 w-4 mr-2" />
                        Análise
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
                          <h3 className="font-medium mb-2">Análise Temática</h3>
                          <p className="text-muted-foreground">
                            Esta música explora temas de {selectedLyrics.genre === 'Eletrônica' ? 'tecnologia e existência digital' : 
                              selectedLyrics.genre === 'Hip Hop' ? 'vida urbana e lutas pessoais' :
                              selectedLyrics.genre === 'Pop' ? 'amor e conexão emocional' :
                              selectedLyrics.genre === 'R&B' ? 'emoções profundas e introspecção' :
                              selectedLyrics.genre === 'Alternativo' ? 'possibilidades futuras e potencial humano' :
                              'natureza e conexão espiritual'
                            }. A letra usa imagens vívidas e metáforas para transmitir a perspectiva do artista.
                          </p>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Estrutura</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Versos</span>
                              <span>2</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Refrão</span>
                              <span>1</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Ponte</span>
                              <span>0</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Final</span>
                              <span>0</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Análise de Sentimento</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Positividade</span>
                                <span>{Math.floor(Math.random() * 30) + 70}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-chart-1 h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Energia</span>
                                <span>{Math.floor(Math.random() * 40) + 60}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-chart-2 h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span>Complexidade</span>
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
                <p className="text-muted-foreground">Selecione uma letra para ver os detalhes.</p>
              </div>
            )}
          </Card>
        </div>
        
        {/* Letras em Alta */}
        <Card>
          <CardHeader>
            <CardTitle>Letras em Alta</CardTitle>
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
                        Em Alta
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
                        Ver
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