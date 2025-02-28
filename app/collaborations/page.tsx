"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  Mail, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Download, Send, Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

// Mock collaboration data
const collaborations = [
  { 
    id: '1', 
    artist: 'Luna Ray', 
    artistId: '1',
    type: 'Negociação de Contrato', 
    status: 'Em Andamento', 
    date: '15/03/2024',
    lastContact: '20/03/2024',
  },
  { 
    id: '2', 
    artist: 'Marcus Vibe', 
    artistId: '2',
    type: 'Licenciamento de Música', 
    status: 'Concluído', 
    date: '10/02/2024',
    lastContact: '28/02/2024',
  },
  { 
    id: '3', 
    artist: 'Aria Nova', 
    artistId: '3',
    type: 'Solicitação de Parceria', 
    status: 'Pendente', 
    date: '22/03/2024',
    lastContact: '22/03/2024',
  },
  { 
    id: '4', 
    artist: 'Echo Wave', 
    artistId: '5',
    type: 'Produção de Álbum', 
    status: 'Recusado', 
    date: '05/01/2024',
    lastContact: '15/01/2024',
  },
];

// Mock messages
const messages = [
  {
    id: '1',
    collaboration: '1',
    sender: 'Você',
    content: "Estamos interessados em discutir um possível contrato para seus próximos lançamentos. Você está disponível para uma chamada na próxima semana?",
    timestamp: '15/03/2024 14:30',
  },
  {
    id: '2',
    collaboration: '1',
    sender: 'Luna Ray',
    content: "Obrigada por entrar em contato! Estou definitivamente interessada e estaria disponível na terça ou quarta-feira à tarde na próxima semana.",
    timestamp: '16/03/2024 09:45',
  },
  {
    id: '3',
    collaboration: '1',
    sender: 'Você',
    content: "Ótimo! Vamos agendar para terça-feira às 14h. Enviarei alguns termos preliminares para você revisar antes da nossa chamada.",
    timestamp: '16/03/2024 11:20',
  },
  {
    id: '4',
    collaboration: '1',
    sender: 'Luna Ray',
    content: "Perfeito. Estou ansiosa para receber os termos e nossa discussão na terça-feira.",
    timestamp: '16/03/2024 12:05',
  },
  {
    id: '5',
    collaboration: '1',
    sender: 'Você',
    content: "Anexei os termos preliminares do contrato para sua análise. Por favor, me avise se tiver alguma dúvida antes da nossa chamada.",
    timestamp: '18/03/2024 10:15',
  },
  {
    id: '6',
    collaboration: '1',
    sender: 'Luna Ray',
    content: "Obrigada por enviar os termos. Tenho algumas dúvidas sobre a estrutura de royalties e o período de exclusividade que podemos discutir durante nossa chamada.",
    timestamp: '20/03/2024 08:30',
  },
];

