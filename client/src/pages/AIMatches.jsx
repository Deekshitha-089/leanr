import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Clock,
  MapPin,
  SlidersHorizontal,
  Check,
  ChevronRight,
} from "lucide-react";


/* =========================================================
   MOCK AI MATCH DATA
   ---------------------------------------------------------
   V1:
   These scores are temporary.

   Later:
   Backend → matching service → AI/ML recommendation engine
========================================================= */

const matches = [
  {
    id: 1,

    name: "Alex Rivera",

    role: "Design Student",

    location: "Hyderabad",

    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop",

    match: 96,

    reason:
      "Alex can teach UI/UX, which you're interested in learning, while they want to learn React — a skill you can teach.",

    canTeachYou: [
      "UI Design",
      "Figma",
      "Prototyping",
    ],

    youCanTeach: [
      "React",
      "JavaScript",
    ],

    theyWantToLearn: [
      "React",
      "TypeScript",
    ],

    youWantToLearn: [
      "UI Design",
      "Figma",
    ],

    availability: "Weekends",

    level: "Intermediate",
  },


  {
    id: 2,

    name: "Sarah Chen",

    role: "Computer Science Student",

    location: "Bangalore",

    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop",

    match: 91,

    reason:
      "Sarah teaches Python and Data Science while looking to improve her communication skills — areas where your interests could complement hers.",

    canTeachYou: [
      "Python",
      "Data Science",
      "Calculus",
    ],

    youCanTeach: [
      "Web Development",
      "Presentation",
    ],

    theyWantToLearn: [
      "Writing",
      "Public Speaking",
    ],

    youWantToLearn: [
      "Python",
      "Data Science",
    ],

    availability: "Evenings",

    level: "Advanced",
  },


  {
    id: 3,

    name: "Daniel Lee",

    role: "Software Developer",

    location: "Hyderabad",

    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",

    match: 89,

    reason:
      "Daniel can help you strengthen your React skills and wants to learn UI/UX — creating a strong two-way exchange.",

    canTeachYou: [
      "React",
      "JavaScript",
      "Node.js",
    ],

    youCanTeach: [
      "UI/UX",
      "Design Basics",
    ],

    theyWantToLearn: [
      "UI/UX",
      "Figma",
    ],

    youWantToLearn: [
      "React",
      "Node.js",
    ],

    availability: "Weekends",

    level: "Advanced",
  },


  {
    id: 4,

    name: "Emily Davis",

    role: "Language Student",

    location: "Mumbai",

    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=500&fit=crop",

    match: 84,

    reason:
      "Emily can help you learn languages while looking for someone who can help with digital design.",

    canTeachYou: [
      "French",
      "Spanish",
      "Translation",
    ],

    youCanTeach: [
      "Web Development",
      "Basic Design",
    ],

    theyWantToLearn: [
      "UI Design",
    ],

    youWantToLearn: [
      "French",
      "Spanish",
    ],

    availability: "Evenings",

    level: "Advanced",
  },
];


/* =========================================================
   FILTER OPTIONS
========================================================= */

