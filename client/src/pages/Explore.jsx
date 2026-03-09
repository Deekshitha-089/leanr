import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data
const categories = ["All", "Design", "Development", "Languages", "Marketing", "Music", "Business", "Lifestyle"];

const profiles = [
  {
    id: 1,
    name: "Alex Rivera",
    skills: ["UI Design", "Figma", "Prototyping"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Chen",
    skills: ["Python", "Data Science", "Calculus"],
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "James Wilson",
    skills: ["Piano", "Music Composition"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Emily Davis",
    skills: ["French", "Spanish", "Translation"],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Michael Brown",
    skills: ["Digital Marketing", "SEO"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Jessica Taylor",
    skills: ["Yoga", "Meditation", "Wellness"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
];

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="space-y-8">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="font-serif text-4xl text-[hsl(var(--marsala))] self-start md:self-auto">Explore</h1>
            
            <motion.div 
              animate={{ width: isSearchFocused ? 400 : 300 }}
              className="relative hidden md:block"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--marsala))]/40" />
              <Input 
                placeholder="Search skills, people, or topics..." 
                className="pl-10 rounded-full border-[hsl(var(--peach))] bg-white/50 focus:bg-white transition-all shadow-sm"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </motion.div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                  ${activeCategory === cat 
                    ? "bg-[hsl(var(--marsala))] text-white border-[hsl(var(--marsala))]" 
                    : "bg-white text-[hsl(var(--marsala))] border-[hsl(var(--peach))]/30 hover:border-[hsl(var(--peach))]"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {profiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] cursor-pointer"
                >
                  <img 
                    src={profile.image} 
                    alt={profile.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--marsala))]/90 via-[hsl(var(--marsala))]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="font-serif text-2xl font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{profile.name}</h3>
                    <div className="flex flex-wrap gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                      {profile.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-xs font-medium border border-white/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>
    </div>
  );
}