export default function CollaborationsPage() {
  const { artists } = useStore();
  const [selectedTab, setSelectedTab] = useState("active");
  const [selectedCollaboration, setSelectedCollaboration] = useState(collaborations[0]);
  const [newMessage, setNewMessage] = useState("");
  
  // Filter collaborations based on selected tab
  const filteredCollaborations = collaborations.filter(collab => {
    if (selectedTab === "active") {
      return collab.status === "Em Andamento" || collab.status === "Pendente";
    } else if (selectedTab === "completed") {
      return collab.status === "Concluído";
    } else if (selectedTab === "declined") {
      return collab.status === "Recusado";
    }
    return true;
  });
  
  // Get collaboration messages
  const collaborationMessages = messages.filter(
    message => message.collaboration === selectedCollaboration?.id
  );
  
  // Get artist details for the selected collaboration
  const collaborationArtist = artists.find(
    artist => artist.id === selectedCollaboration?.artistId
  );
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage);
    
    // Clear the input
    setNewMessage("");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Colaborações & Parcerias</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Colaboração
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nova Solicitação de Colaboração</DialogTitle>
                <DialogDescription>
                  Entre em contato com um artista para iniciar uma nova colaboração ou parceria.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="artist" className="text-sm font-medium">
                    Selecionar Artista
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um artista" />
                    </SelectTrigger>
                    <SelectContent>
                      {artists.map(artist => (
                        <SelectItem key={artist.id} value={artist.id}>
                          {artist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Tipo de Colaboração
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Negociação de Contrato</SelectItem>
                      <SelectItem value="licensing">Licenciamento de Música</SelectItem>
                      <SelectItem value="feature">Solicitação de Parceria</SelectItem>
                      <SelectItem value="production">Produção de Álbum</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem Inicial
                  </label>
                  <Textarea 
                    placeholder="Escreva sua mensagem inicial para o artista..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enviar Solicitação</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Collaborations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="px-4 py-3">
              <Tabs defaultValue="active" onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Ativas</TabsTrigger>
                  <TabsTrigger value="completed">Concluídas</TabsTrigger>
                  <TabsTrigger value="declined">Recusadas</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredCollaborations.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">Nenhuma colaboração encontrada.</p>
                  </div>
                ) : (
                  filteredCollaborations.map(collab => (
                    <div 
                      key={collab.id}
                      className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                        selectedCollaboration?.id === collab.id ? 'bg-accent/50' : ''
                      }`}
                      onClick={() => setSelectedCollaboration(collab)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{collab.artist}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          collab.status === 'Em Andamento' ? 'bg-blue-500/20 text-blue-500' :
                          collab.status === 'Concluído' ? 'bg-green-500/20 text-green-500' :
                          collab.status === 'Pendente' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>
                          {collab.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{collab.type}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{collab.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Último contato: {collab.lastContact}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Collaboration Details */}
          <Card className="lg:col-span-2">
            {selectedCollaboration ? (
              <>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle>{selectedCollaboration.artist}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedCollaboration.type} • Iniciado em {selectedCollaboration.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Dados
                    </Button>
                    <Button size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contatar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Collaboration Status */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-2 rounded-full ${
                      selectedCollaboration.status === 'Em Andamento' ? 'bg-blue-500/20' :
                      selectedCollaboration.status === 'Concluído' ? 'bg-green-500/20' :
                      selectedCollaboration.status === 'Pendente' ? 'bg-yellow-500/20' :
                      'bg-red-500/20'
                    }`}>
                      {selectedCollaboration.status === 'Em Andamento' ? (
                        <Clock className="h-5 w-5 text-blue-500" />
                      ) : selectedCollaboration.status === 'Concluído' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : selectedCollaboration.status === 'Pendente' ? (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Status: {selectedCollaboration.status}</p>
                      <p className="text-sm text-muted-foreground">
                        Última atualização: {selectedCollaboration.lastContact}
                      </p>
                    </div>
                  </div>
                  
                  {/* Artist Info */}
                  {collaborationArtist && (
                    <div className="mb-6 p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Informações do Artista</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Localização</p>
                          <p>{collaborationArtist.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Seguidores</p>
                          <p>{formatNumber(collaborationArtist.followers)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Engajamento</p>
                          <p>{collaborationArtist.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Gênero</p>
                          <p>{collaborationArtist.genre}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Messages */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Histórico de Conversas</h3>
                    </div>
                    
                    <div className="p-4 h-[300px] overflow-y-auto space-y-4">
                      {collaborationMessages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'Você' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'Você' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-sm">{message.sender}</span>
                              <span className="text-xs opacity-70">{message.timestamp.split(' ')[1]}</span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">Selecione uma colaboração para ver os detalhes.</p>
              </div>
            )}
          </Card>
        </div>
        
        {/* Collaboration Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Análise de Colaborações</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Colaboração</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Taxa de Sucesso</TableHead>
                  <TableHead>Tempo Médio de Resposta</TableHead>
                  <TableHead>Tempo Médio de Conclusão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Negociação de Contrato</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>75%</TableCell>
                  <TableCell>1,2 dias</TableCell>
                  <TableCell>14 dias</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Licenciamento de Música</TableCell>
                  <TableCell>18</TableCell>
                  <TableCell>83%</TableCell>
                  <TableCell>0,8 dias</TableCell>
                  <TableCell>7 dias</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Solicitação de Parceria</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>58%</TableCell>
                  <TableCell>1,5 dias</TableCell>
                  <TableCell>21 dias</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Produção de Álbum</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell>62%</TableCell>
                  <TableCell>1,1 dias</TableCell>
                  <TableCell>45 dias</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}