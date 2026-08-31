import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Users,
  Sparkles,
} from "lucide-react";


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All",
  "Technology",
  "Design",
  "Languages",
  "Business",
  "Academics",
  "Music",
  "Lifestyle",
];


/* =========================================================
   MOCK PROFILES
========================================================= */

const profiles = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Design Student",
    location: "Hyderabad",
    bio: "I love turning ideas into simple, beautiful digital experiences.",
    teaches: ["UI Design", "Figma", "Prototyping"],
    wants: ["React", "TypeScript"],
    category: "Design",
    level: "Intermediate",
    availability: "Weekends",
    match: 95,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop",
  },

  {
    id: 2,
    name: "Sarah Chen",
    role: "Computer Science Student",
    location: "Bangalore",
    bio: "Exploring data, programming and everything that makes technology interesting.",
    teaches: ["Python", "Data Science", "Calculus"],
    wants: ["Writing", "Public Speaking"],
    category: "Technology",
    level: "Advanced",
    availability: "Evenings",
    match: 91,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop",
  },

  {
    id: 3,
    name: "James Wilson",
    role: "Music Student",
    location: "Chennai",
    bio: "Pianist and music enthusiast who enjoys teaching composition.",
    teaches: ["Piano", "Music Composition"],
    wants: ["Web Development", "CSS"],
    category: "Music",
    level: "Advanced",
    availability: "Weekends",
    match: 82,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop",
  },

  {
    id: 4,
    name: "Emily Davis",
    role: "Language Student",
    location: "Mumbai",
    bio: "Languages are my favorite way to understand different cultures.",
    teaches: ["French", "Spanish", "Translation"],
    wants: ["UI Design"],
    category: "Languages",
    level: "Advanced",
    availability: "Evenings",
    match: 87,
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=500&fit=crop",
  },

  {
    id: 5,
    name: "Michael Brown",
    role: "Marketing Student",
    location: "Delhi",
    bio: "Learning how brands grow while helping others understand digital marketing.",
    teaches: ["Digital Marketing", "SEO", "Content Strategy"],
    wants: ["Python", "Data Analytics"],
    category: "Business",
    level: "Intermediate",
    availability: "Evenings",
    match: 79,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
  },

  {
    id: 6,
    name: "Jessica Taylor",
    role: "Wellness Enthusiast",
    location: "Pune",
    bio: "Helping people build healthier routines through movement and mindfulness.",
    teaches: ["Yoga", "Meditation", "Wellness"],
    wants: ["Nutrition", "Photography"],
    category: "Lifestyle",
    level: "Intermediate",
    availability: "Mornings",
    match: 74,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop",
  },

  {
    id: 7,
    name: "Daniel Lee",
    role: "Software Developer",
    location: "Hyderabad",
    bio: "Full-stack developer interested in building products and teaching programming.",
    teaches: ["React", "JavaScript", "Node.js"],
    wants: ["UI/UX", "Figma"],
    category: "Technology",
    level: "Advanced",
    availability: "Weekends",
    match: 96,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },

  {
    id: 8,
    name: "Priya Sharma",
    role: "Business Student",
    location: "Hyderabad",
    bio: "Interested in entrepreneurship, communication and building meaningful ideas.",
    teaches: ["Business Strategy", "Presentation", "Marketing"],
    wants: ["Python", "Web Development"],
    category: "Business",
    level: "Intermediate",
    availability: "Evenings",
    match: 84,
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=500&fit=crop",
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
      staggerChildren: 0.06,
    },
  },
};


const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};


/* =========================================================
   EXPLORE
========================================================= */

