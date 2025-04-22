import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { ChatData, UserData } from "../../lib/types";
import chatService from "../../api/services/chatService";
import ChatWindow from "../../components/chat/ChatWindow";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import dermotologistService from "../../api/services/dermotologistService";

export default function Chat() {
  const { setIsLoading } = useContext(AppContext);
  const [chats, setChats] = useState<ChatData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);
  const [dermatologists, setDermatologists] = useState<UserData[]>([]);
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);

  useEffect(() => {
    fetchChats();
    fetchDermatologists();
  }, []);

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const data = await chatService.getChats();
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Failed to load chats");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDermatologists = async () => {
    try {
      const data = await dermotologistService.getPatients();
      setDermatologists(data);
    } catch (error) {
      console.error("Error fetching dermatologists:", error);
      toast.error("Failed to load dermatologists");
    }
  };

  const handleStartChat = async (dermatologistId: string) => {
    try {
      setIsLoading(true);
      const chatId = await chatService.createChat(dermatologistId);
      await fetchChats();
      const newChat = chats.find((chat) => chat.id === chatId);
      if (newChat) {
        setSelectedChat(newChat);
      }
      setIsNewChatDialogOpen(false);
      toast.success("Chat started successfully");
    } catch (error) {
      console.error("Error starting chat:", error);
      toast.error("Failed to start chat");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.dermatologist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container h-[calc(100vh-4rem)] px-4 py-8 mx-auto">
      <div className="flex h-full overflow-hidden border rounded-lg">
        {/* Chat List */}
        <div className="w-full border-r md:w-80">
          <div className="flex flex-col h-full">
            <div className="p-4 space-y-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Messages</h2>
                <Dialog
                  open={isNewChatDialogOpen}
                  onOpenChange={setIsNewChatDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start New Chat</DialogTitle>
                      <DialogDescription>
                        Choose a dermatologist to start a consultation
                      </DialogDescription>
                    </DialogHeader>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dermatologists.map((dermatologist) => (
                            <TableRow key={dermatologist.id}>
                              <TableCell className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarImage src={dermatologist.image} />
                                  <AvatarFallback>
                                    {dermatologist.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">
                                    {dermatologist.name}
                                  </p>
                                  <p className="text-sm text-foreground/70">
                                    {dermatologist.email}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleStartChat(dermatologist.id)
                                  }
                                >
                                  Start Chat
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-foreground/50" />
                <Input
                  className="pl-10"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className="flex items-start justify-start w-full gap-3 p-4 h-fit hover:bg-muted"
                  onClick={() => setSelectedChat(chat)}
                >
                  <Avatar>
                    <AvatarImage src={chat.dermatologist.image} />
                    <AvatarFallback>
                      {chat.dermatologist.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{chat.dermatologist.name}</p>
                    {chat.messages && chat.messages.length > 0 && (
                      <p className="text-sm text-foreground/70">
                        {chat.messages[chat.messages.length - 1].content}
                      </p>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 hidden md:block">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h3 className="mb-2 text-lg font-medium">Select a chat</h3>
              <p className="text-sm text-foreground/70">
                Choose a conversation or start a new one
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsNewChatDialogOpen(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
