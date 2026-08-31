import { motion } from "framer-motion";
import { Link } from "wouter";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  Calendar,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Plus,
  CheckCircle2,
  Users,
} from "lucide-react";

/* =========================================================
   TEMPORARY DATA
   ---------------------------------------------------------
   This will later come from the backend/database.
========================================================= */

const user = {
  name: "Deekshitha",

  learning: [
    {
      id: 1,
      skill: "React",
      teacher: "Alex Rivera",
      progress: 70,
      update: "Updated by Alex after your last session",
    },
    {
      id: 2,
      skill: "UI/UX Design",
      teacher: "Sarah Chen",
      progress: 40,
      update: "Updated by Sarah 2 days ago",
    },
  ],

  teaching: [
    "Python",
    "Web Development",
    "Java",
  ],
};


/* =========================================================
   UPCOMING SESSIONS
========================================================= */

const sessions = [
  {
    id: 1,
    partner: "Alex Rivera",
    skill: "UI Design Basics",
    date: "Today",
    time: "4:00 PM",
    image:
      "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    partner: "Sarah Chen",
    skill: "Intro to Python",
    date: "Tomorrow",
    time: "2:00 PM",
    image:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
  },
];


/* =========================================================
   PEOPLE YOU MIGHT LEARN FROM
========================================================= */

const suggestedPeople = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Design Student",
    teaches: ["UI Design", "Figma"],
    wants: ["React", "TypeScript"],
    match: 95,
    image:
      "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Computer Science",
    teaches: ["Python", "Data Science"],
    wants: ["Writing", "Public Speaking"],
    match: 88,
    image:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Music Theory",
    teaches: ["Piano", "Composition"],
    wants: ["Web Development", "CSS"],
    match: 82,
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
  },
];


/* =========================================================
   RECENT MESSAGES
========================================================= */

const recentMessages = [
  {
    id: 1,
    name: "Alex Rivera",
    message: "Are you free tomorrow for our session?",
    time: "10m",
    unread: true,
    image:
      "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Chen",
    message: "Thanks for helping me with React!",
    time: "1h",
    unread: true,
    image:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "James Wilson",
    message: "That sounds great!",
    time: "Yesterday",
    unread: false,
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
  },
];


/* =========================================================
   YOUR ACTIVITY
========================================================= */

const activities = [
  {
    id: 1,
    icon: CheckCircle2,
    title: "Completed a React learning session",
    time: "Yesterday",
  },
  {
    id: 2,
    icon: Users,
    title: "Connected with Sarah Chen",
    time: "2 days ago",
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "Added Machine Learning to your learning goals",
    time: "3 days ago",
  },
  {
    id: 4,
    icon: BookOpen,
    title: "Your React progress was updated",
    time: "4 days ago",
  },
];


/* =========================================================
   ANIMATIONS
========================================================= */

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};


