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
    type: 'Contract Negotiation', 
    status: 'In Progress', 
    date: '2024-03-15',
    lastContact: '2024-03-20',
  },
  { 
    id: '2', 
    artist: 'Marcus Vibe', 
    artistId: '2',
    type: 'Song Licensing', 
    status: 'Completed', 
    date: '2024-02-10',
    lastContact: '2024-02-28',
  },
  { 
    id: '3', 
    artist: 'Aria Nova', 
    artistId: '3',
    type: 'Feature Request', 
    status: 'Pending', 
    date: '2024-03-22',
    lastContact: '2024-03-22',
  },
  { 
    id: '4', 
    artist: 'Echo Wave', 
    artistId: '5',
    type: 'Album Production', 
    status: 'Declined', 
    date: '2024-01-05',
    lastContact: '2024-01-15',
  },
];

// Mock messages
const messages = [
  {
    id: '1',
    collaboration: '1',
    sender: 'You',
    content: 'We're interested in discussing a potential contract for your upcoming releases. Are you available for a call next week?',
    timestamp: '2024-03-15 14:30',
  },
  {
    id: '2',
    collaboration: '1',
    sender: 'Luna Ray',
    content: 'Thank you for reaching out! I'm definitely interested and would be available on Tuesday or Wednesday afternoon next week.',
    timestamp: '2024-03-16 09:45',
  },
  {
    id: '3',
    collaboration: '1',
    sender: 'You',
    content: 'Great! Let's schedule for Tuesday at 2pm. I'll send over some preliminary terms for you to review before our call.',
    timestamp: '2024-03-16 11:20',
  },
  {
    id: '4',
    collaboration: '1',
    sender: 'Luna Ray',
    content: 'Sounds perfect. Looking forward to receiving the terms and our discussion on Tuesday.',
    timestamp: '2024-03-16 12:05',
  },
  {
    id: '5',
    collaboration: '1',
    sender: 'You',
    content: 'I've attached the preliminary contract terms for your review. Please let me know if you have any questions before our call.',
    timestamp: '2024-03-18 10:15',
  },
  {
    id: '6',
    collaboration: '1',
    sender: 'Luna Ray',
    content: 'Thank you for sending these over. I have a few questions about the royalty structure and exclusivity period that we can discuss during our call.',
    timestamp: '2024-03-20 08:30',
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
      return collab.status === "In Progress" || collab.status === "Pending";
    } else if (selectedTab === "completed") {
      return collab.status === "Completed";
    } else if (selectedTab === "declined") {
      return collab.status === "Declined";
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
          <h1 className="text-3xl font-bold">Collaborations & Partnerships</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Collaboration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>New Collaboration Request</DialogTitle>
                <DialogDescription>
                  Reach out to an artist to start a new collaboration or partnership.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="artist" className="text-sm font-medium">
                    Select Artist
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an artist" />
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
                    Collaboration Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contract Negotiation</SelectItem>
                      <SelectItem value="licensing">Song Licensing</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="production">Album Production</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Initial Message
                  </label>
                  <Textarea 
                    placeholder="Write your initial message to the artist..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Send Request</Button>
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
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="declined">Declined</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredCollaborations.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No collaborations found.</p>
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
                          collab.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
                          collab.status === 'Completed' ? 'bg-green-500/20 text-green-500' :
                          collab.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
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
                        <span>Last contact: {collab.lastContact}</span>
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
                      {selectedCollaboration.type} • Started on {selectedCollaboration.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Collaboration Status */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-2 rounded-full ${
                      selectedCollaboration.status === 'In Progress' ? 'bg-blue-500/20' :
                      selectedCollaboration.status === 'Completed' ? 'bg-green-500/20' :
                      selectedCollaboration.status === 'Pending' ? 'bg-yellow-500/20' :
                      'bg-red-500/20'
                    }`}>
                      {selectedCollaboration.status === 'In Progress' ? (
                        <Clock className="h-5 w-5 text-blue-500" />
                      ) : selectedCollaboration.status === 'Completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : selectedCollaboration.status === 'Pending' ? (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Status: {selectedCollaboration.status}</p>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {selectedCollaboration.lastContact}
                      </p>
                    </div>
                  </div>
                  
                  {/* Artist Info */}
                  {collaborationArtist && (
                    <div className="mb-6 p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Artist Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p>{collaborationArtist.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Followers</p>
                          <p>{formatNumber(collaborationArtist.followers)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Engagement</p>
                          <p>{collaborationArtist.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Genre</p>
                          <p>{collaborationArtist.genre}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Messages */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Conversation History</h3>
                    </div>
                    
                    <div className="p-4 h-[300px] overflow-y-auto space-y-4">
                      {collaborationMessages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'You' 
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
                          placeholder="Type your message..."
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
                <p className="text-muted-foreground">Select a collaboration to view details.</p>
              </div>
            )}
          </Card>
        </div>
        
        {/* Collaboration Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Collaboration Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Collaboration Type</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Avg. Response Time</TableHead>
                  <TableHead>Avg. Completion Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Contract Negotiation</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>75%</TableCell>
                  <TableCell>1.2 days</TableCell>
                  <TableCell>14 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Song Licensing</TableCell>
                  <TableCell>18</TableCell>
                  <TableCell>83%</TableCell>
                  <TableCell>0.8 days</TableCell>
                  <TableCell>7 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Feature Request</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>58%</TableCell>
                  <TableCell>1.5 days</TableCell>
                  <TableCell>21 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Album Production</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell>62%</TableCell>
                  <TableCell>1.1 days</TableCell>
                  <TableCell>45 days</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}