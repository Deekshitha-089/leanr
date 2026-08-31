import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowLeft,
  ArrowUpRight,
  Ban,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Sparkles,
  Star,
  UserRound,
  X,
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";


/* =========================================================
   PROFILE DATA
========================================================= */

const profiles = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Design Student",
    location: "Hyderabad",

    bio:
      "I love turning ideas into simple, beautiful digital experiences. I'm always excited to exchange knowledge and learn something new from someone else.",

    teaches: [
      "UI Design",
      "Figma",
      "Prototyping",
    ],

    wants: [
      "React",
      "TypeScript",
    ],

    category: "Design",
    level: "Intermediate",
    availability: "Weekends",
    match: 95,

    rating: 4.8,
    reviewCount: 12,

    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop",

    sessionDuration: "60 min",
    learningMode: "1-on-1",

    currentlyLearning: [
      {
        name: "React",
        progress: 60,
      },
      {
        name: "TypeScript",
        progress: 40,
      },
    ],

    completedSessions: 12,
    learnersHelped: 8,

    reviews: [
      {
        name: "Sarah C.",
        rating: 5,
        text:
          "Alex explained Figma really clearly and was patient throughout the session.",
      },
      {
        name: "Daniel R.",
        rating: 5,
        text:
          "Great exchange partner. The sessions were well structured and easy to follow.",
      },
      {
        name: "Maya K.",
        rating: 4,
        text:
          "Really enjoyed learning UI design with Alex.",
      },
    ],
  },

  {
    id: 2,
    name: "Sarah Chen",
    role: "Computer Science Student",
    location: "Bangalore",

    bio:
      "Exploring data, programming and everything that makes technology interesting.",

    teaches: [
      "Python",
      "Data Science",
      "Calculus",
    ],

    wants: [
      "Writing",
      "Public Speaking",
    ],

    category: "Technology",
    level: "Advanced",
    availability: "Evenings",
    match: 91,

    rating: 4.9,
    reviewCount: 18,

    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop",

    sessionDuration: "60 min",
    learningMode: "1-on-1",

    currentlyLearning: [
      {
        name: "Public Speaking",
        progress: 45,
      },
    ],

    completedSessions: 18,
    learnersHelped: 11,

    reviews: [
      {
        name: "Priya S.",
        rating: 5,
        text:
          "Sarah is extremely clear when explaining difficult concepts.",
      },
      {
        name: "Arjun M.",
        rating: 5,
        text:
          "One of the best learning exchanges I've had.",
      },
    ],
  },

  {
    id: 3,
    name: "James Wilson",
    role: "Music Student",
    location: "Chennai",

    bio:
      "Pianist and music enthusiast who enjoys teaching composition.",

    teaches: [
      "Piano",
      "Music Composition",
    ],

    wants: [
      "Web Development",
      "CSS",
    ],

    category: "Music",
    level: "Advanced",
    availability: "Weekends",
    match: 82,

    rating: 4.7,
    reviewCount: 9,

    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop",

    sessionDuration: "45 min",
    learningMode: "1-on-1",

    currentlyLearning: [
      {
        name: "Web Development",
        progress: 35,
      },
    ],

    completedSessions: 9,
    learnersHelped: 6,

    reviews: [
      {
        name: "Kevin P.",
        rating: 5,
        text:
          "James made music composition much easier to understand.",
      },
      {
        name: "Riya T.",
        rating: 4,
        text:
          "Very friendly and easy to learn with.",
      },
    ],
  },

  {
    id: 4,
    name: "Emily Davis",
    role: "Language Student",
    location: "Mumbai",

    bio:
      "Languages are my favorite way to understand different cultures.",

    teaches: [
      "French",
      "Spanish",
      "Translation",
    ],

    wants: [
      "UI Design",
    ],

    category: "Languages",
    level: "Advanced",
    availability: "Evenings",
    match: 87,

    rating: 4.8,
    reviewCount: 14,

    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=800&fit=crop",

    sessionDuration: "60 min",
    learningMode: "1-on-1",

    currentlyLearning: [
      {
        name: "UI Design",
        progress: 50,
      },
    ],

    completedSessions: 14,
    learnersHelped: 9,

    reviews: [
      {
        name: "Ananya R.",
        rating: 5,
        text:
          "Emily is amazing at making language learning fun.",
      },
      {
        name: "Chris B.",
        rating: 5,
        text:
          "Very patient and supportive during every session.",
      },
    ],
  },

  {
    id: 5,
    name: "Michael Brown",
    role: "Marketing Student",
    location: "Delhi",

    bio:
      "Learning how brands grow while helping others understand digital marketing.",

    teaches: [
      "Digital Marketing",
      "SEO",
      "Content Strategy",
    ],

    wants: [
      "Python",
      "Data Analytics",
    ],

    category: "Business",
    level: "Intermediate",
    availability: "Evenings",
    match: 79,

    rating: 4.6,
    reviewCount: 7,

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop",

    sessionDuration: "60 min",
    learningMode: "1-on-1",

    currentlyLearning: [
      {
        name: "Python",
        progress: 30,
      },
    ],

    completedSessions: 7,
    learnersHelped: 5,

    reviews: [
      {
        name: "Vikram S.",
        rating: 5,
        text:
          "Michael shared practical marketing examples.",
      },
    ],
  },

  {
    id: 6,
    name: "Jessica Taylor",
    role: "Wellness Enthusiast",
    location: "Pune",

    bio:
      "Helping people build healthier routines through movement and mindfulness.",

    teaches: [
      "Yoga",
      "Meditation",
      "Wellness",
    ],

    wants: [
      "Nutrition",
      "Photography",
    ],

    category: "Lifestyle",
    level: "Intermediate",
    availability: "Mornings",
    match: 74,

    rating: 4.7,
    reviewCount: 10,

    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop",

    sessionDuration: "45 min",
    learningMode: "1-on-1",

    currentlyLearning: [
      {
        name: "Photography",
        progress: 25,
      },
    ],

    completedSessions: 10,
    learnersHelped: 7,

    reviews: [
      {
        name: "Meera P.",
        rating: 5,
        text:
          "Jessica makes every session feel comfortable and welcoming.",
      },
    ],
  },

  {
    id: 7,
    name: "Daniel Lee",
    role: "Software Developer",
    location: "Hyderabad",

    bio:
      "Full-stack developer interested in building products and teaching programming.",

    teaches: [
      "React",
      "JavaScript",
      "Node.js",
    ],

    wants: [
      "UI/UX",
      "Figma",
    ],

    category: "Technology",
    level: "Advanced",
    availability: "Weekends",
    match: 96,

    rating: 4.9,
    reviewCount: 21,

    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",

    sessionDuration: "60 min",
    learningMode: "1-on-1",

    currentlyLearning: [
      {
        name: "UI/UX",
        progress: 55,
      },
    ],

    completedSessions: 21,
    learnersHelped: 15,

    reviews: [
      {
        name: "Rahul V.",
        rating: 5,
        text:
          "Daniel explains programming concepts extremely well.",
      },
      {
        name: "Nisha P.",
        rating: 5,
        text:
          "Really helpful sessions and great communication.",
      },
    ],
  },

  {
    id: 8,
    name: "Priya Sharma",
    role: "Business Student",
    location: "Hyderabad",

    bio:
      "Interested in entrepreneurship, communication and building meaningful ideas.",

    teaches: [
      "Business Strategy",
      "Presentation",
      "Marketing",
    ],

    wants: [
      "Python",
      "Web Development",
    ],

    category: "Business",
    level: "Intermediate",
    availability: "Evenings",
    match: 84,

    rating: 4.8,
    reviewCount: 8,

    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop",

    sessionDuration: "60 min",
    learningMode: "1-on-1",

    currentlyLearning: [
      {
        name: "Python",
        progress: 40,
      },
    ],

    completedSessions: 8,
    learnersHelped: 6,

    reviews: [
      {
        name: "Sneha K.",
        rating: 5,
        text:
          "Priya is very organized and makes concepts easy to understand.",
      },
    ],
  },
];