export default function Explore() {

  const [
    activeCategory,
    setActiveCategory,
  ] = useState("All");


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    showFilters,
    setShowFilters,
  ] = useState(false);


  const [
    selectedLevel,
    setSelectedLevel,
  ] = useState("All");


  const [
    selectedAvailability,
    setSelectedAvailability,
  ] = useState("All");


  /* =======================================================
     FILTER PROFILES
  ======================================================= */

  const filteredProfiles =
    useMemo(() => {

      return profiles.filter(
        (profile) => {

          const searchText =
            search
              .toLowerCase()
              .trim();


          const matchesSearch =
            !searchText ||
            profile.name
              .toLowerCase()
              .includes(
                searchText
              ) ||
            profile.role
              .toLowerCase()
              .includes(
                searchText
              ) ||
            profile.bio
              .toLowerCase()
              .includes(
                searchText
              ) ||
            profile.teaches.some(
              (skill) =>
                skill
                  .toLowerCase()
                  .includes(
                    searchText
                  )
            ) ||
            profile.wants.some(
              (skill) =>
                skill
                  .toLowerCase()
                  .includes(
                    searchText
                  )
            );


          const matchesCategory =
            activeCategory ===
              "All" ||
            profile.category ===
              activeCategory;


          const matchesLevel =
            selectedLevel ===
              "All" ||
            profile.level ===
              selectedLevel;


          const matchesAvailability =
            selectedAvailability ===
              "All" ||
            profile.availability ===
              selectedAvailability;


          return (
            matchesSearch &&
            matchesCategory &&
            matchesLevel &&
            matchesAvailability
          );

        }
      );

    }, [
      search,
      activeCategory,
      selectedLevel,
      selectedAvailability,
    ]);


  /* =======================================================
     RETURN
  ======================================================= */

  return (

    <div className="min-h-screen bg-[#faf9f6] font-button">

      <Navbar />


      <main className="pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-9"
        >


          {/* =================================================
              HEADER
          ================================================= */}

          <motion.section
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          >

            <div>

              <p className="font-button text-sm text-[hsl(var(--cognac))] mb-2">
                Discover your next exchange
              </p>


              <h1 className="font-button text-3xl sm:text-4xl md:text-5xl font-semibold text-[hsl(var(--marsala))]">
                Explore
              </h1>


              <p className="font-button text-base text-[hsl(var(--marsala))]/60 mt-3 max-w-2xl leading-relaxed">
                Find people who can teach what you
                want to learn — and discover what
                you can teach in return.
              </p>

            </div>


            {/* QUICK STATS */}

            <div className="flex items-center gap-3">

              <div className="px-4 py-3 rounded-2xl bg-white border border-[hsl(var(--rose-quartz))]">

                <p className="font-button text-lg font-semibold text-[hsl(var(--marsala))]">
                  {profiles.length}
                </p>

                <p className="font-button text-[10px] uppercase tracking-wide text-[hsl(var(--marsala))]/40">
                  People
                </p>

              </div>


              <div className="px-4 py-3 rounded-2xl bg-white border border-[hsl(var(--rose-quartz))]">

                <p className="font-button text-lg font-semibold text-[hsl(var(--marsala))]">
                  {categories.length - 1}
                </p>

                <p className="font-button text-[10px] uppercase tracking-wide text-[hsl(var(--marsala))]/40">
                  Categories
                </p>

              </div>

            </div>

          </motion.section>



          {/* =================================================
              SEARCH
          ================================================== */}

          <motion.section variants={itemVariants}>

            <div className="flex flex-col md:flex-row gap-3">

              <div className="relative flex-1">

                <Search
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-5
                    h-5
                    text-[hsl(var(--marsala))]/40
                  "
                />


                <Input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search skills, people, or topics..."
                  className="
                    h-12
                    pl-12
                    pr-12
                    rounded-full
                    border-[hsl(var(--peach))]
                    bg-white
                    font-button
                    shadow-sm
                    focus:bg-white
                  "
                />


                {search && (

                  <button
                    onClick={() =>
                      setSearch("")
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-[hsl(var(--marsala))]/40
                      hover:text-[hsl(var(--marsala))]
                    "
                  >

                    <X className="w-4 h-4" />

                  </button>

                )}

              </div>


              <Button
                variant="outline"
                onClick={() =>
                  setShowFilters(
                    !showFilters
                  )
                }
                className="
                  h-12
                  rounded-full
                  px-5
                  border-[hsl(var(--peach))]
                  bg-white
                  text-[hsl(var(--marsala))]
                  hover:bg-[hsl(var(--rose-quartz))]/20
                  font-button
                "
              >

                <SlidersHorizontal className="w-4 h-4 mr-2" />

                Filters

              </Button>

            </div>

          </motion.section>



          {/* =================================================
              FILTER PANEL
          ================================================== */}

          <AnimatePresence>

            {showFilters && (

              <motion.section
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="overflow-hidden"
              >

                <div className="bg-white rounded-3xl border border-[hsl(var(--rose-quartz))] p-6">

                  <div className="grid md:grid-cols-2 gap-6">


                    {/* LEVEL */}

                    <div>

                      <p className="font-button text-sm font-semibold text-[hsl(var(--marsala))] mb-3">
                        Experience Level
                      </p>


                      <div className="flex flex-wrap gap-2">

                        {[
                          "All",
                          "Beginner",
                          "Intermediate",
                          "Advanced",
                        ].map(
                          (level) => (

                            <button
                              key={level}
                              onClick={() =>
                                setSelectedLevel(
                                  level
                                )
                              }
                              className={`
                                font-button
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                border
                                transition-all
                                ${
                                  selectedLevel ===
                                  level
                                    ? "bg-[hsl(var(--marsala))] text-white border-[hsl(var(--marsala))]"
                                    : "bg-white text-[hsl(var(--marsala))] border-[hsl(var(--peach))]/40 hover:border-[hsl(var(--peach))]"
                                }
                              `}
                            >
                              {level}
                            </button>

                          )
                        )}

                      </div>

                    </div>



                    {/* AVAILABILITY */}

                    <div>

                      <p className="font-button text-sm font-semibold text-[hsl(var(--marsala))] mb-3">
                        Availability
                      </p>


                      <div className="flex flex-wrap gap-2">

                        {[
                          "All",
                          "Mornings",
                          "Evenings",
                          "Weekends",
                        ].map(
                          (
                            availability
                          ) => (

                            <button
                              key={
                                availability
                              }
                              onClick={() =>
                                setSelectedAvailability(
                                  availability
                                )
                              }
                              className={`
                                font-button
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                border
                                transition-all
                                ${
                                  selectedAvailability ===
                                  availability
                                    ? "bg-[hsl(var(--marsala))] text-white border-[hsl(var(--marsala))]"
                                    : "bg-white text-[hsl(var(--marsala))] border-[hsl(var(--peach))]/40 hover:border-[hsl(var(--peach))]"
                                }
                              `}
                            >
                              {availability}
                            </button>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </motion.section>

            )}

          </AnimatePresence>



          {/* =================================================
              CATEGORIES
          ================================================== */}

          <motion.section variants={itemVariants}>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">

              {categories.map(
                (category) => (

                  <button
                    key={category}
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={`
                      font-button
                      shrink-0
                      px-5
                      py-2.5
                      rounded-full
                      text-sm
                      border
                      transition-all
                      duration-300
                      ${
                        activeCategory ===
                        category
                          ? "bg-[hsl(var(--marsala))] text-white border-[hsl(var(--marsala))] shadow-sm"
                          : "bg-white text-[hsl(var(--marsala))] border-[hsl(var(--peach))]/40 hover:border-[hsl(var(--peach))]"
                      }
                    `}
                  >
                    {category}
                  </button>

                )
              )}

            </div>

          </motion.section>



          {/* =================================================
              RESULTS HEADER
          ================================================== */}

          <motion.section
            variants={itemVariants}
            className="flex items-center justify-between"
          >

            <div>

              <h2 className="font-button text-xl font-semibold text-[hsl(var(--marsala))]">
                People to explore
              </h2>


              <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-1">
                {filteredProfiles.length} people found
              </p>

            </div>


            {(search ||
              activeCategory !==
                "All" ||
              selectedLevel !==
                "All" ||
              selectedAvailability !==
                "All") && (

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory(
                    "All"
                  );
                  setSelectedLevel(
                    "All"
                  );
                  setSelectedAvailability(
                    "All"
                  );
                }}
                className="font-button text-sm text-[hsl(var(--cognac))] hover:underline"
              >
                Clear filters
              </button>

            )}

          </motion.section>



          {/* =================================================
              PEOPLE GRID
          ================================================== */}

          {filteredProfiles.length >
          0 ? (

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >

              <AnimatePresence mode="popLayout">

                {filteredProfiles.map(
                  (profile) => (

                    <motion.article
                      key={
                        profile.id
                      }
                      layout
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      whileHover={{
                        y: -5,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="
                        group
                        bg-white
                        rounded-[2rem]
                        overflow-hidden
                        border
                        border-[hsl(var(--rose-quartz))]
                        shadow-sm
                        hover:shadow-xl
                        transition-shadow
                      "
                    >


                      {/* =================================================
                          IMAGE
                      ================================================== */}

                      <div className="relative h-64 overflow-hidden">

                        <img
                          src={
                            profile.image
                          }
                          alt={
                            profile.name
                          }
                          className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                        />


                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-[hsl(var(--marsala))]/80
                            via-transparent
                            to-transparent
                          "
                        />


                        {/* MATCH */}

                        <div className="absolute top-4 right-4">

                          <Badge
                            className="
                              font-button
                              bg-white/90
                              text-[hsl(var(--marsala))]
                              backdrop-blur-md
                              border-0
                            "
                          >

                            <Sparkles className="w-3 h-3 mr-1" />

                            {profile.match}% match

                          </Badge>

                        </div>


                        {/* PERSON */}

                        <div className="absolute bottom-5 left-5 right-5 text-white">

                          <h3 className="font-button text-2xl font-semibold">
                            {profile.name}
                          </h3>

                          <p className="font-button text-sm text-white/80 mt-1">
                            {profile.role}
                          </p>

                        </div>

                      </div>



                      {/* =================================================
                          CARD CONTENT
                      ================================================== */}

                      <div className="p-6">


                        {/* LOCATION */}

                        <div className="flex items-center gap-1.5 mb-4">

                          <MapPin className="w-3.5 h-3.5 text-[hsl(var(--marsala))]/40" />

                          <span className="font-button text-xs text-[hsl(var(--marsala))]/50">
                            {profile.location}
                          </span>

                        </div>


                        {/* BIO */}

                        <p className="font-button text-sm text-[hsl(var(--marsala))]/60 leading-relaxed mb-5">
                          {profile.bio}
                        </p>


                        {/* CAN TEACH */}

                        <div className="mb-4">

                          <div className="flex items-center gap-2 mb-2">

                            <GraduationCap className="w-3.5 h-3.5 text-[hsl(var(--cognac))]" />

                            <p className="font-button text-xs font-semibold text-[hsl(var(--marsala))]">
                              Can Teach
                            </p>

                          </div>


                          <div className="flex flex-wrap gap-1.5">

                            {profile.teaches.map(
                              (
                                skill
                              ) => (

                                <span
                                  key={
                                    skill
                                  }
                                  className="
                                    font-button
                                    px-2.5
                                    py-1
                                    rounded-full
                                    text-xs
                                    bg-[hsl(var(--rose-quartz))]/20
                                    text-[hsl(var(--marsala))]
                                  "
                                >
                                  {
                                    skill
                                  }
                                </span>

                              )
                            )}

                          </div>

                        </div>


                        {/* WANTS */}

                        <div className="mb-5">

                          <div className="flex items-center gap-2 mb-2">

                            <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--cognac))]" />

                            <p className="font-button text-xs font-semibold text-[hsl(var(--marsala))]">
                              Wants to Learn
                            </p>

                          </div>


                          <div className="flex flex-wrap gap-1.5">

                            {profile.wants.map(
                              (
                                skill
                              ) => (

                                <span
                                  key={
                                    skill
                                  }
                                  className="
                                    font-button
                                    px-2.5
                                    py-1
                                    rounded-full
                                    text-xs
                                    bg-[hsl(var(--peach))]/20
                                    text-[hsl(var(--cognac))]
                                  "
                                >
                                  {
                                    skill
                                  }
                                </span>

                              )
                            )}

                          </div>

                        </div>



                        {/* =================================================
                            ACTIONS
                        ================================================== */}

                        <div className="flex gap-2">

                          {/* VIEW PROFILE */}

                          <Link
                            href={`/profile/${profile.id}`}
                            className="
                              flex-1
                              flex
                              items-center
                              justify-center
                              gap-2
                              px-5
                              py-3
                              rounded-full
                              border
                              border-[hsl(var(--peach))]
                              bg-white
                              font-button
                              text-sm
                              font-medium
                              hover:bg-[hsl(var(--rose-quartz))]/10
                              transition
                            "
                          >

                            View Profile

                            <ArrowUpRight className="w-4 h-4" />

                          </Link>


                          {/* CHAT */}

                          <Link
                            href="/chat"
                          >

                            <Button
                              size="icon"
                              className="
                                rounded-full
                                bg-[hsl(var(--marsala))]
                                hover:bg-[hsl(var(--cognac))]
                                text-white
                                shrink-0
                              "
                            >

                              <MessageCircle className="w-4 h-4" />

                            </Button>

                          </Link>

                        </div>

                      </div>

                    </motion.article>

                  )
                )}

              </AnimatePresence>

            </motion.div>

          ) : (

            /* =================================================
               NO RESULTS
            ================================================== */

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                bg-white
                rounded-3xl
                border
                border-[hsl(var(--rose-quartz))]
                p-12
                text-center
              "
            >

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  rounded-2xl
                  bg-[hsl(var(--rose-quartz))]/30
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >

                <Users className="w-6 h-6 text-[hsl(var(--marsala))]" />

              </div>


              <h3 className="font-button text-xl font-semibold text-[hsl(var(--marsala))]">
                No people found
              </h3>


              <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-2 max-w-md mx-auto">
                Try another skill, category, or
                filter. Your perfect skill exchange
                might be one search away.
              </p>


              <Button
                onClick={() => {
                  setSearch("");
                  setActiveCategory(
                    "All"
                  );
                  setSelectedLevel(
                    "All"
                  );
                  setSelectedAvailability(
                    "All"
                  );
                }}
                className="
                  mt-6
                  rounded-full
                  bg-[hsl(var(--marsala))]
                  hover:bg-[hsl(var(--cognac))]
                  text-white
                  font-button
                "
              >
                Clear Search
              </Button>

            </motion.div>

          )}



          {/* =================================================
              BOTTOM MESSAGE
          ================================================== */}

          <motion.section
            variants={itemVariants}
            className="
              rounded-3xl
              bg-[hsl(var(--marsala))]
              p-7
              sm:p-9
              text-white
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
            "
          >

            <div className="max-w-2xl">

              <div className="flex items-center gap-2 mb-3">

                <Sparkles className="w-4 h-4" />

                <p className="font-button text-xs uppercase tracking-wider text-white/60">
                  The LEANR idea
                </p>

              </div>


              <h2 className="font-button text-2xl sm:text-3xl font-semibold">
                You don't just find a teacher.
              </h2>


              <p className="font-button text-sm sm:text-base text-white/60 mt-2 leading-relaxed">
                Find someone you can learn from while
                sharing something you know in return.
              </p>

            </div>


            <Link href="/profile-setup">

              <Button
                className="
                  shrink-0
                  rounded-full
                  bg-white
                  text-[hsl(var(--marsala))]
                  hover:bg-white/90
                  font-button
                  px-6
                "
              >

                <PlusIcon />

                Add Your Skills

              </Button>

            </Link>

          </motion.section>

        </motion.div>

      </main>

    </div>
  );
}


/* =========================================================
   SMALL PLUS ICON
========================================================= */

function PlusIcon() {

  return (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2"
    >

      <path d="M5 12h14" />

      <path d="M12 5v14" />

    </svg>

  );
}