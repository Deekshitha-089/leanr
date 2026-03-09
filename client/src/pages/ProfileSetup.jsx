import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

// Tag Input Component
function TagInput({
  label,
  placeholder,
  tags,
  setTags,
  color
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const colorClasses = color === "marsala"
    ? "bg-[hsl(var(--marsala))] text-white"
    : "bg-[hsl(var(--peach))] text-[hsl(var(--marsala))]";

  return (
    <div className="space-y-3">
      <Label className="text-lg font-serif text-[hsl(var(--marsala))]">{label}</Label>
      <div className="flex flex-wrap gap-2 min-h-[50px] p-2 rounded-xl border border-[hsl(var(--peach))] bg-white/50 focus-within:ring-2 ring-[hsl(var(--marsala))]/20 transition-all">
        <AnimatePresence>
          {tags.map(tag => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${colorClasses}`}
            >
              {tag}
              <button onClick={() => removeTag(tag)} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent border-none outline-none min-w-[120px] text-sm p-1.5"
        />
      </div>
      <p className="text-xs text-[hsl(var(--marsala))]/50">Press Enter to add a skill</p>
    </div>
  );
}

export default function ProfileSetup() {
  const [_, setLocation] = useLocation();
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [step, setStep] = useState(1);

  const handleComplete = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-24 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl text-[hsl(var(--marsala))]">
              Let's build your profile
            </h1>
            <p className="text-lg text-[hsl(var(--marsala))]/60 max-w-xl mx-auto">
              Leanr connects you based on what you know and what you want to discover.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6 rounded-3xl bg-white border border-[hsl(var(--rose-quartz))] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--marsala))]/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <TagInput
                  label="I can teach..."
                  placeholder="e.g. Calculus, Guitar, Photoshop"
                  tags={teachSkills}
                  setTags={setTeachSkills}
                  color="marsala"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-6 rounded-3xl bg-white border border-[hsl(var(--rose-quartz))] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--peach))]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <TagInput
                  label="I want to learn..."
                  placeholder="e.g. French, Coding, Cooking"
                  tags={learnSkills}
                  setTags={setLearnSkills}
                  color="peach"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleComplete}
              disabled={teachSkills.length === 0 || learnSkills.length === 0}
              className="h-14 px-12 rounded-full bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))] text-white text-lg font-button shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              Complete Profile <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}