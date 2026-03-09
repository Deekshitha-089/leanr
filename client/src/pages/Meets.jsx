import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, CheckCircle2, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data
const schedule = [
  {
    day: "Today",
    sessions: [
      {
        id: 1,
        partner: "Alex Rivera",
        role: "Design Student",
        image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&h=400&fit=crop",
        time: "4:00 PM",
        duration: "45 min",
        skill: "UI Design Basics",
        status: "upcoming"
      }
    ]
  },
  {
    day: "Tomorrow",
    sessions: [
      {
        id: 2,
        partner: "Sarah Chen",
        role: "Comp Sci Major",
        image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
        time: "2:00 PM",
        duration: "60 min",
        skill: "Intro to Python",
        status: "confirmed"
      }
    ]
  },
  {
    day: "Fri, Oct 24",
    sessions: [
      {
        id: 3,
        partner: "James Wilson",
        role: "Music Theory",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
        time: "11:00 AM",
        duration: "30 min",
        skill: "Piano Basics",
        status: "pending"
      }
    ]
  }
];

export default function Meets() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h1 className="font-serif text-4xl text-[hsl(var(--marsala))]">Your Meets</h1>
          <Button className="rounded-full bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))]">
            Schedule New
          </Button>
        </div>

        <div className="space-y-12 relative">
          <div className="absolute left-[19px] top-4 bottom-0 w-[2px] bg-[hsl(var(--rose-quartz))]/50 hidden md:block" />

          {schedule.map((group, groupIdx) => (
            <motion.div 
              key={group.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.1 }}
              className="relative"
            >
              <h2 className="font-display text-xl text-[hsl(var(--marsala))]/60 mb-6 pl-0 md:pl-12 sticky top-24 bg-[#faf9f6] z-10 py-2 w-max">
                {group.day}
              </h2>
              
              <div className="space-y-4 pl-0 md:pl-12">
                {group.sessions.map((session) => (
                  <div 
                    key={session.id}
                    className="relative bg-white rounded-3xl p-6 border border-[hsl(var(--rose-quartz))]/50 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="absolute left-[-35px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[hsl(var(--marsala))] bg-white hidden md:block group-hover:bg-[hsl(var(--marsala))] transition-colors" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <Avatar className="w-14 h-14 border border-[hsl(var(--rose-quartz))]">
                          <AvatarImage src={session.image} />
                          <AvatarFallback>{session.partner[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-serif text-lg text-[hsl(var(--marsala))]">{session.skill}</h3>
                          <p className="text-sm text-[hsl(var(--marsala))]/60">with {session.partner}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--marsala))]/70 bg-[hsl(var(--rose-quartz))]/10 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4" />
                          {session.time} ({session.duration})
                        </div>
                        
                        {session.status === "upcoming" ? (
                          <Button size="sm" className="rounded-full bg-[hsl(var(--marsala))] text-white hover:bg-[hsl(var(--cognac))] px-6">
                            Join Call <Video className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled className="rounded-full border-[hsl(var(--peach))] text-[hsl(var(--marsala))]/40">
                            {session.status}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}