/* =========================================================
   STAR RATING
========================================================= */

function StarRating({
  rating,
  size = "w-4 h-4",
}) {

  return (

    <div className="flex items-center gap-0.5">

      {[1, 2, 3, 4, 5].map(
        (star) => (

          <Star
            key={star}
            className={`${size} ${
              star <= Math.round(rating)
                ? "fill-[hsl(var(--cognac))] text-[hsl(var(--cognac))]"
                : "text-[hsl(var(--rose-quartz))]"
            }`}
          />

        )
      )}

    </div>
  );
}


/* =========================================================
   VIEW PROFILE
========================================================= */

function ViewProfile() {

  const [location, setLocation] =
    useLocation();

  const [showMenu, setShowMenu] =
    useState(false);

  const [showBlockModal, setShowBlockModal] =
    useState(false);

  const [requestSent, setRequestSent] =
    useState(false);


  /* =======================================================
     GET PROFILE ID
  ======================================================= */

  const profileId =
    Number(
      location
        .split("/")
        .pop()
    );


  const profile =
    profiles.find(
      (item) =>
        item.id === profileId
    );


  /* =======================================================
     PROFILE NOT FOUND
  ======================================================= */

  if (!profile) {

    return (

      <div className="min-h-screen bg-[#faf9f6] text-[hsl(var(--marsala))]">

        <Navbar />

        <main className="min-h-[70vh] flex items-center justify-center px-6">

          <div className="text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-[hsl(var(--rose-quartz))]/20 flex items-center justify-center">

              <UserRound className="w-6 h-6" />

            </div>


            <h1 className="font-serif text-4xl mt-5">
              Profile not found
            </h1>


            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-3">
              This profile may no longer be available.
            </p>


            <Link href="/explore">

              <a className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm">

                <ArrowLeft className="w-4 h-4" />

                Back to Explore

              </a>

            </Link>

          </div>

        </main>

      </div>
    );
  }


  /* =======================================================
     SEND MATCH REQUEST
  ======================================================= */

  const sendMatchRequest = () => {

    const existingRequests =
      JSON.parse(
        localStorage.getItem(
          "leanr_match_requests"
        ) || "[]"
      );


    const alreadyExists =
      existingRequests.some(
        (request) =>
          request.profileId ===
          profile.id
      );


    if (!alreadyExists) {

      existingRequests.push({
        id: Date.now(),
        profileId:
          profile.id,
        profileName:
          profile.name,
        status:
          "pending",
        createdAt:
          new Date().toISOString(),
      });


      localStorage.setItem(
        "leanr_match_requests",
        JSON.stringify(
          existingRequests
        )
      );

    }


    setRequestSent(true);
  };


  /* =======================================================
     BLOCK USER
  ======================================================= */

  const blockUser = () => {

    const existing =
      JSON.parse(
        localStorage.getItem(
          "leanr_blocked_users"
        ) || "[]"
      );


    if (
      !existing.includes(
        profile.id
      )
    ) {

      existing.push(
        profile.id
      );

    }


    localStorage.setItem(
      "leanr_blocked_users",
      JSON.stringify(existing)
    );


    setShowBlockModal(
      false
    );

    setLocation(
      "/explore"
    );
  };


  /* =======================================================
     PAGE
  ======================================================= */

  return (

    <div className="min-h-screen bg-[#faf9f6] text-[hsl(var(--marsala))]">

      <Navbar />


      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">


        {/* =================================================
            BACK
        ================================================= */}

        <Link href="/explore">

          <a className="inline-flex items-center gap-2 font-button text-sm text-[hsl(var(--marsala))]/50 hover:text-[hsl(var(--marsala))] transition">

            <ArrowLeft className="w-4 h-4" />

            Back to Explore

          </a>

        </Link>



        {/* =================================================
            PROFILE HEADER
        ================================================= */}

        <section className="mt-8">

          <div className="grid lg:grid-cols-[330px_1fr] gap-10">


            {/* IMAGE */}

            <div className="relative">

              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-[hsl(var(--rose-quartz))]/20">

                <img
                  src={
                    profile.image
                  }
                  alt={
                    profile.name
                  }
                  className="w-full h-full object-cover"
                />

              </div>


              {/* AI MATCH */}

              <div className="absolute top-5 right-5 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur shadow-sm">

                <Sparkles className="w-4 h-4 text-[hsl(var(--cognac))]" />

                <span className="font-button text-xs font-semibold">
                  {profile.match}% match
                </span>

              </div>

            </div>



            {/* INFORMATION */}

            <div className="pt-1">


              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="font-button text-xs uppercase tracking-[0.15em] text-[hsl(var(--marsala))]/35">
                    Leanr member
                  </p>


                  <h1 className="font-serif text-5xl md:text-6xl mt-2">
                    {profile.name}
                  </h1>


                  <p className="font-button text-base text-[hsl(var(--marsala))]/55 mt-3">
                    {profile.role}
                  </p>


                  <div className="flex items-center gap-2 mt-4">

                    <MapPin className="w-4 h-4 text-[hsl(var(--marsala))]/40" />

                    <span className="font-button text-sm text-[hsl(var(--marsala))]/50">
                      {profile.location}
                    </span>

                  </div>


                  {/* RATING */}

                  <div className="flex items-center gap-3 mt-4">

                    <StarRating
                      rating={
                        profile.rating
                      }
                    />


                    <span className="font-button text-sm font-semibold">
                      {profile.rating}
                    </span>


                    <span className="text-[hsl(var(--marsala))]/30">
                      ·
                    </span>


                    <span className="font-button text-xs text-[hsl(var(--marsala))]/50">
                      {profile.reviewCount} reviews
                    </span>

                  </div>

                </div>



                {/* MENU */}

                <div className="relative">

                  <button
                    onClick={() =>
                      setShowMenu(
                        !showMenu
                      )
                    }
                    className="w-10 h-10 rounded-full border border-[hsl(var(--rose-quartz))]/50 bg-white flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/10 transition"
                  >

                    <MoreHorizontal className="w-5 h-5" />

                  </button>


                  {showMenu && (

                    <div className="absolute right-0 top-12 z-30 w-48 bg-white rounded-2xl border border-[hsl(var(--rose-quartz))]/50 shadow-xl overflow-hidden">

                      <button
                        onClick={() => {

                          setShowMenu(
                            false
                          );

                          setShowBlockModal(
                            true
                          );

                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left font-button text-xs text-red-400 hover:bg-red-50 transition"
                      >

                        <Ban className="w-4 h-4" />

                        Block user

                      </button>

                    </div>

                  )}

                </div>

              </div>



              {/* ABOUT */}

              <div className="mt-9">

                <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/35">
                  About
                </p>


                <p className="font-button text-base leading-7 text-[hsl(var(--marsala))]/65 max-w-2xl mt-3">
                  {profile.bio}
                </p>

              </div>



              {/* ACTION BUTTONS */}

              <div className="flex flex-wrap gap-3 mt-8">


                {/* MESSAGE */}

                <Link href="/chat">

                  <a className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[hsl(var(--marsala))]/20 bg-white font-button text-sm hover:bg-[hsl(var(--rose-quartz))]/10 transition">

                    <MessageCircle className="w-4 h-4" />

                    Message

                  </a>

                </Link>



                {/* MATCH REQUEST */}

                <button
                  disabled={
                    requestSent
                  }
                  onClick={
                    sendMatchRequest
                  }
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3
                    rounded-full
                    font-button
                    text-sm
                    transition
                    ${
                      requestSent
                        ? "bg-[hsl(var(--rose-quartz))]/30 text-[hsl(var(--marsala))]/60 cursor-default"
                        : "bg-[hsl(var(--marsala))] text-white hover:bg-[hsl(var(--cognac))]"
                    }
                  `}
                >

                  {requestSent ? (

                    <>
                      <CheckCircle2 className="w-4 h-4" />

                      Request Sent

                    </>

                  ) : (

                    <>
                      <Sparkles className="w-4 h-4" />

                      Send Match Request

                      <ArrowUpRight className="w-4 h-4" />

                    </>

                  )}

                </button>

              </div>



              {/* REQUEST STATUS */}

              {requestSent && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 flex items-center gap-2"
                >

                  <CheckCircle2 className="w-4 h-4 text-green-600" />

                  <p className="font-button text-xs text-[hsl(var(--marsala))]/55">
                    Match request sent. Waiting for{" "}
                    {profile.name}{" "}
                    to accept.
                  </p>

                </motion.div>

              )}

            </div>

          </div>

        </section>



        {/* =================================================
            SKILLS
        ================================================= */}

        <section className="mt-16 pt-12 border-t border-[hsl(var(--rose-quartz))]/40">

          <div className="grid md:grid-cols-2 gap-12">


            {/* TEACH */}

            <div>

              <div className="flex items-center gap-2">

                <GraduationCap className="w-4 h-4 text-[hsl(var(--cognac))]" />

                <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
                  Knowledge they can share
                </p>

              </div>


              <h2 className="font-serif text-3xl mt-2">
                Can Teach
              </h2>


              <div className="flex flex-wrap gap-2 mt-5">

                {profile.teaches.map(
                  (skill) => (

                    <span
                      key={
                        skill
                      }
                      className="px-4 py-2 rounded-full bg-white border border-[hsl(var(--rose-quartz))]/50 font-button text-xs"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>



            {/* WANTS */}

            <div>

              <div className="flex items-center gap-2">

                <BookOpen className="w-4 h-4 text-[hsl(var(--cognac))]" />

                <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
                  What they're looking for
                </p>

              </div>


              <h2 className="font-serif text-3xl mt-2">
                Wants to Learn
              </h2>


              <div className="flex flex-wrap gap-2 mt-5">

                {profile.wants.map(
                  (skill) => (

                    <span
                      key={
                        skill
                      }
                      className="px-4 py-2 rounded-full bg-[hsl(var(--rose-quartz))]/10 border border-[hsl(var(--rose-quartz))]/40 font-button text-xs text-[hsl(var(--cognac))]"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>

          </div>

        </section>



        {/* =================================================
            WHY MATCH
        ================================================= */}

        <section className="mt-16 pt-12 border-t border-[hsl(var(--rose-quartz))]/40">

          <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
            Your potential exchange
          </p>


          <h2 className="font-serif text-3xl mt-2">
            Why you might learn together
          </h2>


          <div className="grid md:grid-cols-2 gap-x-10 gap-y-7 mt-8">

            <Reason
              icon={Sparkles}
              title={`${profile.match}% AI match`}
              text="Your interests, skills and learning goals show strong compatibility."
            />

            <Reason
              icon={GraduationCap}
              title="Skill exchange"
              text={`${profile.name} can teach ${profile.teaches[0]} while learning something from you.`}
            />

            <Reason
              icon={Clock}
              title={`${profile.sessionDuration} sessions`}
              text={`Their preferred session duration is ${profile.sessionDuration}.`}
            />

            <Reason
              icon={Calendar}
              title={profile.availability}
              text={`They usually prefer sessions during ${profile.availability.toLowerCase()}.`}
            />

          </div>

        </section>



        {/* =================================================
            CURRENTLY LEARNING
        ================================================= */}

        <section className="mt-16 pt-12 border-t border-[hsl(var(--rose-quartz))]/40">

          <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
            Current journey
          </p>


          <h2 className="font-serif text-3xl mt-2">
            Currently Learning
          </h2>


          <div className="mt-6 max-w-3xl">

            {profile.currentlyLearning.map(
              (course) => (

                <div
                  key={
                    course.name
                  }
                  className="py-5 border-b border-[hsl(var(--rose-quartz))]/30"
                >

                  <div className="flex items-center justify-between gap-5">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/15 flex items-center justify-center">

                        <BookOpen className="w-4 h-4" />

                      </div>


                      <p className="font-button text-sm font-semibold">
                        {course.name}
                      </p>

                    </div>


                    <span className="font-button text-xs text-[hsl(var(--marsala))]/50">
                      {course.progress}%
                    </span>

                  </div>


                  <div className="ml-[52px] mt-3">

                    <div className="h-2 rounded-full bg-[hsl(var(--rose-quartz))]/20 overflow-hidden">

                      <div
                        className="h-full rounded-full bg-[hsl(var(--marsala))]"
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </section>



        {/* =================================================
            SESSION PREFERENCES
        ================================================= */}

        <section className="mt-16 pt-12 border-t border-[hsl(var(--rose-quartz))]/40">

          <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
            How they prefer to learn
          </p>


          <h2 className="font-serif text-3xl mt-2">
            Session Preferences
          </h2>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7">

            <Preference
              icon={Clock}
              label="Duration"
              value={
                profile.sessionDuration
              }
            />


            <Preference
              icon={Calendar}
              label="Availability"
              value={
                profile.availability
              }
            />


            <Preference
              icon={UserRound}
              label="Format"
              value={
                profile.learningMode
              }
            />


            <Preference
              icon={GraduationCap}
              label="Level"
              value={
                profile.level
              }
            />

          </div>

        </section>



        {/* =================================================
            ACTIVITY
        ================================================= */}

        <section className="mt-16 pt-12 border-t border-[hsl(var(--rose-quartz))]/40">

          <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
            Learning activity
          </p>


          <h2 className="font-serif text-3xl mt-2">
            Their Leanr journey
          </h2>


          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">

            <Stat
              value={
                profile.completedSessions
              }
              label="Completed sessions"
            />


            <Stat
              value={
                profile.learnersHelped
              }
              label="Learners helped"
            />


            <Stat
              value={`${profile.match}%`}
              label="Your AI match"
            />

          </div>

        </section>



        {/* =================================================
            REVIEWS
        ================================================= */}

        <section className="mt-16 pt-12 border-t border-[hsl(var(--rose-quartz))]/40">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div>

              <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
                Community feedback
              </p>


              <h2 className="font-serif text-3xl mt-2">
                Learner Reviews
              </h2>

            </div>


            {/* RATING SUMMARY */}

            <div className="flex items-center gap-4">

              <div>

                <p className="font-serif text-4xl">
                  {profile.rating}
                </p>

              </div>


              <div>

                <StarRating
                  rating={
                    profile.rating
                  }
                  size="w-4 h-4"
                />

                <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-1">
                  Based on{" "}
                  {
                    profile.reviewCount
                  }{" "}
                  reviews
                </p>

              </div>

            </div>

          </div>



          {/* REVIEWS */}

          <div className="grid md:grid-cols-2 gap-4 mt-8">

            {profile.reviews.map(
              (review, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="bg-white border border-[hsl(var(--rose-quartz))]/40 rounded-3xl p-6"
                >

                  <div className="flex items-center justify-between gap-4">

                    <p className="font-button text-sm font-semibold">
                      {review.name}
                    </p>


                    <StarRating
                      rating={
                        review.rating
                      }
                      size="w-3.5 h-3.5"
                    />

                  </div>


                  <p className="font-button text-sm leading-6 text-[hsl(var(--marsala))]/55 mt-4">
                    "{review.text}"
                  </p>

                </motion.div>

              )
            )}

          </div>

        </section>



        {/* =================================================
            FINAL MATCH CTA
        ================================================= */}

        <section className="mt-16 pt-12 border-t border-[hsl(var(--rose-quartz))]/40">

          <div className="rounded-[2rem] bg-[hsl(var(--marsala))] text-white p-8 md:p-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

              <div>

                <div className="flex items-center gap-2">

                  <Sparkles className="w-4 h-4" />

                  <p className="font-button text-xs uppercase tracking-wider text-white/50">
                    {profile.match}% compatible
                  </p>

                </div>


                <h2 className="font-serif text-3xl mt-3">
                  Think this could be a good match?
                </h2>


                <p className="font-button text-sm text-white/55 mt-2 max-w-xl">
                  Send {profile.name} a match request.
                  If they accept, you can plan your
                  learning exchange together.
                </p>

              </div>


              <button
                disabled={
                  requestSent
                }
                onClick={
                  sendMatchRequest
                }
                className={`
                  shrink-0
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-3
                  rounded-full
                  font-button
                  text-sm
                  transition
                  ${
                    requestSent
                      ? "bg-white/20 text-white/60 cursor-default"
                      : "bg-white text-[hsl(var(--marsala))] hover:bg-white/90"
                  }
                `}
              >

                {requestSent ? (

                  <>
                    <CheckCircle2 className="w-4 h-4" />

                    Request Sent

                  </>

                ) : (

                  <>
                    Send Match Request

                    <ArrowUpRight className="w-4 h-4" />

                  </>

                )}

              </button>

            </div>

          </div>

        </section>

      </main>



      {/* =================================================
          BLOCK MODAL
      ================================================= */}

      <AnimatePresence>

        {showBlockModal && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center p-5"
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 10,
              }}
              className="w-full max-w-md bg-white rounded-[2rem] p-7 shadow-2xl"
            >

              <div className="flex items-start justify-between">

                <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">

                  <Ban className="w-5 h-5 text-red-400" />

                </div>


                <button
                  onClick={() =>
                    setShowBlockModal(
                      false
                    )
                  }
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100"
                >

                  <X className="w-4 h-4" />

                </button>

              </div>


              <h2 className="font-serif text-3xl mt-5">
                Block {profile.name}?
              </h2>


              <p className="font-button text-sm text-[hsl(var(--marsala))]/50 leading-6 mt-3">
                They will no longer appear in
                your recommendations and you
                won't be able to interact with
                them.
              </p>


              <div className="flex gap-3 mt-7">

                <button
                  onClick={() =>
                    setShowBlockModal(
                      false
                    )
                  }
                  className="flex-1 py-3 rounded-full border border-[hsl(var(--rose-quartz))]/50 font-button text-sm hover:bg-[hsl(var(--rose-quartz))]/10 transition"
                >
                  Cancel
                </button>


                <button
                  onClick={
                    blockUser
                  }
                  className="flex-1 py-3 rounded-full bg-red-500 text-white font-button text-sm hover:bg-red-600 transition"
                >
                  Block
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}


/* =========================================================
   REASON
========================================================= */

function Reason({
  icon: Icon,
  title,
  text,
}) {

  return (

    <div className="flex items-start gap-4">

      <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/15 flex items-center justify-center shrink-0">

        <Icon className="w-4 h-4" />

      </div>


      <div>

        <h3 className="font-button text-sm font-semibold">
          {title}
        </h3>


        <p className="font-button text-xs leading-5 text-[hsl(var(--marsala))]/45 mt-1">
          {text}
        </p>

      </div>

    </div>

  );
}


/* =========================================================
   PREFERENCE
========================================================= */

function Preference({
  icon: Icon,
  label,
  value,
}) {

  return (

    <div className="bg-white border border-[hsl(var(--rose-quartz))]/40 rounded-2xl p-5">

      <Icon className="w-4 h-4 text-[hsl(var(--marsala))]/45" />


      <p className="font-button text-[10px] uppercase tracking-wider text-[hsl(var(--marsala))]/35 mt-4">
        {label}
      </p>


      <p className="font-button text-sm font-semibold mt-1">
        {value}
      </p>

    </div>

  );
}


/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
}) {

  return (

    <div>

      <p className="font-serif text-4xl">
        {value}
      </p>


      <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-2">
        {label}
      </p>

    </div>

  );
}


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default ViewProfile;