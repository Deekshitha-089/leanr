import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Phone, Video, MoreVertical, MicOff, VideoOff, MonitorUp, MessageCircle } from "lucide-react";

// Mock Data
const conversations = [
  {
    id: 1,
    name: "Alex Rivera",
    lastMessage: "Sounds good! See you then.",
    time: "2m ago",
    unread: 1,
    image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Chen",
    lastMessage: "Can you help me with Python loops?",
    time: "1h ago",
    unread: 0,
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "James Wilson",
    lastMessage: "Thanks for the piano lesson!",
    time: "1d ago",
    unread: 0,
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop"
  }
];

const messages = [
  { id: 1, sender: "them", text: "Hey! Are we still on for 4pm today?", time: "2:30 PM" },
  { id: 2, sender: "me", text: "Yes, definitely! I've prepared some notes on UI composition.", time: "2:32 PM" },
  { id: 3, sender: "them", text: "Awesome. I'm really struggling with color theory specifically.", time: "2:33 PM" },
  { id: 4, sender: "me", text: "No worries, we can focus on that. I have a few exercises we can do together.", time: "2:34 PM" },
  { id: 5, sender: "them", text: "Sounds good! See you then.", time: "2:35 PM" }
];

// Video Call Modal
function VideoCallModal({ isOpen, onClose, partnerName }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isOpen) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6"
    >
      <div className="absolute top-8 left-8 text-white/50 text-sm font-medium tracking-widest uppercase">
        Leanr Session • Live
      </div>

      <div className="text-center space-y-4 mb-12">
        <Avatar className="w-32 h-32 mx-auto border-4 border-white/10 ring-4 ring-white/5 animate-pulse">
          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>

        <h2 className="text-3xl font-serif text-white">{partnerName}</h2>

        <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 font-mono text-lg">
          {formatTime(seconds)}
        </div>
      </div>

      <div className="w-full max-w-2xl aspect-video bg-gray-900 rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center text-white/30">
          (Video Feed Placeholder)
        </div>
        <div className="absolute bottom-4 right-4 w-32 h-24 bg-black rounded-lg border border-white/20 shadow-lg"></div>
      </div>

      <div className="fixed bottom-12 flex items-center gap-6">
        <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white">
          <MicOff className="w-6 h-6" />
        </Button>

        <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white">
          <VideoOff className="w-6 h-6" />
        </Button>

        <Button
          onClick={onClose}
          variant="destructive"
          size="icon"
          className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
        >
          <Phone className="w-8 h-8 rotate-135" />
        </Button>

        <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white">
          <MonitorUp className="w-6 h-6" />
        </Button>

        <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </motion.div>
  );
}

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-6 px-6 max-w-7xl mx-auto w-full flex gap-6 h-[calc(100vh-24px)]">

        {/* Sidebar */}
        <div className="w-80 hidden md:flex flex-col gap-4 bg-white rounded-[2rem] p-6 shadow-sm border border-[hsl(var(--rose-quartz))]/30 h-full">
          <h2 className="font-serif text-2xl text-[hsl(var(--marsala))] px-2">Messages</h2>

          <Input placeholder="Search messages..." className="bg-[hsl(var(--rose-quartz))]/10 border-transparent focus:bg-white rounded-xl" />

          <ScrollArea className="flex-1 -mx-2 px-2">
            <div className="space-y-2">
              {conversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 text-left
                    ${selectedChat.id === chat.id
                      ? "bg-[hsl(var(--rose-quartz))]/30 shadow-sm"
                      : "hover:bg-gray-50"
                    }`}
                >
                  <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                    <AvatarImage src={chat.image} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-[hsl(var(--marsala))]">{chat.name}</span>
                      <span className="text-xs text-[hsl(var(--marsala))]/40">{chat.time}</span>
                    </div>

                    <p className="text-sm text-[hsl(var(--marsala))]/60">{chat.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-[hsl(var(--rose-quartz))]/30 flex flex-col overflow-hidden">

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm
                    ${msg.sender === "me"
                      ? "bg-[hsl(var(--marsala))] text-white"
                      : "bg-white border border-[hsl(var(--rose-quartz))]/30"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
              />

              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </main>

      <AnimatePresence>
        {isVideoCallOpen && (
          <VideoCallModal
            isOpen={isVideoCallOpen}
            onClose={() => setIsVideoCallOpen(false)}
            partnerName={selectedChat.name}
          />
        )}
      </AnimatePresence>
    </div>
  );
}