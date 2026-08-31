import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  Plus,
  UserRound,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   PEOPLE
========================================================= */

const people = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    skills: [
      "UI Design",
      "Figma",
      "Prototyping",
    ],
  },

  {
    id: 2,
    name: "Sarah Chen",
    role: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    skills: [
      "Python",
      "Data Science",
      "Machine Learning",
    ],
  },

  {
    id: 3,
    name: "James Wilson",
    role: "Web Developer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    skills: [
      "React",
      "JavaScript",
      "Web Development",
    ],
  },
];

/* =========================================================
   HELPERS
========================================================= */

const pad = (number) =>
  String(number).padStart(2, "0");

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
};

const prettyDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(
    `${dateString}T00:00:00`
  );

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
};

const getMonthName = (date) =>
  date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

/* =========================================================
   MAIN
========================================================= */

export default function Meets() {
  const [sessions, setSessions] =
    useState([]);

  const [currentMonth, setCurrentMonth] =
    useState(
      new Date(2026, 7, 1)
    );

  const [selectedDate, setSelectedDate] =
    useState(
      formatDate(new Date())
    );

  const [showNewSession, setShowNewSession] =
    useState(false);

  /* -------------------------------------------------------
     LOAD SESSIONS
  ------------------------------------------------------- */

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "leanr_meet_sessions"
      );

    if (saved) {
      try {
        setSessions(
          JSON.parse(saved)
        );
      } catch {
        setSessions([]);
      }
    }
  }, []);

  /* -------------------------------------------------------
     SAVE
  ------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "leanr_meet_sessions",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  /* -------------------------------------------------------
     CREATE SESSION
  ------------------------------------------------------- */

  const createSession = (
    newSession
  ) => {
    setSessions((current) => [
      ...current,
      newSession,
    ]);

    setSelectedDate(
      newSession.date
    );

    setShowNewSession(false);
  };

  /* -------------------------------------------------------
     DELETE
  ------------------------------------------------------- */

  const deleteSession = (
    sessionId
  ) => {
    setSessions((current) =>
      current.filter(
        (session) =>
          session.id !== sessionId
      )
    );
  };

  /* -------------------------------------------------------
     CALENDAR
  ------------------------------------------------------- */

  const calendarDays = useMemo(() => {
    const year =
      currentMonth.getFullYear();

    const month =
      currentMonth.getMonth();

    const firstDay =
      new Date(
        year,
        month,
        1
      ).getDay();

    const daysInMonth =
      new Date(
        year,
        month + 1,
        0
      ).getDate();

    const days = [];

    for (
      let i = 0;
      i < firstDay;
      i++
    ) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(day);
    }

    return days;
  }, [currentMonth]);

  const sessionsForDate =
    sessions.filter(
      (session) =>
        session.date ===
        selectedDate
    );

  const upcomingSessions =
    [...sessions]
      .sort(
        (a, b) =>
          new Date(
            `${a.date}T${a.time}`
          ) -
          new Date(
            `${b.date}T${b.time}`
          )
      )
      .filter(
        (session) =>
          new Date(
            `${session.date}T${session.time}`
          ) >= new Date()
      )
      .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[hsl(var(--marsala))]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <div>

            <p className="font-button text-sm text-[hsl(var(--cognac))]">
              Leanr together
            </p>

            <h1 className="font-serif text-5xl mt-1">
              Meets
            </h1>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-3">
              Plan your learning sessions and keep
              your skill exchanges moving.
            </p>

          </div>


          <button
            onClick={() =>
              setShowNewSession(true)
            }
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm hover:bg-[hsl(var(--cognac))] transition"
          >
            <Plus className="w-4 h-4" />
            New Session
          </button>

        </div>


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-10">

          {/* =================================================
              CALENDAR
          ================================================= */}

          <section className="bg-white rounded-[2rem] border border-[hsl(var(--rose-quartz))]/50 overflow-hidden">

            {/* MONTH HEADER */}

            <div className="flex items-center justify-between px-7 py-6 border-b border-[hsl(var(--rose-quartz))]/40">

              <div>

                <h2 className="font-serif text-2xl">
                  {getMonthName(
                    currentMonth
                  )}
                </h2>

                <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-1">
                  Your learning schedule
                </p>

              </div>


              <div className="flex items-center gap-2">

                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                        1
                      )
                    )
                  }
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>


                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                        1
                      )
                    )
                  }
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>


            {/* WEEK DAYS */}

            <div className="grid grid-cols-7 px-5 pt-5">

              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map(
                (day) => (
                  <div
                    key={day}
                    className="text-center font-button text-xs text-[hsl(var(--marsala))]/35 py-3"
                  >
                    {day}
                  </div>
                )
              )}

            </div>


            {/* DAYS */}

            <div className="grid grid-cols-7 px-5 pb-7">

              {calendarDays.map(
                (day, index) => {

                  if (!day) {
                    return (
                      <div
                        key={
                          `empty-${index}`
                        }
                        className="min-h-[95px]"
                      />
                    );
                  }

                  const date =
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    );

                  const dateString =
                    formatDate(
                      date
                    );

                  const daySessions =
                    sessions.filter(
                      (session) =>
                        session.date ===
                        dateString
                    );

                  const selected =
                    selectedDate ===
                    dateString;

                  return (
                    <button
                      key={
                        dateString
                      }
                      onClick={() =>
                        setSelectedDate(
                          dateString
                        )
                      }
                      className={`min-h-[95px] p-2 rounded-2xl text-left transition ${
                        selected
                          ? "bg-[hsl(var(--marsala))] text-white"
                          : "hover:bg-[hsl(var(--rose-quartz))]/10"
                      }`}
                    >

                      <div className="flex justify-center">

                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-button text-xs ${
                            selected
                              ? "bg-white text-[hsl(var(--marsala))]"
                              : ""
                          }`}
                        >
                          {day}
                        </span>

                      </div>


                      {daySessions.length >
                        0 && (

                        <div className="mt-3 space-y-1">

                          {daySessions
                            .slice(
                              0,
                              2
                            )
                            .map(
                              (
                                session
                              ) => (

                                <div
                                  key={
                                    session.id
                                  }
                                  className={`text-[9px] truncate rounded-md px-2 py-1 ${
                                    selected
                                      ? "bg-white/15"
                                      : "bg-[hsl(var(--rose-quartz))]/15"
                                  }`}
                                >
                                  {
                                    session.skill
                                  }
                                </div>

                              )
                            )}

                        </div>

                      )}

                    </button>
                  );
                }
              )}

            </div>

          </section>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <aside className="space-y-6">

            {/* TODAY / SELECTED */}

            <div>

              <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
                {prettyDate(
                  selectedDate
                )}
              </p>

              <h2 className="font-serif text-3xl mt-1">
                {selectedDate ===
                formatDate(
                  new Date()
                )
                  ? "Today"
                  : "Sessions"}
              </h2>

            </div>


            {sessionsForDate.length ===
            0 ? (

              <div className="bg-white rounded-2xl border border-dashed border-[hsl(var(--rose-quartz))] p-7">

                <CalendarIcon className="w-8 h-8 text-[hsl(var(--marsala))]/20" />

                <p className="font-serif text-xl mt-4">
                  No sessions planned
                </p>

                <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-2">
                  Create a session for this day.
                </p>

                <button
                  onClick={() =>
                    setShowNewSession(
                      true
                    )
                  }
                  className="mt-5 font-button text-xs underline"
                >
                  + New Session
                </button>

              </div>

            ) : (

              <div className="space-y-3">

                {sessionsForDate.map(
                  (session) => (

                    <SessionCard
                      key={
                        session.id
                      }
                      session={
                        session
                      }
                      onDelete={() =>
                        deleteSession(
                          session.id
                        )
                      }
                    />

                  )
                )}

              </div>

            )}


            {/* UPCOMING */}

            <div className="pt-5">

              <div className="flex items-center justify-between">

                <h3 className="font-serif text-2xl">
                  Upcoming
                </h3>

                <span className="font-button text-xs text-[hsl(var(--marsala))]/40">
                  {upcomingSessions.length}{" "}
                  sessions
                </span>

              </div>


              <div className="mt-4 space-y-3">

                {upcomingSessions.length ===
                0 ? (

                  <p className="font-button text-sm text-[hsl(var(--marsala))]/40">
                    No upcoming sessions.
                  </p>

                ) : (

                  upcomingSessions.map(
                    (
                      session
                    ) => (

                      <div
                        key={
                          session.id
                        }
                        className="bg-white rounded-2xl border border-[hsl(var(--rose-quartz))]/40 p-4"
                      >

                        <p className="font-button text-xs text-[hsl(var(--marsala))]/40">
                          {prettyDate(
                            session.date
                          )}{" "}
                          ·{" "}
                          {
                            session.time
                          }
                        </p>

                        <p className="font-button text-sm font-semibold mt-2">
                          {
                            session.skill
                          }
                        </p>

                        <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-1">
                          {session.type ===
                          "learning"
                            ? `Learning with ${session.person.name}`
                            : `Teaching ${session.person.name}`}
                        </p>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          </aside>

        </div>

      </main>


      {/* =================================================
          NEW SESSION PORTAL
      ================================================= */}

      <AnimatePresence>
        {showNewSession && (
          <NewSessionPortal
            close={() =>
              setShowNewSession(
                false
              )
            }
            createSession={
              createSession
            }
          />
        )}
      </AnimatePresence>

    </div>
  );
}


/* =========================================================
   SESSION CARD
========================================================= */

function SessionCard({
  session,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[hsl(var(--rose-quartz))]/50 p-5">

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="font-serif text-xl">
            {session.title}
          </p>

          <p className="font-button text-sm text-[hsl(var(--marsala))]/55 mt-1">
            {session.time} ·{" "}
            {session.duration} min
          </p>

        </div>

        <Clock className="w-5 h-5 text-[hsl(var(--marsala))]/35" />

      </div>


      <div className="flex items-center gap-3 mt-5">

        <img
          src={
            session.person.image
          }
          alt={
            session.person.name
          }
          className="w-9 h-9 rounded-full object-cover"
        />

        <div>

          <p className="font-button text-xs font-semibold">
            {
              session.person
                .name
            }
          </p>

          <p className="font-button text-[10px] text-[hsl(var(--marsala))]/40">
            {session.type ===
            "learning"
              ? "Learning"
              : "Teaching"}
          </p>

        </div>

      </div>


      <button
        onClick={onDelete}
        className="mt-4 font-button text-[10px] text-red-400 hover:text-red-600"
      >
        Remove session
      </button>

    </div>
  );
}


/* =========================================================
   NEW SESSION PORTAL
========================================================= */

function NewSessionPortal({
  close,
  createSession,
}) {
  const [step, setStep] =
    useState(1);

  const [person, setPerson] =
    useState(null);

  const [type, setType] =
    useState("learning");

  const [skill, setSkill] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [objective, setObjective] =
    useState("");

  const [date, setDate] =
    useState(
      formatDate(
        new Date()
      )
    );

  const [time, setTime] =
    useState("16:00");

  const [duration, setDuration] =
    useState(60);


  const submit = () => {

    if (
      !person ||
      !skill ||
      !title ||
      !date ||
      !time
    ) {
      return;
    }

    const newSession = {
      id:
        `meet-${Date.now()}`,

      title,

      skill,

      objective,

      type,

      person,

      date,

      time,

      duration,

      status:
        "upcoming",

      createdAt:
        new Date().toISOString(),
    };


    createSession(
      newSession
    );
  };


  return (
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
      className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] p-7 shadow-2xl"
      >

        {/* CLOSE */}

        <button
          onClick={close}
          className="absolute right-5 top-5 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/20"
        >
          <X className="w-5 h-5" />
        </button>


        {/* HEADER */}

        <p className="font-button text-xs text-[hsl(var(--cognac))]">
          New Session · Step{" "}
          {step}/3
        </p>

        <h2 className="font-serif text-4xl mt-1">
          Create a session
        </h2>

        <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-2">
          Plan one learning session with your partner.
        </p>


        {/* =================================================
            STEP 1
        ================================================= */}

        {step === 1 && (

          <div className="mt-8">

            <h3 className="font-serif text-2xl">
              Who is this session with?
            </h3>


            <div className="grid gap-3 mt-5">

              {people.map(
                (item) => {

                  const selected =
                    person?.id ===
                    item.id;

                  return (
                    <button
                      key={
                        item.id
                      }
                      onClick={() =>
                        setPerson(
                          item
                        )
                      }
                      className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition ${
                        selected
                          ? "border-[hsl(var(--marsala))] bg-[hsl(var(--rose-quartz))]/10"
                          : "border-[hsl(var(--rose-quartz))]/50 hover:border-[hsl(var(--marsala))]/30"
                      }`}
                    >

                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.name
                        }
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div className="flex-1">

                        <p className="font-button text-sm font-semibold">
                          {
                            item.name
                          }
                        </p>

                        <p className="font-button text-xs text-[hsl(var(--marsala))]/45">
                          {
                            item.role
                          }
                        </p>

                      </div>


                      {selected && (
                        <Check className="w-5 h-5" />
                      )}

                    </button>
                  );
                }
              )}

            </div>


            {person && (

              <div className="mt-6">

                <p className="font-button text-sm font-semibold">
                  What are you doing in this session?
                </p>

                <div className="grid grid-cols-2 gap-3 mt-3">

                  <button
                    onClick={() =>
                      setType(
                        "learning"
                      )
                    }
                    className={`p-4 rounded-2xl border text-left ${
                      type ===
                      "learning"
                        ? "border-[hsl(var(--marsala))] bg-[hsl(var(--rose-quartz))]/10"
                        : "border-[hsl(var(--rose-quartz))]/50"
                    }`}
                  >

                    <UserRound className="w-5 h-5" />

                    <p className="font-button text-sm font-semibold mt-3">
                      I'm Learning
                    </p>

                    <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
                      Learn from{" "}
                      {
                        person.name
                      }
                    </p>

                  </button>


                  <button
                    onClick={() =>
                      setType(
                        "teaching"
                      )
                    }
                    className={`p-4 rounded-2xl border text-left ${
                      type ===
                      "teaching"
                        ? "border-[hsl(var(--marsala))] bg-[hsl(var(--rose-quartz))]/10"
                        : "border-[hsl(var(--rose-quartz))]/50"
                    }`}
                  >

                    <GraduationCap className="w-5 h-5" />

                    <p className="font-button text-sm font-semibold mt-3">
                      I'm Teaching
                    </p>

                    <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
                      Teach{" "}
                      {
                        person.name
                      }
                    </p>

                  </button>

                </div>


                <label className="block font-button text-sm font-semibold mt-6">
                  Skill
                </label>

                <select
                  value={
                    skill
                  }
                  onChange={(e) =>
                    setSkill(
                      e.target
                        .value
                    )
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] bg-white font-button text-sm"
                >

                  <option value="">
                    Select a skill
                  </option>

                  {person.skills.map(
                    (
                      item
                    ) => (
                      <option
                        key={
                          item
                        }
                        value={
                          item
                        }
                      >
                        {item}
                      </option>
                    )
                  )}

                </select>

              </div>

            )}


            <button
              disabled={
                !person ||
                !skill
              }
              onClick={() =>
                setStep(2)
              }
              className="w-full mt-7 py-3.5 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm disabled:opacity-40"
            >
              Continue
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>

          </div>
        )}


        {/* =================================================
            STEP 2
        ================================================= */}

        {step === 2 && (

          <div className="mt-8">

            <h3 className="font-serif text-2xl">
              What will you do?
            </h3>


            <div className="mt-6">

              <label className="font-button text-sm font-semibold">
                Session title
              </label>

              <input
                value={
                  title
                }
                onChange={(e) =>
                  setTitle(
                    e.target
                      .value
                  )
                }
                placeholder="Example: Introduction to UI Design"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm"
              />

            </div>


            <div className="mt-5">

              <label className="font-button text-sm font-semibold">
                Session objective
              </label>

              <textarea
                value={
                  objective
                }
                onChange={(e) =>
                  setObjective(
                    e.target
                      .value
                  )
                }
                placeholder="What should you accomplish in this session?"
                className="mt-2 w-full min-h-32 px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm resize-none"
              />

            </div>


            <div className="flex gap-3 mt-7">

              <button
                onClick={() =>
                  setStep(1)
                }
                className="px-5 py-3 rounded-full border border-[hsl(var(--rose-quartz))] font-button text-sm"
              >
                <ArrowLeft className="inline w-4 h-4 mr-2" />
                Back
              </button>


              <button
                disabled={
                  !title.trim()
                }
                onClick={() =>
                  setStep(3)
                }
                className="flex-1 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm disabled:opacity-40"
              >
                Schedule
                <ArrowRight className="inline w-4 h-4 ml-2" />
              </button>

            </div>

          </div>
        )}


        {/* =================================================
            STEP 3
        ================================================= */}

        {step === 3 && (

          <div className="mt-8">

            <h3 className="font-serif text-2xl">
              Schedule it
            </h3>


            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div>

                <label className="font-button text-sm font-semibold">
                  Date
                </label>

                <input
                  type="date"
                  value={
                    date
                  }
                  onChange={(e) =>
                    setDate(
                      e.target
                        .value
                    )
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm"
                />

              </div>


              <div>

                <label className="font-button text-sm font-semibold">
                  Time
                </label>

                <input
                  type="time"
                  value={
                    time
                  }
                  onChange={(e) =>
                    setTime(
                      e.target
                        .value
                    )
                  }
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm"
                />

              </div>

            </div>


            <div className="mt-5">

              <label className="font-button text-sm font-semibold">
                Duration
              </label>

              <select
                value={
                  duration
                }
                onChange={(e) =>
                  setDuration(
                    Number(
                      e.target
                        .value
                    )
                  )
                }
                className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] bg-white font-button text-sm"
              >

                <option value={30}>
                  30 minutes
                </option>

                <option value={45}>
                  45 minutes
                </option>

                <option value={60}>
                  60 minutes
                </option>

                <option value={90}>
                  90 minutes
                </option>

                <option value={120}>
                  2 hours
                </option>

              </select>

            </div>


            {/* SUMMARY */}

            <div className="mt-7 p-5 rounded-2xl bg-[hsl(var(--rose-quartz))]/10">

              <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
                Session summary
              </p>

              <h4 className="font-serif text-xl mt-2">
                {title}
              </h4>

              <p className="font-button text-xs text-[hsl(var(--marsala))]/50 mt-2">
                {skill} ·{" "}
                {type ===
                "learning"
                  ? "Learning"
                  : "Teaching"}
              </p>

              <p className="font-button text-xs text-[hsl(var(--marsala))]/50 mt-1">
                With{" "}
                {
                  person.name
                }
              </p>

              <p className="font-button text-xs text-[hsl(var(--marsala))]/50 mt-1">
                {prettyDate(
                  date
                )}{" "}
                · {time} ·{" "}
                {duration} min
              </p>

            </div>


            <div className="flex gap-3 mt-7">

              <button
                onClick={() =>
                  setStep(2)
                }
                className="px-5 py-3 rounded-full border border-[hsl(var(--rose-quartz))] font-button text-sm"
              >
                <ArrowLeft className="inline w-4 h-4 mr-2" />
                Back
              </button>


              <button
                onClick={
                  submit
                }
                className="flex-1 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm"
              >
                <Check className="inline w-4 h-4 mr-2" />
                Create Session
              </button>

            </div>

          </div>
        )}

      </motion.div>

    </motion.div>
  );
}