const filterOptions = [
  "All",
  "Highest Match",
  "Can Teach Me",
  "Can Learn From Me",
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
    y: 18,
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
   AI MATCHES PAGE
========================================================= */

export default function AIMatches() {

  const [activeFilter, setActiveFilter] = useState("All");

  const [connected, setConnected] = useState([]);


  /* =======================================================
     FILTER MATCHES
  ======================================================== */

  let filteredMatches = [...matches];

  if (activeFilter === "Highest Match") {

    filteredMatches.sort(
      (a, b) => b.match - a.match
    );

  }

  if (activeFilter === "Can Teach Me") {

    filteredMatches = filteredMatches.filter(
      (match) => match.canTeachYou.length > 0
    );

  }

  if (activeFilter === "Can Learn From Me") {

    filteredMatches = filteredMatches.filter(
      (match) => match.theyWantToLearn.length > 0
    );

  }


  /* =======================================================
     CONNECT
  ======================================================== */

  const handleConnect = (id) => {

    setConnected((current) => {

      if (current.includes(id)) {

        return current.filter(
          (item) => item !== id
        );

      }

      return [...current, id];

    });

  };


  return (

    <div className="min-h-screen bg-[#faf9f6] font-button">

      <Navbar />


      <main className="pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-10"
        >


          {/* =================================================
              HEADER
          ================================================== */}

          <motion.section
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          >

            <div className="max-w-2xl">

              <div className="flex items-center gap-2 mb-3">

                <div className="
                  w-9
                  h-9
                  rounded-xl
                  bg-[hsl(var(--marsala))]
                  text-white
                  flex
                  items-center
                  justify-center
                ">

                  <Sparkles className="w-4 h-4" />

                </div>


                <p className="font-button text-sm text-[hsl(var(--cognac))]">
                  Personalized for you
                </p>

              </div>


              <h1 className="font-button text-3xl sm:text-4xl md:text-5xl font-semibold text-[hsl(var(--marsala))]">
                AI Matches
              </h1>


              <p className="font-button text-base text-[hsl(var(--marsala))]/60 mt-3 leading-relaxed">

                Discover people whose skills, interests and learning
                goals complement yours.

              </p>

            </div>


            {/* Match count */}

            <div className="
              bg-white
              border
              border-[hsl(var(--rose-quartz))]
              rounded-2xl
              px-5
              py-4
              flex
              items-center
              gap-3
              shadow-sm
            ">

              <Sparkles className="w-5 h-5 text-[hsl(var(--cognac))]" />

              <div>

                <p className="font-button text-lg font-semibold text-[hsl(var(--marsala))]">
                  {matches.length}
                </p>

                <p className="font-button text-xs text-[hsl(var(--marsala))]/40">
                  Recommended for you
                </p>

              </div>

            </div>

          </motion.section>



          {/* =================================================
              HOW MATCHING WORKS
          ================================================== */}

          <motion.section variants={itemVariants}>

            <div className="
              rounded-3xl
              bg-white
              border
              border-[hsl(var(--rose-quartz))]
              p-6
              sm:p-7
            ">

              <div className="flex items-start gap-4">

                <div className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[hsl(var(--rose-quartz))]/30
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">

                  <Sparkles className="w-5 h-5 text-[hsl(var(--marsala))]" />

                </div>


                <div>

                  <h2 className="font-button text-lg font-semibold text-[hsl(var(--marsala))]">

                    Why these people?

                  </h2>


                  <p className="font-button text-sm text-[hsl(var(--marsala))]/55 mt-1 leading-relaxed">

                    Your recommendations are based on the skills you
                    want to learn, the skills you can teach, your
                    interests and availability.

                  </p>

                </div>

              </div>

            </div>

          </motion.section>



          {/* =================================================
              FILTERS
          ================================================== */}

          <motion.section variants={itemVariants}>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">

              <div className="flex items-center gap-2 mr-2 shrink-0">

                <SlidersHorizontal
                  className="w-4 h-4 text-[hsl(var(--marsala))]/50"
                />

                <span className="font-button text-sm text-[hsl(var(--marsala))]/50">
                  Show
                </span>

              </div>


              {filterOptions.map((filter) => (

                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`
                    font-button
                    shrink-0
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    border
                    transition-all

                    ${
                      activeFilter === filter
                        ? "bg-[hsl(var(--marsala))] text-white border-[hsl(var(--marsala))]"
                        : "bg-white text-[hsl(var(--marsala))] border-[hsl(var(--peach))]/40 hover:border-[hsl(var(--peach))]"
                    }
                  `}
                >

                  {filter}

                </button>

              ))}

            </div>

          </motion.section>



          {/* =================================================
              MATCH CARDS
          ================================================== */}

          <motion.section
            variants={itemVariants}
            className="space-y-6"
          >

            <div className="flex items-end justify-between">

              <div>

                <h2 className="font-button text-2xl font-semibold text-[hsl(var(--marsala))]">
                  People for you
                </h2>

                <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-1">
                  Strong potential skill exchanges.
                </p>

              </div>

            </div>


            <div className="grid lg:grid-cols-2 gap-6">

              <AnimatePresence mode="popLayout">

                {filteredMatches.map((match) => {

                  const isConnected =
                    connected.includes(match.id);


                  return (

                    <motion.article
                      key={match.id}
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
                        scale: 0.97,
                      }}
                      whileHover={{
                        y: -4,
                      }}
                      className="
                        bg-white
                        rounded-[2rem]
                        border
                        border-[hsl(var(--rose-quartz))]
                        overflow-hidden
                        shadow-sm
                        hover:shadow-lg
                        transition-shadow
                      "
                    >

                      {/* =================================================
                          TOP PROFILE
                      ================================================== */}

                      <div className="p-6 sm:p-7">

                        <div className="flex items-start justify-between gap-4">

                          <div className="flex items-center gap-4">

                            <Avatar className="
                              w-16
                              h-16
                              border-2
                              border-[hsl(var(--rose-quartz))]
                            ">

                              <AvatarImage
                                src={match.image}
                                alt={match.name}
                              />

                              <AvatarFallback>

                                {match.name
                                  .split(" ")
                                  .map(
                                    (name) => name[0]
                                  )
                                  .join("")}

                              </AvatarFallback>

                            </Avatar>


                            <div>

                              <h3 className="
                                font-button
                                text-xl
                                font-semibold
                                text-[hsl(var(--marsala))]
                              ">

                                {match.name}

                              </h3>


                              <p className="
                                font-button
                                text-sm
                                text-[hsl(var(--marsala))]/50
                                mt-0.5
                              ">

                                {match.role}

                              </p>


                              <div className="
                                flex
                                items-center
                                gap-1
                                mt-2
                              ">

                                <MapPin className="w-3.5 h-3.5 text-[hsl(var(--marsala))]/35" />

                                <span className="
                                  font-button
                                  text-xs
                                  text-[hsl(var(--marsala))]/45
                                ">

                                  {match.location}

                                </span>

                              </div>

                            </div>

                          </div>


                          {/* Match */}

                          <div className="text-right shrink-0">

                            <div className="
                              inline-flex
                              items-center
                              gap-1
                              px-3
                              py-1.5
                              rounded-full
                              bg-[hsl(var(--marsala))]
                              text-white
                            ">

                              <Sparkles className="w-3 h-3" />

                              <span className="font-button text-xs font-semibold">

                                {match.match}%

                              </span>

                            </div>


                            <p className="
                              font-button
                              text-[10px]
                              text-[hsl(var(--marsala))]/35
                              mt-1
                            ">

                              compatibility

                            </p>

                          </div>

                        </div>



                        {/* =================================================
                            WHY MATCH
                        ================================================== */}

                        <div className="
                          mt-6
                          p-4
                          rounded-2xl
                          bg-[hsl(var(--rose-quartz))]/15
                        ">

                          <div className="flex items-start gap-3">

                            <Sparkles className="
                              w-4
                              h-4
                              text-[hsl(var(--cognac))]
                              mt-0.5
                              shrink-0
                            " />


                            <div>

                              <p className="
                                font-button
                                text-xs
                                font-semibold
                                text-[hsl(var(--marsala))]
                                mb-1
                              ">

                                Why this could work

                              </p>


                              <p className="
                                font-button
                                text-sm
                                text-[hsl(var(--marsala))]/60
                                leading-relaxed
                              ">

                                {match.reason}

                              </p>

                            </div>

                          </div>

                        </div>



                        {/* =================================================
                            EXCHANGE
                        ================================================== */}

                        <div className="
                          mt-6
                          grid
                          grid-cols-[1fr_auto_1fr]
                          gap-3
                          items-stretch
                        ">


                          {/* They teach */}

                          <div className="
                            rounded-2xl
                            border
                            border-[hsl(var(--rose-quartz))]
                            p-4
                          ">

                            <div className="
                              flex
                              items-center
                              gap-2
                              mb-3
                            ">

                              <GraduationCap className="
                                w-4
                                h-4
                                text-[hsl(var(--cognac))]
                              " />

                              <p className="
                                font-button
                                text-xs
                                font-semibold
                                text-[hsl(var(--marsala))]
                              ">

                                They teach you

                              </p>

                            </div>


                            <div className="flex flex-wrap gap-1.5">

                              {match.canTeachYou.map(
                                (skill) => (

                                  <span
                                    key={skill}
                                    className="
                                      font-button
                                      px-2
                                      py-1
                                      rounded-full
                                      bg-[hsl(var(--rose-quartz))]/25
                                      text-[hsl(var(--marsala))]
                                      text-[11px]
                                    "
                                  >

                                    {skill}

                                  </span>

                                )
                              )}

                            </div>

                          </div>


                          {/* Exchange icon */}

                          <div className="
                            flex
                            items-center
                            justify-center
                          ">

                            <div className="
                              w-9
                              h-9
                              rounded-full
                              bg-[hsl(var(--marsala))]
                              text-white
                              flex
                              items-center
                              justify-center
                            ">

                              <ArrowUpRight className="w-4 h-4 rotate-90" />

                            </div>

                          </div>


                          {/* You teach */}

                          <div className="
                            rounded-2xl
                            border
                            border-[hsl(var(--peach))]
                            p-4
                          ">

                            <div className="
                              flex
                              items-center
                              gap-2
                              mb-3
                            ">

                              <BookOpen className="
                                w-4
                                h-4
                                text-[hsl(var(--cognac))]
                              " />

                              <p className="
                                font-button
                                text-xs
                                font-semibold
                                text-[hsl(var(--marsala))]
                              ">

                                You teach them

                              </p>

                            </div>


                            <div className="flex flex-wrap gap-1.5">

                              {match.youCanTeach.map(
                                (skill) => (

                                  <span
                                    key={skill}
                                    className="
                                      font-button
                                      px-2
                                      py-1
                                      rounded-full
                                      bg-[hsl(var(--peach))]/20
                                      text-[hsl(var(--cognac))]
                                      text-[11px]
                                    "
                                  >

                                    {skill}

                                  </span>

                                )
                              )}

                            </div>

                          </div>

                        </div>



                        {/* =================================================
                            DETAILS
                        ================================================== */}

                        <div className="
                          mt-5
                          flex
                          flex-wrap
                          gap-3
                        ">

                          <div className="
                            flex
                            items-center
                            gap-1.5
                            text-[hsl(var(--marsala))]/50
                          ">

                            <Clock className="w-3.5 h-3.5" />

                            <span className="font-button text-xs">

                              {match.availability}

                            </span>

                          </div>


                          <span className="text-[hsl(var(--marsala))]/20">
                            •
                          </span>


                          <span className="
                            font-button
                            text-xs
                            text-[hsl(var(--marsala))]/50
                          ">

                            {match.level}

                          </span>

                        </div>



                        {/* =================================================
                            ACTIONS
                        ================================================== */}

                        <div className="
                          flex
                          gap-2
                          mt-6
                        ">

                          <Link
                            href={`/profile/${match.id}`}
                            className="flex-1"
                          >

                            <Button
                              variant="outline"
                              className="
                                w-full
                                rounded-full
                                border-[hsl(var(--peach))]
                                text-[hsl(var(--marsala))]
                                hover:bg-[hsl(var(--rose-quartz))]/20
                                font-button
                              "
                            >

                              View Profile

                              <ArrowUpRight className="w-4 h-4 ml-1.5" />

                            </Button>

                          </Link>


                          <Button
                            onClick={() =>
                              handleConnect(match.id)
                            }
                            className={`
                              rounded-full
                              px-5
                              font-button
                              transition-all

                              ${
                                isConnected
                                  ? "bg-[hsl(var(--cognac))] hover:bg-[hsl(var(--cognac))]"
                                  : "bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))]"
                              }

                              text-white
                            `}
                          >

                            {isConnected ? (

                              <>
                                <Check className="w-4 h-4 mr-1.5" />

                                Connected

                              </>

                            ) : (

                              <>
                                <MessageCircle className="w-4 h-4 mr-1.5" />

                                Connect

                              </>

                            )}

                          </Button>

                        </div>

                      </div>

                    </motion.article>

                  );

                })}

              </AnimatePresence>

            </div>


            {/* =================================================
                NO RESULTS
            ================================================== */}

            {filteredMatches.length === 0 && (

              <div className="
                bg-white
                rounded-3xl
                border
                border-[hsl(var(--rose-quartz))]
                p-12
                text-center
              ">

                <Sparkles className="
                  w-8
                  h-8
                  mx-auto
                  text-[hsl(var(--cognac))]
                  mb-4
                " />


                <h3 className="
                  font-button
                  text-xl
                  font-semibold
                  text-[hsl(var(--marsala))]
                ">

                  No matches found

                </h3>


                <p className="
                  font-button
                  text-sm
                  text-[hsl(var(--marsala))]/50
                  mt-2
                ">

                  Try another filter or update your skills and
                  interests in your profile.

                </p>

              </div>

            )}

          </motion.section>



          {/* =================================================
              BOTTOM CTA
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

            <div>

              <div className="flex items-center gap-2 mb-3">

                <Sparkles className="w-4 h-4" />

                <p className="
                  font-button
                  text-xs
                  uppercase
                  tracking-wider
                  text-white/60
                ">

                  Improve your recommendations

                </p>

              </div>


              <h2 className="
                font-button
                text-2xl
                sm:text-3xl
                font-semibold
              ">

                Keep your skills up to date.

              </h2>


              <p className="
                font-button
                text-sm
                text-white/60
                mt-2
                max-w-xl
                leading-relaxed
              ">

                The more you tell LEANR about what you know,
                what you want to learn and what interests you,
                the better your recommendations can become.

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

                Update My Skills

                <ArrowUpRight className="w-4 h-4 ml-2" />

              </Button>

            </Link>

          </motion.section>

        </motion.div>

      </main>

    </div>
  );
}