/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-button">

      {/* =====================================================
          MAIN NAVBAR
          Explore is already in the Navbar component.
      ====================================================== */}

      <Navbar />


      {/* =====================================================
          DASHBOARD CONTENT
      ====================================================== */}

      <main className="pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >

          {/* =================================================
              1. WELCOME
          ================================================== */}

          <motion.section variants={itemVariants}>

            <p className="font-button text-sm text-[hsl(var(--cognac))] mb-2">
              Welcome back
            </p>

            <h1 className="font-button text-3xl sm:text-4xl md:text-5xl font-semibold text-[hsl(var(--marsala))]">
              Good afternoon, {user.name}.
            </h1>

            <p className="font-button text-base text-[hsl(var(--marsala))]/60 mt-3">
              Learn what you lack. Teach what you know. Grow together.
            </p>

          </motion.section>


          {/* =================================================
              2 + 3. YOUR LEARNING / WHAT YOU TEACH
          ================================================== */}

          <motion.section variants={itemVariants}>

            <div className="grid lg:grid-cols-3 gap-6">


              {/* =================================================
                  YOUR LEARNING
              ================================================== */}

              <div className="lg:col-span-2 bg-white rounded-3xl border border-[hsl(var(--rose-quartz))] p-6 sm:p-7 shadow-sm">

                <div className="flex items-center justify-between mb-7">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-2xl bg-[hsl(var(--rose-quartz))]/30 flex items-center justify-center">

                      <BookOpen className="w-5 h-5 text-[hsl(var(--marsala))]" />

                    </div>

                    <div>

                      <h2 className="font-button text-xl font-semibold text-[hsl(var(--marsala))]">
                        Your Learning
                      </h2>

                      <p className="font-button text-sm text-[hsl(var(--marsala))]/50">
                        Skills you are currently learning
                      </p>

                    </div>

                  </div>


                  <Link href="/learning">

                    <button className="font-button text-sm text-[hsl(var(--cognac))] hover:underline">
                      Manage
                    </button>

                  </Link>

                </div>


                <div className="space-y-7">

                  {user.learning.map((skill) => (

                    <div key={skill.id}>

                      <div className="flex items-center justify-between gap-4 mb-2">

                        <div>

                          <p className="font-button text-sm font-semibold text-[hsl(var(--marsala))]">
                            {skill.skill}
                          </p>

                          <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-1">
                            Learning with {skill.teacher}
                          </p>

                        </div>


                        <span className="font-button text-sm text-[hsl(var(--cognac))]">
                          {skill.progress}%
                        </span>

                      </div>


                      <div className="h-2 rounded-full bg-[hsl(var(--rose-quartz))]/30 overflow-hidden">

                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${skill.progress}%`,
                          }}
                          transition={{
                            duration: 1,
                          }}
                          className="h-full rounded-full bg-[hsl(var(--marsala))]"
                        />

                      </div>


                      <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-2">
                        {skill.update}
                      </p>

                    </div>

                  ))}

                </div>

              </div>


              {/* =================================================
                  WHAT YOU TEACH
              ================================================== */}

              <div className="bg-[hsl(var(--marsala))] rounded-3xl p-6 sm:p-7 text-white">

                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-5">

                  <GraduationCap className="w-5 h-5" />

                </div>


                <h2 className="font-button text-xl font-semibold">
                  What You Teach
                </h2>


                <p className="font-button text-sm text-white/60 mt-2 leading-relaxed">
                  Share what you know and help someone else learn.
                </p>


                <div className="flex flex-wrap gap-2 mt-6">

                  {user.teaching.map((skill) => (

                    <span
                      key={skill}
                      className="font-button px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm"
                    >
                      {skill}
                    </span>

                  ))}

                </div>


                <Link href="/profile-setup">

                  <Button
                    variant="outline"
                    className="w-full mt-7 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 font-button"
                  >

                    <Plus className="w-4 h-4 mr-2" />

                    Add a Skill

                  </Button>

                </Link>

              </div>

            </div>

          </motion.section>


          {/* =================================================
              4. UPCOMING SESSIONS
          ================================================== */}

          <motion.section variants={itemVariants}>

            <div className="flex items-end justify-between mb-5">

              <div>

                <h2 className="font-button text-2xl font-semibold text-[hsl(var(--marsala))]">
                  Upcoming Sessions
                </h2>

                <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-1">
                  Your upcoming learning sessions.
                </p>

              </div>


              <Link href="/meets">

                <button className="font-button text-sm text-[hsl(var(--cognac))] hover:underline">
                  View all →
                </button>

              </Link>

            </div>


            <div className="grid md:grid-cols-2 gap-5">

              {sessions.map((session) => (

                <div
                  key={session.id}
                  className="bg-white rounded-3xl border border-[hsl(var(--rose-quartz))] p-5 shadow-sm hover:shadow-md transition-all"
                >

                  <div className="flex items-center gap-4">

                    <Avatar className="w-12 h-12 border-2 border-[hsl(var(--rose-quartz))]">

                      <AvatarImage src={session.image} />

                      <AvatarFallback>
                        {session.partner
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>

                    </Avatar>


                    <div className="flex-1">

                      <p className="font-button text-xs text-[hsl(var(--cognac))]">
                        {session.date} · {session.time}
                      </p>

                      <h3 className="font-button text-lg font-semibold text-[hsl(var(--marsala))] mt-1">
                        {session.skill}
                      </h3>

                      <p className="font-button text-sm text-[hsl(var(--marsala))]/50">
                        with {session.partner}
                      </p>

                    </div>


                    <Calendar className="w-5 h-5 text-[hsl(var(--marsala))]/40" />

                  </div>

                </div>

              ))}

            </div>

          </motion.section>


          {/* =================================================
              5. PEOPLE YOU MIGHT LEARN FROM
          ================================================== */}

          <motion.section variants={itemVariants}>

            <div className="flex items-end justify-between mb-5">

              <div>

                <h2 className="font-button text-2xl font-semibold text-[hsl(var(--marsala))]">
                  People You Might Learn From
                </h2>

                <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-1">
                  People who can teach skills you want to learn.
                </p>

              </div>


              <Link href="/matches">

                <button className="font-button text-sm text-[hsl(var(--cognac))] hover:underline">
                  See all →
                </button>

              </Link>

            </div>


            <div className="grid md:grid-cols-3 gap-5">

              {suggestedPeople.map((person) => (

                <motion.div
                  key={person.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl border border-[hsl(var(--rose-quartz))] p-6 shadow-sm hover:shadow-lg transition-all"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <Avatar className="w-12 h-12 border-2 border-[hsl(var(--rose-quartz))]">

                        <AvatarImage src={person.image} />

                        <AvatarFallback>
                          {person.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>

                      </Avatar>


                      <div>

                        <h3 className="font-button text-base font-semibold text-[hsl(var(--marsala))]">
                          {person.name}
                        </h3>

                        <p className="font-button text-xs text-[hsl(var(--marsala))]/50">
                          {person.role}
                        </p>

                      </div>

                    </div>


                    <Badge className="font-button bg-[hsl(var(--rose-quartz))]/30 text-[hsl(var(--marsala))] hover:bg-[hsl(var(--rose-quartz))]/40">
                      {person.match}%
                    </Badge>

                  </div>


                  <div className="mt-5">

                    <p className="font-button text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--marsala))]/40 mb-2">
                      Can Teach You
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {person.teaches.map((skill) => (

                        <span
                          key={skill}
                          className="font-button px-2.5 py-1 rounded-full text-xs bg-[hsl(var(--rose-quartz))]/20 text-[hsl(var(--marsala))]"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                  </div>


                  <div className="mt-4">

                    <p className="font-button text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--marsala))]/40 mb-2">
                      Wants to Learn
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {person.wants.map((skill) => (

                        <span
                          key={skill}
                          className="font-button px-2.5 py-1 rounded-full text-xs bg-[hsl(var(--peach))]/20 text-[hsl(var(--cognac))]"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                  </div>


                  <Button
                    className="w-full mt-6 rounded-full bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))] text-white font-button"
                  >
                    View Profile
                  </Button>

                </motion.div>

              ))}

            </div>

          </motion.section>


          {/* =================================================
              6 + 7. RECENT MESSAGES + YOUR ACTIVITY
          ================================================== */}

          <motion.section
            variants={itemVariants}
            className="grid lg:grid-cols-2 gap-6"
          >


            {/* =================================================
                RECENT MESSAGES
            ================================================== */}

            <div className="bg-white rounded-3xl border border-[hsl(var(--rose-quartz))] p-6">

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--rose-quartz))]/30 flex items-center justify-center">

                    <MessageCircle className="w-5 h-5 text-[hsl(var(--marsala))]" />

                  </div>


                  <div>

                    <h2 className="font-button text-lg font-semibold text-[hsl(var(--marsala))]">
                      Recent Messages
                    </h2>

                    <p className="font-button text-xs text-[hsl(var(--marsala))]/50">
                      Your latest conversations.
                    </p>

                  </div>

                </div>


                <Link href="/chat">

                  <button className="font-button text-sm text-[hsl(var(--cognac))] hover:underline">
                    Open Chat
                  </button>

                </Link>

              </div>


              <div className="space-y-1">

                {recentMessages.map((message) => (

                  <Link href="/chat" key={message.id}>

                    <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[hsl(var(--rose-quartz))]/15 transition-colors cursor-pointer">

                      <Avatar className="w-11 h-11">

                        <AvatarImage src={message.image} />

                        <AvatarFallback>
                          {message.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>

                      </Avatar>


                      <div className="flex-1 min-w-0">

                        <div className="flex items-center justify-between gap-2">

                          <h3 className="font-button text-sm font-medium text-[hsl(var(--marsala))]">
                            {message.name}
                          </h3>

                          <span className="font-button text-[10px] text-[hsl(var(--marsala))]/40">
                            {message.time}
                          </span>

                        </div>


                        <p className="font-button text-xs text-[hsl(var(--marsala))]/50 truncate mt-1">
                          {message.message}
                        </p>

                      </div>


                      {message.unread && (
                        <span className="w-2 h-2 rounded-full bg-[hsl(var(--cognac))]" />
                      )}

                    </div>

                  </Link>

                ))}

              </div>

            </div>



            {/* =================================================
                YOUR ACTIVITY
            ================================================== */}

            <div className="bg-white rounded-3xl border border-[hsl(var(--rose-quartz))] p-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--peach))]/30 flex items-center justify-center">

                  <BookOpen className="w-5 h-5 text-[hsl(var(--cognac))]" />

                </div>


                <div>

                  <h2 className="font-button text-lg font-semibold text-[hsl(var(--marsala))]">
                    Your Activity
                  </h2>

                  <p className="font-button text-xs text-[hsl(var(--marsala))]/50">
                    What's happening in your LEANR journey.
                  </p>

                </div>

              </div>


              <div className="space-y-5">

                {activities.map((activity) => {

                  const Icon = activity.icon;

                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4"
                    >

                      <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/25 flex items-center justify-center shrink-0">

                        <Icon className="w-4 h-4 text-[hsl(var(--marsala))]" />

                      </div>


                      <div>

                        <p className="font-button text-sm text-[hsl(var(--marsala))]">
                          {activity.title}
                        </p>

                        <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
                          {activity.time}
                        </p>

                      </div>

                    </div>
                  );

                })}

              </div>

            </div>

          </motion.section>

        </motion.div>

      </main>

    </div>
  );
}