import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

import { Navbar } from "@/components/layout/Navbar";

import {
  MapPin,
  Calendar,
  Edit3,
  Plus,
  X,
  Check,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  MessageCircle,
  Clock,
  Star,
  Users,
  Github,
  Linkedin,
  Globe,
  Camera,
  Trash2,
} from "lucide-react";


/* =========================================================
   PROFILE DATA
   ---------------------------------------------------------
   V1 = frontend/local state
   Later = backend/database
========================================================= */

const initialProfile = {
  name: "Deekshitha Puppala",

  headline: "AI/ML Student",

  location: "India",

  bio:
    "I'm a curious learner who loves technology, building things and exchanging knowledge with people who are just as excited to learn.",

  education: "B.Tech",

  college: "Your University",

  graduationYear: "2028",

  learning: [
    {
      name: "Machine Learning",
      level: "Intermediate",
    },
    {
      name: "System Design",
      level: "Beginner",
    },
    {
      name: "UI/UX",
      level: "Beginner",
    },
  ],

  teaching: [
    {
      name: "Python",
      level: "Advanced",
    },
    {
      name: "React",
      level: "Intermediate",
    },
    {
      name: "Web Development",
      level: "Intermediate",
    },
  ],

  interests: [
    "Artificial Intelligence",
    "Technology",
    "Startups",
    "Design",
    "Open Source",
  ],

  availability: [
    "Evenings",
    "Weekends",
  ],

  learningMode: "Both",

  sessionDuration: "60 minutes",

  languages: [
    "English",
    "Telugu",
  ],

  github: "",

  linkedin: "",

  portfolio: "",

  goals:
    "Become a strong software engineer and build practical AI-powered products.",

  profileImage:
    "/mine.jpg",

  joined: "August 2026",
};


/* =========================================================
   SYSTEM STATS
   ---------------------------------------------------------
   These are NOT editable.
   Later they come from backend.
========================================================= */

const stats = [
  {
    label: "Exchanges",
    value: "7",
  },
  {
    label: "Sessions",
    value: "18",
  },
  {
    label: "Rating",
    value: "4.8⭐️",
  },
];


/* =========================================================
   ACTIVITY
   ---------------------------------------------------------
   Later = backend
========================================================= */

const activities = [
  {
    id: 1,
    icon: GraduationCap,
    title: "Learned UI Design",
    person: "with Alex Rivera",
    time: "2 days ago",
  },

  {
    id: 2,
    icon: BookOpen,
    title: "Taught React",
    person: "with Daniel Lee",
    time: "5 days ago",
  },

  {
    id: 3,
    icon: Star,
    title: "Received a 5.0 rating",
    person: "from Sarah Chen",
    time: "1 week ago",
  },
];


const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];


const skillLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];


const learningModes = [
  "Online",
  "In person",
  "Both",
];


const durations = [
  "30 minutes",
  "45 minutes",
  "60 minutes",
  "90 minutes",
];


