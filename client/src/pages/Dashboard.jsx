import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ChevronRight, MessageCircle } from "lucide-react";

// Mock Data
const matches = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Design Student",
    offers: ["UI Design", "Figma", "Prototyping"],
    wants: ["React", "TypeScript"],
    image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&h=400&fit=crop",
    matchScore: 95
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Comp Sci Major",
    offers: ["Python", "Data Science", "Calculus"],
    wants: ["Public Speaking", "Writing"],
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
    matchScore: 88
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Music Theory",
    offers: ["Piano", "Music Composition"],
    wants: ["Web Development", "CSS"],
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    matchScore: 82
  }
];

const sessions = [
  {
    id: 1,
    partner: "Alex Rivera",
    skill: "UI Design Basics",
    date: "Today, 4:00 PM",
    status: "upcoming"
  },
  {
    id: 2,
    partner: "Sarah Chen",
    skill: "Intro to Python",
    date: "Tomorrow, 2:00 PM",
    status: "confirmed"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Welcome Header */}
          <motion.div variants={itemVariants} className="flex justify-between items-end">
            <div>
              <h1 className="font-serif text-4xl text-[hsl(var(--marsala))]">Good afternoon, Jane.</h1>
              <p className="text-[hsl(var(--marsala))]/60 mt-2">You have 2 upcoming sessions this week.</p>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="hidden md:flex gap-2 rounded-full border-[hsl(var(--peach))] text-[hsl(var(--marsala))] hover:bg-[hsl(var(--rose-quartz))]/20">
                Explore New Skills <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Active Sessions */}
          <motion.section variants={itemVariants}>
             <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl text-[hsl(var(--marsala))]">Upcoming Sessions</h2>
              <Link href="/meets" className="text-sm text-[hsl(var(--cognac))] hover:underline">View Calendar</Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {sessions.map(session => (
                <div key={session.id} className="p-6 rounded-3xl bg-white border border-[hsl(var(--rose-quartz))] flex items-center justify-between shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--rose-quartz))]/30 flex items-center justify-center text-[hsl(var(--marsala))]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[hsl(var(--marsala))]">{session.skill}</h3>
                      <p className="text-sm text-[hsl(var(--marsala))]/60">with {session.partner} • {session.date}</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-[hsl(var(--rose-quartz))]/20 text-[hsl(var(--marsala))]">
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Suggested Matches */}
          <motion.section variants={itemVariants}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl text-[hsl(var(--marsala))]">Suggested Matches</h2>
              <p className="text-sm text-[hsl(var(--marsala))]/50">Based on your interests</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {matches.map((match) => (
                <motion.div 
                  key={match.id}
                  whileHover={{ y: -5 }}
                  className="rounded-[2rem] bg-white overflow-hidden border border-[hsl(var(--rose-quartz))]/50 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <Avatar className="w-14 h-14 border-2 border-[hsl(var(--rose-quartz))]">
                          <AvatarImage src={match.image} />
                          <AvatarFallback>NM</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-serif text-xl text-[hsl(var(--marsala))]">{match.name}</h3>
                          <p className="text-sm text-[hsl(var(--marsala))]/60">{match.role}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-[hsl(var(--rose-quartz))]/30 text-[hsl(var(--marsala))] hover:bg-[hsl(var(--rose-quartz))]/50">
                        {match.matchScore}% Match
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--marsala))]/40 mb-2">Can Teach You</p>
                        <div className="flex flex-wrap gap-2">
                          {match.offers.map(skill => (
                            <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-[hsl(var(--rose-quartz))]/20 text-[hsl(var(--marsala))]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--marsala))]/40 mb-2">Wants to Learn</p>
                        <div className="flex flex-wrap gap-2">
                          {match.wants.map(skill => (
                            <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-[hsl(var(--peach))]/20 text-[hsl(var(--cognac))]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full rounded-full bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))] text-white font-button shadow-md">
                        Connect
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}