export default function Profile() {

  const [profile, setProfile] =
    useState(initialProfile);

  const [editing, setEditing] =
    useState(false);

  const [newTeachingSkill, setNewTeachingSkill] =
    useState("");

  const [newLearningSkill, setNewLearningSkill] =
    useState("");

  const [newInterest, setNewInterest] =
    useState("");

  const [newLanguage, setNewLanguage] =
    useState("");

  const [saved, setSaved] =
    useState(false);


  /* =========================================================
     UPDATE FIELD
  ========================================================= */

  const updateField = (field, value) => {

    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };


  /* =========================================================
     ADD TEACHING SKILL
  ========================================================= */

  const addTeachingSkill = () => {

    const value =
      newTeachingSkill.trim();

    if (!value) return;

    if (
      profile.teaching.some(
        (skill) =>
          skill.name.toLowerCase() ===
          value.toLowerCase()
      )
    ) {
      setNewTeachingSkill("");
      return;
    }

    setProfile((prev) => ({
      ...prev,

      teaching: [
        ...prev.teaching,
        {
          name: value,
          level: "Beginner",
        },
      ],
    }));

    setNewTeachingSkill("");

    setSaved(false);
  };


  /* =========================================================
     ADD LEARNING SKILL
  ========================================================= */

  const addLearningSkill = () => {

    const value =
      newLearningSkill.trim();

    if (!value) return;

    if (
      profile.learning.some(
        (skill) =>
          skill.name.toLowerCase() ===
          value.toLowerCase()
      )
    ) {
      setNewLearningSkill("");
      return;
    }

    setProfile((prev) => ({
      ...prev,

      learning: [
        ...prev.learning,
        {
          name: value,
          level: "Beginner",
        },
      ],
    }));

    setNewLearningSkill("");

    setSaved(false);
  };


  /* =========================================================
     ADD INTEREST
  ========================================================= */

  const addInterest = () => {

    const value =
      newInterest.trim();

    if (!value) return;

    if (
      profile.interests.includes(value)
    ) {
      setNewInterest("");
      return;
    }

    setProfile((prev) => ({
      ...prev,

      interests: [
        ...prev.interests,
        value,
      ],
    }));

    setNewInterest("");

    setSaved(false);
  };


  /* =========================================================
     ADD LANGUAGE
  ========================================================= */

  const addLanguage = () => {

    const value =
      newLanguage.trim();

    if (!value) return;

    if (
      profile.languages.includes(value)
    ) {
      setNewLanguage("");
      return;
    }

    setProfile((prev) => ({
      ...prev,

      languages: [
        ...prev.languages,
        value,
      ],
    }));

    setNewLanguage("");

    setSaved(false);
  };


  /* =========================================================
     REMOVE TEACHING SKILL
  ========================================================= */

  const removeTeachingSkill = (name) => {

    setProfile((prev) => ({
      ...prev,

      teaching:
        prev.teaching.filter(
          (skill) =>
            skill.name !== name
        ),
    }));

    setSaved(false);
  };


  /* =========================================================
     REMOVE LEARNING SKILL
  ========================================================= */

  const removeLearningSkill = (name) => {

    setProfile((prev) => ({
      ...prev,

      learning:
        prev.learning.filter(
          (skill) =>
            skill.name !== name
        ),
    }));

    setSaved(false);
  };


  /* =========================================================
     REMOVE INTEREST
  ========================================================= */

  const removeInterest = (interest) => {

    setProfile((prev) => ({
      ...prev,

      interests:
        prev.interests.filter(
          (item) =>
            item !== interest
        ),
    }));

    setSaved(false);
  };


  /* =========================================================
     REMOVE LANGUAGE
  ========================================================= */

  const removeLanguage = (language) => {

    setProfile((prev) => ({
      ...prev,

      languages:
        prev.languages.filter(
          (item) =>
            item !== language
        ),
    }));

    setSaved(false);
  };


  /* =========================================================
     TOGGLE AVAILABILITY
  ========================================================= */

  const toggleAvailability = (day) => {

    setProfile((prev) => {

      const exists =
        prev.availability.includes(day);

      return {
        ...prev,

        availability: exists
          ? prev.availability.filter(
              (item) => item !== day
            )
          : [
              ...prev.availability,
              day,
            ],
      };

    });

    setSaved(false);
  };


  /* =========================================================
     UPDATE SKILL LEVEL
  ========================================================= */

  const updateTeachingLevel = (
    name,
    level
  ) => {

    setProfile((prev) => ({
      ...prev,

      teaching:
        prev.teaching.map(
          (skill) =>
            skill.name === name
              ? {
                  ...skill,
                  level,
                }
              : skill
        ),
    }));

    setSaved(false);
  };


  const updateLearningLevel = (
    name,
    level
  ) => {

    setProfile((prev) => ({
      ...prev,

      learning:
        prev.learning.map(
          (skill) =>
            skill.name === name
              ? {
                  ...skill,
                  level,
                }
              : skill
        ),
    }));

    setSaved(false);
  };


  /* =========================================================
     SAVE
     ---------------------------------------------------------
     V1 = local state
     Backend API will replace this later.
========================================================= */

  const saveProfile = () => {

    setSaved(true);

    setEditing(false);
  };


  return (

    <div className="
      min-h-screen
      bg-[#faf9f6]
      font-button
    ">

      <Navbar />


      <main className="
        pt-28
        pb-16
        px-4
        sm:px-6
        max-w-6xl
        mx-auto
      ">


        {/* =================================================
            HEADER
        ================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-6
            pb-8
            border-b
            border-[hsl(var(--rose-quartz))]
          ">


            {/* Profile */}

            <div className="
              flex
              items-center
              gap-5
            ">

              <div className="
                relative
                group
              ">

                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="
                    w-24
                    h-24
                    sm:w-28
                    sm:h-28
                    rounded-full
                    object-cover
                    border-4
                    border-white
                    shadow-sm
                  "
                />


                {editing && (

                  <button
                    onClick={() => {

                      const url =
                        window.prompt(
                          "Paste your profile image URL:"
                        );

                      if (url) {

                        updateField(
                          "profileImage",
                          url
                        );

                      }

                    }}
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-black/45
                      text-white
                      flex
                      flex-col
                      items-center
                      justify-center
                      opacity-100
                    "
                  >

                    <Camera className="
                      w-5
                      h-5
                    " />

                    <span className="
                      text-[10px]
                      mt-1
                      font-button
                    ">

                      Change

                    </span>

                  </button>

                )}

              </div>


              <div>

                {editing ? (

                  <div className="
                    space-y-2
                  ">

                    <input
                      value={profile.name}
                      onChange={(e) =>
                        updateField(
                          "name",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        max-w-xs
                        h-9
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-lg
                        font-semibold
                        text-[hsl(var(--marsala))]
                        font-button
                      "
                    />


                    <input
                      value={
                        profile.headline
                      }
                      onChange={(e) =>
                        updateField(
                          "headline",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        max-w-xs
                        h-8
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-sm
                        text-[hsl(var(--cognac))]
                        font-button
                      "
                    />

                  </div>

                ) : (

                  <>

                    <h1 className="
                      text-2xl
                      sm:text-3xl
                      font-semibold
                      text-[hsl(var(--marsala))]
                      font-button
                    ">

                      {profile.name}

                    </h1>


                    <p className="
                      text-sm
                      text-[hsl(var(--cognac))]
                      mt-1
                      font-button
                    ">

                      {profile.headline}

                    </p>

                  </>

                )}


                <div className="
                  flex
                  flex-wrap
                  gap-4
                  mt-3
                ">

                  <span className="
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    text-[hsl(var(--marsala))]/45
                    font-button
                  ">

                    <MapPin className="
                      w-3.5
                      h-3.5
                    " />

                    {editing ? (

                      <input
                        value={
                          profile.location
                        }
                        onChange={(e) =>
                          updateField(
                            "location",
                            e.target.value
                          )
                        }
                        className="
                          w-24
                          h-6
                          px-2
                          rounded
                          border
                          border-[hsl(var(--rose-quartz))]
                          outline-none
                          bg-white
                          font-button
                        "
                      />

                    ) : (

                      profile.location

                    )}

                  </span>


                  <span className="
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    text-[hsl(var(--marsala))]/45
                    font-button
                  ">

                    <Calendar className="
                      w-3.5
                      h-3.5
                    " />

                    Joined {profile.joined}

                  </span>

                </div>

              </div>

            </div>



            {/* Edit / Save */}

            {editing ? (

              <div className="
                flex
                items-center
                gap-2
              ">

                <button
                  onClick={() =>
                    setEditing(false)
                  }
                  className="
                    h-10
                    px-5
                    rounded-full
                    text-sm
                    text-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--rose-quartz))]/20
                    font-button
                  "
                >

                  Cancel

                </button>


                <button
                  onClick={saveProfile}
                  className="
                    h-10
                    px-5
                    rounded-full
                    bg-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--cognac))]
                    text-white
                    text-sm
                    font-button
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Check className="
                    w-4
                    h-4
                  " />

                  Save Changes

                </button>

              </div>

            ) : (

              <button
                onClick={() => {
                  setEditing(true);
                  setSaved(false);
                }}
                className="
                  h-10
                  px-5
                  rounded-full
                  border
                  border-[hsl(var(--rose-quartz))]
                  text-[hsl(var(--marsala))]
                  hover:bg-[hsl(var(--rose-quartz))]/20
                  text-sm
                  font-button
                  flex
                  items-center
                  gap-2
                "
              >

                <Edit3 className="
                  w-4
                  h-4
                " />

                Edit Profile

              </button>

            )}

          </div>

        </motion.section>



        {/* =================================================
            SAVE MESSAGE
        ================================================== */}

        {saved && (

          <div className="
            mt-4
            flex
            items-center
            gap-2
            text-xs
            text-green-600
            font-button
          ">

            <Check className="
              w-4
              h-4
            " />

            Profile changes saved.

          </div>

        )}



        {/* =================================================
            STATS
            SYSTEM GENERATED — NOT EDITABLE
        ================================================== */}

        <section className="
          grid
          grid-cols-3
          border-b
          border-[hsl(var(--rose-quartz))]
        ">

          {stats.map((stat, index) => (

            <div
              key={stat.label}
              className={`
                py-6
                text-center

                ${
                  index !== 0
                    ? "border-l border-[hsl(var(--rose-quartz))]"
                    : ""
                }
              `}
            >

              <p className="
                text-xl
                sm:text-2xl
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
              ">

                {stat.value}

              </p>


              <p className="
                text-xs
                text-[hsl(var(--marsala))]/40
                mt-1
                font-button
              ">

                {stat.label}

              </p>

            </div>

          ))}

        </section>



        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <div className="
          grid
          lg:grid-cols-[1fr_320px]
          gap-12
          mt-10
        ">


          {/* =================================================
              LEFT
          ================================================== */}

          <div className="
            space-y-10
          ">


            {/* =================================================
                ABOUT
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-3
              ">

                About me

              </h2>


              {editing ? (

                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    updateField(
                      "bio",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    min-h-[120px]
                    p-4
                    rounded-xl
                    border
                    border-[hsl(var(--rose-quartz))]
                    bg-white
                    outline-none
                    resize-none
                    text-sm
                    leading-6
                    text-[hsl(var(--marsala))]
                    font-button
                  "
                />

              ) : (

                <p className="
                  text-sm
                  leading-7
                  text-[hsl(var(--marsala))]/55
                  font-button
                ">

                  {profile.bio}

                </p>

              )}

            </section>



            {/* =================================================
                EDUCATION
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-4
              ">

                Education

              </h2>


              {editing ? (

                <div className="
                  grid
                  sm:grid-cols-3
                  gap-3
                ">

                  <input
                    value={
                      profile.education
                    }
                    onChange={(e) =>
                      updateField(
                        "education",
                        e.target.value
                      )
                    }
                    placeholder="Degree"
                    className="
                      h-10
                      px-3
                      rounded-lg
                      border
                      border-[hsl(var(--rose-quartz))]
                      bg-white
                      outline-none
                      text-sm
                      font-button
                    "
                  />


                  <input
                    value={
                      profile.college
                    }
                    onChange={(e) =>
                      updateField(
                        "college",
                        e.target.value
                      )
                    }
                    placeholder="College"
                    className="
                      h-10
                      px-3
                      rounded-lg
                      border
                      border-[hsl(var(--rose-quartz))]
                      bg-white
                      outline-none
                      text-sm
                      font-button
                    "
                  />


                  <input
                    value={
                      profile.graduationYear
                    }
                    onChange={(e) =>
                      updateField(
                        "graduationYear",
                        e.target.value
                      )
                    }
                    placeholder="Graduation year"
                    className="
                      h-10
                      px-3
                      rounded-lg
                      border
                      border-[hsl(var(--rose-quartz))]
                      bg-white
                      outline-none
                      text-sm
                      font-button
                    "
                  />

                </div>

              ) : (

                <div>

                  <p className="
                    text-sm
                    font-medium
                    text-[hsl(var(--marsala))]
                    font-button
                  ">

                    {profile.education}

                  </p>


                  <p className="
                    text-xs
                    text-[hsl(var(--marsala))]/45
                    mt-1
                    font-button
                  ">

                    {profile.college}
                    {" · "}
                    Class of {profile.graduationYear}

                  </p>

                </div>

              )}

            </section>



            {/* =================================================
                TEACH
            ================================================== */}

            <section>

              <div className="
                mb-4
              ">

                <h2 className="
                  text-lg
                  font-semibold
                  text-[hsl(var(--marsala))]
                  font-button
                ">

                  What I can teach

                </h2>


                <p className="
                  text-xs
                  text-[hsl(var(--marsala))]/40
                  mt-1
                  font-button
                ">

                  Skills you're confident sharing.

                </p>

              </div>


              <div className="
                space-y-3
              ">

                {profile.teaching.map(
                  (skill) => (

                    <div
                      key={skill.name}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        py-2
                      "
                    >

                      <span className="
                        px-3.5
                        py-2
                        rounded-full
                        bg-[hsl(var(--marsala))]/5
                        text-xs
                        text-[hsl(var(--marsala))]
                        font-button
                      ">

                        {skill.name}

                      </span>


                      {editing ? (

                        <div className="
                          flex
                          items-center
                          gap-2
                        ">

                          <select
                            value={
                              skill.level
                            }
                            onChange={(e) =>
                              updateTeachingLevel(
                                skill.name,
                                e.target.value
                              )
                            }
                            className="
                              h-8
                              px-2
                              rounded-lg
                              border
                              border-[hsl(var(--rose-quartz))]
                              bg-white
                              text-xs
                              outline-none
                              font-button
                            "
                          >

                            {skillLevels.map(
                              (level) => (

                                <option
                                  key={level}
                                  value={level}
                                >

                                  {level}

                                </option>

                              )
                            )}

                          </select>


                          <button
                            onClick={() =>
                              removeTeachingSkill(
                                skill.name
                              )
                            }
                            className="
                              text-[hsl(var(--marsala))]/35
                              hover:text-red-500
                            "
                          >

                            <X className="
                              w-4
                              h-4
                            " />

                          </button>

                        </div>

                      ) : (

                        <span className="
                          text-xs
                          text-[hsl(var(--marsala))]/40
                          font-button
                        ">

                          {skill.level}

                        </span>

                      )}

                    </div>

                  )
                )}


                {editing && (

                  <div className="
                    flex
                    gap-2
                    pt-2
                  ">

                    <input
                      value={
                        newTeachingSkill
                      }
                      onChange={(e) =>
                        setNewTeachingSkill(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {

                        if (
                          e.key === "Enter"
                        ) {
                          addTeachingSkill();
                        }

                      }}
                      placeholder="Add a skill..."
                      className="
                        flex-1
                        h-10
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-sm
                        font-button
                      "
                    />


                    <button
                      onClick={
                        addTeachingSkill
                      }
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-[hsl(var(--marsala))]
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <Plus className="
                        w-4
                        h-4
                      " />

                    </button>

                  </div>

                )}

              </div>

            </section>



            {/* =================================================
                LEARN
            ================================================== */}

            <section>

              <div className="
                mb-4
              ">

                <h2 className="
                  text-lg
                  font-semibold
                  text-[hsl(var(--marsala))]
                  font-button
                ">

                  What I want to learn

                </h2>


                <p className="
                  text-xs
                  text-[hsl(var(--marsala))]/40
                  mt-1
                  font-button
                ">

                  Skills you're currently working toward.

                </p>

              </div>


              <div className="
                space-y-3
              ">

                {profile.learning.map(
                  (skill) => (

                    <div
                      key={skill.name}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        py-2
                      "
                    >

                      <span className="
                        px-3.5
                        py-2
                        rounded-full
                        bg-[hsl(var(--peach))]/15
                        text-[hsl(var(--cognac))]
                        text-xs
                        font-button
                      ">

                        {skill.name}

                      </span>


                      {editing ? (

                        <div className="
                          flex
                          items-center
                          gap-2
                        ">

                          <select
                            value={
                              skill.level
                            }
                            onChange={(e) =>
                              updateLearningLevel(
                                skill.name,
                                e.target.value
                              )
                            }
                            className="
                              h-8
                              px-2
                              rounded-lg
                              border
                              border-[hsl(var(--rose-quartz))]
                              bg-white
                              text-xs
                              outline-none
                              font-button
                            "
                          >

                            {skillLevels.map(
                              (level) => (

                                <option
                                  key={level}
                                  value={level}
                                >

                                  {level}

                                </option>

                              )
                            )}

                          </select>


                          <button
                            onClick={() =>
                              removeLearningSkill(
                                skill.name
                              )
                            }
                            className="
                              text-[hsl(var(--marsala))]/35
                              hover:text-red-500
                            "
                          >

                            <X className="
                              w-4
                              h-4
                            " />

                          </button>

                        </div>

                      ) : (

                        <span className="
                          text-xs
                          text-[hsl(var(--marsala))]/40
                          font-button
                        ">

                          {skill.level}

                        </span>

                      )}

                    </div>

                  )
                )}


                {editing && (

                  <div className="
                    flex
                    gap-2
                    pt-2
                  ">

                    <input
                      value={
                        newLearningSkill
                      }
                      onChange={(e) =>
                        setNewLearningSkill(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {

                        if (
                          e.key === "Enter"
                        ) {
                          addLearningSkill();
                        }

                      }}
                      placeholder="Add a skill..."
                      className="
                        flex-1
                        h-10
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-sm
                        font-button
                      "
                    />


                    <button
                      onClick={
                        addLearningSkill
                      }
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-[hsl(var(--marsala))]
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <Plus className="
                        w-4
                        h-4
                      " />

                    </button>

                  </div>

                )}

              </div>

            </section>



            {/* =================================================
                INTERESTS
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-4
              ">

                Interests

              </h2>


              <div className="
                flex
                flex-wrap
                gap-2
              ">

                {profile.interests.map(
                  (interest) => (

                    <span
                      key={interest}
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3.5
                        py-2
                        rounded-full
                        border
                        border-[hsl(var(--rose-quartz))]
                        text-xs
                        text-[hsl(var(--marsala))]
                        font-button
                      "
                    >

                      {interest}


                      {editing && (

                        <button
                          onClick={() =>
                            removeInterest(
                              interest
                            )
                          }
                        >

                          <X className="
                            w-3
                            h-3
                            text-[hsl(var(--marsala))]/40
                          " />

                        </button>

                      )}

                    </span>

                  )
                )}

              </div>


              {editing && (

                <div className="
                  flex
                  gap-2
                  mt-3
                ">

                  <input
                    value={newInterest}
                    onChange={(e) =>
                      setNewInterest(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter"
                      ) {
                        addInterest();
                      }

                    }}
                    placeholder="Add an interest..."
                    className="
                      flex-1
                      h-10
                      px-3
                      rounded-lg
                      border
                      border-[hsl(var(--rose-quartz))]
                      bg-white
                      outline-none
                      text-sm
                      font-button
                    "
                  />


                  <button
                    onClick={addInterest}
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-[hsl(var(--marsala))]
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Plus className="
                      w-4
                      h-4
                    " />

                  </button>

                </div>

              )}

            </section>



            {/* =================================================
                GOALS
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-3
              ">

                Learning goals

              </h2>


              {editing ? (

                <textarea
                  value={profile.goals}
                  onChange={(e) =>
                    updateField(
                      "goals",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    min-h-[100px]
                    p-4
                    rounded-xl
                    border
                    border-[hsl(var(--rose-quartz))]
                    bg-white
                    outline-none
                    resize-none
                    text-sm
                    text-[hsl(var(--marsala))]
                    font-button
                  "
                />

              ) : (

                <p className="
                  text-sm
                  leading-7
                  text-[hsl(var(--marsala))]/55
                  font-button
                ">

                  {profile.goals}

                </p>

              )}

            </section>

          </div>



          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="
            space-y-9
          ">


            {/* =================================================
                AVAILABILITY
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-4
              ">

                Availability

              </h2>


              {editing ? (

                <div className="
                  space-y-2
                ">

                  {days.map((day) => {

                    const selected =
                      profile.availability.includes(
                        day
                      );

                    return (

                      <button
                        key={day}
                        onClick={() =>
                          toggleAvailability(
                            day
                          )
                        }
                        className="
                          w-full
                          flex
                          items-center
                          justify-between
                          px-3
                          py-2.5
                          rounded-lg
                          hover:bg-[hsl(var(--rose-quartz))]/10
                          text-sm
                          font-button
                        "
                      >

                        <span className="
                          text-[hsl(var(--marsala))]
                        ">

                          {day}

                        </span>


                        <span
                          className={`
                            w-5
                            h-5
                            rounded
                            border
                            flex
                            items-center
                            justify-center

                            ${
                              selected
                                ? `
                                  bg-[hsl(var(--marsala))]
                                  border-[hsl(var(--marsala))]
                                  text-white
                                `
                                : `
                                  border-[hsl(var(--rose-quartz))]
                                `
                            }
                          `}
                        >

                          {selected && (

                            <Check className="
                              w-3
                              h-3
                            " />

                          )}

                        </span>

                      </button>

                    );

                  })}

                </div>

              ) : (

                <div className="
                  flex
                  flex-wrap
                  gap-2
                ">

                  {profile.availability.map(
                    (day) => (

                      <span
                        key={day}
                        className="
                          px-3
                          py-2
                          rounded-full
                          bg-[hsl(var(--rose-quartz))]/15
                          text-xs
                          text-[hsl(var(--marsala))]
                          font-button
                        "
                      >

                        {day}

                      </span>

                    )
                  )}

                </div>

              )}

            </section>



            {/* =================================================
                LEARNING PREFERENCES
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-4
              ">

                Learning preferences

              </h2>


              <div className="
                space-y-5
              ">


                {/* Mode */}

                <div>

                  <p className="
                    text-xs
                    text-[hsl(var(--marsala))]/40
                    mb-2
                    font-button
                  ">

                    Learning mode

                  </p>


                  {editing ? (

                    <select
                      value={
                        profile.learningMode
                      }
                      onChange={(e) =>
                        updateField(
                          "learningMode",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        h-10
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-sm
                        font-button
                      "
                    >

                      {learningModes.map(
                        (mode) => (

                          <option
                            key={mode}
                            value={mode}
                          >

                            {mode}

                          </option>

                        )
                      )}

                    </select>

                  ) : (

                    <p className="
                      text-sm
                      text-[hsl(var(--marsala))]
                      font-button
                    ">

                      {profile.learningMode}

                    </p>

                  )}

                </div>



                {/* Duration */}

                <div>

                  <p className="
                    text-xs
                    text-[hsl(var(--marsala))]/40
                    mb-2
                    font-button
                  ">

                    Preferred session

                  </p>


                  {editing ? (

                    <select
                      value={
                        profile.sessionDuration
                      }
                      onChange={(e) =>
                        updateField(
                          "sessionDuration",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        h-10
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-sm
                        font-button
                      "
                    >

                      {durations.map(
                        (duration) => (

                          <option
                            key={duration}
                            value={duration}
                          >

                            {duration}

                          </option>

                        )
                      )}

                    </select>

                  ) : (

                    <p className="
                      text-sm
                      text-[hsl(var(--marsala))]
                      font-button
                    ">

                      {profile.sessionDuration}

                    </p>

                  )}

                </div>

              </div>

            </section>



            {/* =================================================
                LANGUAGES
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-4
              ">

                Languages

              </h2>


              <div className="
                flex
                flex-wrap
                gap-2
              ">

                {profile.languages.map(
                  (language) => (

                    <span
                      key={language}
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-2
                        rounded-full
                        bg-[hsl(var(--rose-quartz))]/15
                        text-xs
                        text-[hsl(var(--marsala))]
                        font-button
                      "
                    >

                      {language}


                      {editing && (

                        <button
                          onClick={() =>
                            removeLanguage(
                              language
                            )
                          }
                        >

                          <X className="
                            w-3
                            h-3
                          " />

                        </button>

                      )}

                    </span>

                  )
                )}

              </div>


              {editing && (

                <div className="
                  flex
                  gap-2
                  mt-3
                ">

                  <input
                    value={newLanguage}
                    onChange={(e) =>
                      setNewLanguage(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter"
                      ) {
                        addLanguage();
                      }

                    }}
                    placeholder="Add language..."
                    className="
                      flex-1
                      h-9
                      px-3
                      rounded-lg
                      border
                      border-[hsl(var(--rose-quartz))]
                      bg-white
                      outline-none
                      text-xs
                      font-button
                    "
                  />


                  <button
                    onClick={addLanguage}
                    className="
                      w-9
                      h-9
                      rounded-full
                      bg-[hsl(var(--marsala))]
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Plus className="
                      w-4
                      h-4
                    " />

                  </button>

                </div>

              )}

            </section>



            {/* =================================================
                SOCIAL LINKS
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-4
              ">

                Links

              </h2>


              <div className="
                space-y-3
              ">


                {/* GitHub */}

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <Github className="
                    w-4
                    h-4
                    text-[hsl(var(--marsala))]/50
                    shrink-0
                  " />


                  {editing ? (

                    <input
                      value={profile.github}
                      onChange={(e) =>
                        updateField(
                          "github",
                          e.target.value
                        )
                      }
                      placeholder="GitHub URL"
                      className="
                        flex-1
                        h-9
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-xs
                        font-button
                      "
                    />

                  ) : (

                    <span className="
                      text-xs
                      text-[hsl(var(--marsala))]/50
                      font-button
                    ">

                      {profile.github ||
                        "No GitHub added"}

                    </span>

                  )}

                </div>



                {/* LinkedIn */}

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <Linkedin className="
                    w-4
                    h-4
                    text-[hsl(var(--marsala))]/50
                    shrink-0
                  " />


                  {editing ? (

                    <input
                      value={
                        profile.linkedin
                      }
                      onChange={(e) =>
                        updateField(
                          "linkedin",
                          e.target.value
                        )
                      }
                      placeholder="LinkedIn URL"
                      className="
                        flex-1
                        h-9
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-xs
                        font-button
                      "
                    />

                  ) : (

                    <span className="
                      text-xs
                      text-[hsl(var(--marsala))]/50
                      font-button
                    ">

                      {profile.linkedin ||
                        "No LinkedIn added"}

                    </span>

                  )}

                </div>



                {/* Portfolio */}

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <Globe className="
                    w-4
                    h-4
                    text-[hsl(var(--marsala))]/50
                    shrink-0
                  " />


                  {editing ? (

                    <input
                      value={
                        profile.portfolio
                      }
                      onChange={(e) =>
                        updateField(
                          "portfolio",
                          e.target.value
                        )
                      }
                      placeholder="Portfolio URL"
                      className="
                        flex-1
                        h-9
                        px-3
                        rounded-lg
                        border
                        border-[hsl(var(--rose-quartz))]
                        bg-white
                        outline-none
                        text-xs
                        font-button
                      "
                    />

                  ) : (

                    <span className="
                      text-xs
                      text-[hsl(var(--marsala))]/50
                      font-button
                    ">

                      {profile.portfolio ||
                        "No portfolio added"}

                    </span>

                  )}

                </div>

              </div>

            </section>



            {/* =================================================
                ACTIVITY
                SYSTEM GENERATED
            ================================================== */}

            <section>

              <h2 className="
                text-lg
                font-semibold
                text-[hsl(var(--marsala))]
                font-button
                mb-4
              ">

                Recent activity

              </h2>


              <div className="
                space-y-5
              ">

                {activities.map(
                  (activity) => {

                    const Icon =
                      activity.icon;

                    return (

                      <div
                        key={activity.id}
                        className="
                          flex
                          gap-3
                        "
                      >

                        <div className="
                          w-8
                          h-8
                          rounded-full
                          bg-[hsl(var(--rose-quartz))]/20
                          flex
                          items-center
                          justify-center
                          shrink-0
                        ">

                          <Icon className="
                            w-3.5
                            h-3.5
                            text-[hsl(var(--marsala))]
                          " />

                        </div>


                        <div>

                          <p className="
                            text-xs
                            font-medium
                            text-[hsl(var(--marsala))]
                            font-button
                          ">

                            {activity.title}

                          </p>


                          <p className="
                            text-[11px]
                            text-[hsl(var(--marsala))]/40
                            mt-1
                            font-button
                          ">

                            {activity.person}

                          </p>


                          <p className="
                            text-[10px]
                            text-[hsl(var(--marsala))]/30
                            mt-1
                            font-button
                          ">

                            {activity.time}

                          </p>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </section>



            {/* =================================================
                QUICK LINKS
            ================================================== */}

            <section className="
              pt-5
              border-t
              border-[hsl(var(--rose-quartz))]
            ">

              <Link href="/chat">

                <button className="
                  w-full
                  flex
                  items-center
                  justify-between
                  py-3
                  text-sm
                  text-[hsl(var(--marsala))]
                  hover:text-[hsl(var(--cognac))]
                  font-button
                ">

                  <span className="
                    flex
                    items-center
                    gap-2
                  ">

                    <MessageCircle className="
                      w-4
                      h-4
                    " />

                    My conversations

                  </span>


                  <ArrowUpRight className="
                    w-4
                    h-4
                  " />

                </button>

              </Link>


              <Link href="/ai-matches">

                <button className="
                  w-full
                  flex
                  items-center
                  justify-between
                  py-3
                  text-sm
                  text-[hsl(var(--marsala))]
                  hover:text-[hsl(var(--cognac))]
                  font-button
                ">

                  <span className="
                    flex
                    items-center
                    gap-2
                  ">

                    <Users className="
                      w-4
                      h-4
                    " />

                    Discover people

                  </span>


                  <ArrowUpRight className="
                    w-4
                    h-4
                  " />

                </button>

              </Link>

            </section>

          </aside>

        </div>

      </main>

    </div>
  );
}