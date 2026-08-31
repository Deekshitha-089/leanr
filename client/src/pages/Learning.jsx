import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Plus,
  Star,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/* =========================================================
   PEOPLE
========================================================= */

const people = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=300&h=300&fit=crop",
    teaches: ["React", "TypeScript", "Frontend"],
    wants: ["UI/UX", "Figma"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Data Science Student",
    image:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=300&fit=crop",
    teaches: ["Python", "Data Science", "Machine Learning"],
    wants: ["Public Speaking", "UI Design"],
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Web Developer",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop",
    teaches: ["JavaScript", "CSS", "Web Development"],
    wants: ["Music", "Piano"],
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Learning() {
  const [courses, setCourses] = useState([]);

  const [selectedCourseId, setSelectedCourseId] =
    useState(null);

  const [showFirstBlast, setShowFirstBlast] =
    useState(false);

  /* -------------------------------------------------------
     LOAD
  ------------------------------------------------------- */

  useEffect(() => {
    const saved = localStorage.getItem(
      "leanr_courses"
    );

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCourses(parsed);

          if (parsed.length > 0) {
            setSelectedCourseId(parsed[0].id);
          }
        }
      } catch {
        localStorage.removeItem(
          "leanr_courses"
        );
      }
    }
  }, []);

  /* -------------------------------------------------------
     SAVE
  ------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "leanr_courses",
      JSON.stringify(courses)
    );
  }, [courses]);

  /* -------------------------------------------------------
     SELECTED COURSE
  ------------------------------------------------------- */

  const selectedCourse =
    courses.find(
      (course) =>
        course.id === selectedCourseId
    ) || null;

  /* -------------------------------------------------------
     ADD COURSE
  ------------------------------------------------------- */

  const addCourse = (newCourses) => {
    setCourses((current) => [
      ...current,
      ...newCourses,
    ]);

    if (newCourses.length > 0) {
      setSelectedCourseId(
        newCourses[0].id
      );
    }

    setShowFirstBlast(false);
  };

  /* -------------------------------------------------------
     UPDATE COURSE
  ------------------------------------------------------- */

  const updateCourse = (
    courseId,
    updater
  ) => {
    setCourses((current) =>
      current.map((course) =>
        course.id === courseId
          ? updater(course)
          : course
      )
    );
  };

  /* -------------------------------------------------------
     DELETE COURSE
  ------------------------------------------------------- */

  const deleteCourse = (
    courseId
  ) => {
    const confirmed =
      window.confirm(
        "Remove this course?"
      );

    if (!confirmed) return;

    const remaining =
      courses.filter(
        (course) =>
          course.id !== courseId
      );

    setCourses(remaining);

    setSelectedCourseId(
      remaining[0]?.id || null
    );
  };

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (
    courses.length === 0
  ) {
    return (
      <div className="min-h-screen bg-[#faf9f6] text-[hsl(var(--marsala))]">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">

          <div className="max-w-4xl">
            <p className="font-button text-sm text-[hsl(var(--cognac))]">
              Your learning space
            </p>

            <h1 className="font-serif text-6xl mt-2">
              My Learning
            </h1>

            <p className="font-button text-base text-[hsl(var(--marsala))]/60 mt-5 leading-7 max-w-2xl">
              Every skill exchange you create will live
              here. Choose a partner, plan your course,
              schedule your sessions and track your
              progress.
            </p>
          </div>

          {/* FIRST BLAST */}

          <button
            onClick={() =>
              setShowFirstBlast(true)
            }
            className="mt-10 w-full max-w-4xl text-left group"
          >
            <div className="rounded-[2rem] bg-[hsl(var(--marsala))] text-white p-8 md:p-10 transition-all group-hover:-translate-y-1 group-hover:shadow-xl">

              <div className="flex flex-col md:flex-row md:items-center gap-7">

                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <Plus className="w-7 h-7" />
                </div>

                <div className="flex-1">

                  <p className="font-button text-xs uppercase tracking-wider text-white/50">
                    First Blast
                  </p>

                  <h2 className="font-serif text-3xl mt-1">
                    Start your first course
                  </h2>

                  <p className="font-button text-sm text-white/60 mt-3">
                    Find someone, exchange skills and
                    build your first learning plan.
                  </p>

                </div>

                <div className="w-12 h-12 rounded-full bg-white text-[hsl(var(--marsala))] flex items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </div>

              </div>

            </div>
          </button>

          {/* EMPTY ANALYTICS */}

          <div className="mt-16 max-w-4xl">

            <div className="flex items-center gap-3">

              <BarChart3 className="w-5 h-5" />

              <div>
                <h2 className="font-serif text-3xl">
                  Analytics
                </h2>

                <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-1">
                  Analytics will appear once you
                  start learning.
                </p>
              </div>

            </div>

            <div className="mt-5 rounded-[2rem] border border-dashed border-[hsl(var(--rose-quartz))] p-12 text-center">

              <BarChart3 className="w-10 h-10 mx-auto text-[hsl(var(--marsala))]/20" />

              <h3 className="font-serif text-2xl mt-4">
                No learning data yet
              </h3>

              <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-2">
                Complete sessions and review them to
                start generating your analytics.
              </p>

            </div>

          </div>

        </main>

        <FirstBlast
          open={showFirstBlast}
          close={() =>
            setShowFirstBlast(false)
          }
          addCourse={addCourse}
        />

      </div>
    );
  }

  /* =======================================================
     COURSE LIST + DETAIL
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[hsl(var(--marsala))]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

          <div>
            <p className="font-button text-sm text-[hsl(var(--cognac))]">
              Your learning journey
            </p>

            <h1 className="font-serif text-5xl mt-1">
              My Learning
            </h1>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-3">
              {courses.length}{" "}
              {courses.length === 1
                ? "course"
                : "courses"}{" "}
              in progress
            </p>
          </div>

          <button
            onClick={() =>
              setShowFirstBlast(true)
            }
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm hover:bg-[hsl(var(--cognac))]"
          >
            <Plus className="w-4 h-4" />
            First Blast
          </button>

        </div>

        {/* =================================================
            COURSE LIST
        ================================================= */}

        <section className="mt-10">

          <div className="mb-4">

            <h2 className="font-serif text-3xl">
              Your Courses
            </h2>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-1">
              Select a course to see all its sessions,
              progress and analytics.
            </p>

          </div>


          {/* LEARNING */}

          {courses.filter(
            (course) =>
              course.type ===
              "learning"
          ).length > 0 && (

            <div className="mt-7">

              <div className="flex items-center gap-2 mb-3">

                <UserRound className="w-4 h-4" />

                <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/45">
                  I'm Learning
                </p>

              </div>

              <div className="space-y-3">

                {courses
                  .filter(
                    (course) =>
                      course.type ===
                      "learning"
                  )
                  .map(
                    (course) => (
                      <CourseListItem
                        key={
                          course.id
                        }
                        course={
                          course
                        }
                        selected={
                          course.id ===
                          selectedCourseId
                        }
                        onClick={() =>
                          setSelectedCourseId(
                            course.id
                          )
                        }
                      />
                    )
                  )}

              </div>

            </div>

          )}


          {/* TEACHING */}

          {courses.filter(
            (course) =>
              course.type ===
              "teaching"
          ).length > 0 && (

            <div className="mt-8">

              <div className="flex items-center gap-2 mb-3">

                <GraduationCap className="w-4 h-4" />

                <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/45">
                  I'm Teaching
                </p>

              </div>

              <div className="space-y-3">

                {courses
                  .filter(
                    (course) =>
                      course.type ===
                      "teaching"
                  )
                  .map(
                    (course) => (
                      <CourseListItem
                        key={
                          course.id
                        }
                        course={
                          course
                        }
                        selected={
                          course.id ===
                          selectedCourseId
                        }
                        onClick={() =>
                          setSelectedCourseId(
                            course.id
                          )
                        }
                      />
                    )
                  )}

              </div>

            </div>

          )}

        </section>


        {/* =================================================
            SELECTED COURSE
        ================================================= */}

        {selectedCourse && (
          <CourseDetails
            course={
              selectedCourse
            }
            onBack={() =>
              setSelectedCourseId(
                null
              )
            }
            onCompleteSession={(
              session
            ) => {
              updateCourse(
                selectedCourse.id,
                (course) => ({
                  ...course,
                  sessions:
                    course.sessions.map(
                      (item) =>
                        item.id ===
                        session.id
                          ? {
                              ...item,
                              status:
                                "completed",
                              completedAt:
                                new Date().toISOString(),
                            }
                          : item
                    ),
                })
              );
            }}
            onSaveReview={(
              sessionId,
              review
            ) => {
              updateCourse(
                selectedCourse.id,
                (course) => ({
                  ...course,
                  sessions:
                    course.sessions.map(
                      (item) =>
                        item.id ===
                        sessionId
                          ? {
                              ...item,
                              review,
                            }
                          : item
                    ),
                })
              );
            }}
            onDelete={() =>
              deleteCourse(
                selectedCourse.id
              )
            }
          />
        )}

      </main>


      <FirstBlast
        open={showFirstBlast}
        close={() =>
          setShowFirstBlast(false)
        }
        addCourse={addCourse}
      />

    </div>
  );
}


/* =========================================================
   COURSE LIST ITEM
========================================================= */

function CourseListItem({
  course,
  selected,
  onClick,
}) {
  const completed =
    course.sessions.filter(
      (session) =>
        session.status ===
        "completed"
    ).length;

  const total =
    course.sessions.length;

  const progress =
    total > 0
      ? Math.round(
          (completed / total) *
            100
        )
      : 0;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white rounded-2xl border p-5 transition-all ${
        selected
          ? "border-[hsl(var(--marsala))] shadow-md"
          : "border-[hsl(var(--rose-quartz))]/50 hover:border-[hsl(var(--marsala))]/40"
      }`}
    >

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-[hsl(var(--rose-quartz))]/20 flex items-center justify-center shrink-0">

          {course.type ===
          "learning" ? (
            <UserRound className="w-5 h-5" />
          ) : (
            <GraduationCap className="w-5 h-5" />
          )}

        </div>


        <div className="flex-1 min-w-0">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">

            <h3 className="font-serif text-2xl truncate">
              {course.skill}
            </h3>

            <span className="font-button text-sm">
              {completed}/
              {total}{" "}
              completed
            </span>

          </div>


          <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-1">
            {course.type ===
            "learning"
              ? `From ${course.partner.name}`
              : `Teaching ${course.partner.name}`}
          </p>


          <div className="flex items-center gap-3 mt-4">

            <div className="flex-1 h-2 rounded-full bg-[hsl(var(--rose-quartz))]/20 overflow-hidden">

              <div
                style={{
                  width:
                    `${progress}%`,
                }}
                className="h-full rounded-full bg-[hsl(var(--marsala))]"
              />

            </div>

            <span className="font-button text-xs font-semibold w-10 text-right">
              {progress}%
            </span>

          </div>

        </div>


        <ChevronRight
          className={`w-5 h-5 shrink-0 transition-transform ${
            selected
              ? "rotate-90"
              : ""
          }`}
        />

      </div>

    </button>
  );
}


/* =========================================================
   COURSE DETAILS
========================================================= */

function CourseDetails({
  course,
  onBack,
  onCompleteSession,
  onSaveReview,
  onDelete,
}) {
  const [chartType, setChartType] =
    useState("bar");

  const [reviewSession, setReviewSession] =
    useState(null);

  const completedSessions =
    course.sessions.filter(
      (session) =>
        session.status ===
        "completed"
    );

  const upcomingSessions =
    course.sessions.filter(
      (session) =>
        session.status ===
        "upcoming"
    );

  const total =
    course.sessions.length;

  const completed =
    completedSessions.length;

  const progress =
    total > 0
      ? Math.round(
          (completed /
            total) *
            100
        )
      : 0;

  const totalHours =
    completedSessions.reduce(
      (sum, session) =>
        sum +
        Number(
          session.duration || 60
        ),
      0
    ) / 60;

  const chartData =
    course.sessions.map(
      (session) => ({
        name: `S${session.sessionNumber}`,
        completed:
          session.status ===
          "completed"
            ? 1
            : 0,
        confidence:
          session.review
            ?.confidence || 0,
        understanding:
          session.review
            ?.understanding || 0,
      })
    );

  const pieData = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Remaining",
      value: total - completed,
    },
  ];

  return (
    <section className="mt-12">

      {/* BACK */}

      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 font-button text-sm text-[hsl(var(--marsala))]/60 hover:text-[hsl(var(--marsala))]"
      >
        <ArrowLeft className="w-4 h-4" />
        Your Courses
      </button>


      {/* COURSE HEADER */}

      <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

        <div>

          <p className="font-button text-sm text-[hsl(var(--cognac))]">
            {course.type ===
            "learning"
              ? "Learning"
              : "Teaching"}
          </p>

          <h2 className="font-serif text-5xl mt-1">
            {course.skill}
          </h2>

          <div className="flex items-center gap-3 mt-4">

            <img
              src={
                course.partner.image
              }
              alt={
                course.partner.name
              }
              className="w-9 h-9 rounded-full object-cover"
            />

            <p className="font-button text-sm text-[hsl(var(--marsala))]/55">
              {course.type ===
              "learning"
                ? `Learning from ${course.partner.name}`
                : `Teaching ${course.partner.name}`}
            </p>

          </div>

        </div>


        <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 font-button text-xs text-red-500"
        >
          <Trash2 className="w-4 h-4" />
          Remove course
        </button>

      </div>


      {/* GOAL */}

      <div className="mt-8 p-6 bg-white rounded-2xl border border-[hsl(var(--rose-quartz))]/50">

        <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
          Course goal
        </p>

        <p className="font-button text-sm text-[hsl(var(--marsala))]/70 mt-2 leading-6">
          {course.goal}
        </p>

      </div>


      {/* PROGRESS */}

      <div className="mt-8">

        <div className="flex items-end justify-between">

          <div>
            <p className="font-button text-xs text-[hsl(var(--marsala))]/40">
              Course progress
            </p>

            <p className="font-serif text-4xl mt-1">
              {completed}/
              {total}
            </p>
          </div>

          <p className="font-button text-2xl font-semibold">
            {progress}%
          </p>

        </div>


        <div className="h-3 mt-4 rounded-full bg-[hsl(var(--rose-quartz))]/20 overflow-hidden">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width:
                `${progress}%`,
            }}
            className="h-full rounded-full bg-[hsl(var(--marsala))]"
          />

        </div>

      </div>


      {/* =================================================
          ALL SESSIONS
      ================================================= */}

      <section className="mt-12">

        <div className="flex items-center justify-between">

          <div>
            <h3 className="font-serif text-3xl">
              All Sessions
            </h3>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-1">
              Your complete course plan.
            </p>
          </div>

        </div>


        <div className="mt-5 space-y-3">

          {course.sessions.map(
            (session) => (

              <Session
                key={
                  session.id
                }
                session={
                  session
                }
                onComplete={() =>
                  onCompleteSession(
                    session
                  )
                }
                onReview={() =>
                  setReviewSession(
                    session
                  )
                }
              />

            )
          )}

        </div>

      </section>


      {/* =================================================
          NEXT SESSION
      ================================================= */}

      {upcomingSessions.length >
        0 && (

        <section className="mt-12">

          <p className="font-button text-sm text-[hsl(var(--cognac))]">
            Coming up
          </p>

          <h3 className="font-serif text-3xl mt-1">
            Next Session
          </h3>

          <div className="mt-5 bg-[hsl(var(--marsala))] text-white rounded-[2rem] p-7">

            <div className="flex flex-col md:flex-row md:items-center gap-6">

              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>

              <div className="flex-1">

                <p className="font-button text-xs text-white/50">
                  Session{" "}
                  {
                    upcomingSessions[0]
                      .sessionNumber
                  }
                </p>

                <h4 className="font-serif text-2xl mt-1">
                  {
                    upcomingSessions[0]
                      .topic
                  }
                </h4>

                <div className="flex flex-wrap gap-4 mt-3 font-button text-xs text-white/60">

                  <span>
                    {
                      upcomingSessions[0]
                        .scheduledDay
                    }
                  </span>

                  <span>
                    {
                      upcomingSessions[0]
                        .scheduledTime
                    }
                  </span>

                  <span>
                    {
                      upcomingSessions[0]
                        .duration
                    }{" "}
                    minutes
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  onCompleteSession(
                    upcomingSessions[0]
                  )
                }
                className="px-5 py-3 rounded-full bg-white text-[hsl(var(--marsala))] font-button text-sm"
              >
                Complete Session
              </button>

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          ANALYTICS
      ================================================= */}

      <section className="mt-16">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

          <div>

            <div className="flex items-center gap-2">

              <BarChart3 className="w-5 h-5" />

              <p className="font-button text-sm text-[hsl(var(--cognac))]">
                Course analytics
              </p>

            </div>

            <h3 className="font-serif text-4xl mt-1">
              {course.skill} Progress
            </h3>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-2">
              Generated from your completed sessions.
            </p>

          </div>


          <select
            value={
              chartType
            }
            onChange={(e) =>
              setChartType(
                e.target.value
              )
            }
            className="px-4 py-2.5 rounded-full bg-white border border-[hsl(var(--rose-quartz))] font-button text-sm"
          >

            <option value="bar">
              Bar Chart
            </option>

            <option value="line">
              Confidence
            </option>

            <option value="pie">
              Completion
            </option>

          </select>

        </div>


        {/* METRICS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          <Metric
            label="Sessions"
            value={`${completed}/${total}`}
          />

          <Metric
            label="Progress"
            value={`${progress}%`}
          />

          <Metric
            label="Learning Hours"
            value={`${totalHours.toFixed(
              1
            )}h`}
          />

          <Metric
            label="Reviews"
            value={
              completedSessions.filter(
                (session) =>
                  session.review
              ).length
            }
          />

        </div>


        {/* NO ANALYTICS */}

        {completed === 0 ? (

          <div className="mt-5 bg-white border border-dashed border-[hsl(var(--rose-quartz))] rounded-[2rem] p-12 text-center">

            <BarChart3 className="w-10 h-10 mx-auto text-[hsl(var(--marsala))]/20" />

            <h4 className="font-serif text-2xl mt-4">
              No analytics yet
            </h4>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-2 max-w-md mx-auto">
              Complete your first session and
              submit your review. Your real learning
              data will appear here.
            </p>

          </div>

        ) : (

          <div className="mt-5 bg-white rounded-[2rem] border border-[hsl(var(--rose-quartz))]/50 p-6">

            <ResponsiveContainer
              width="100%"
              height={330}
            >

              {chartType ===
              "bar" ? (

                <BarChart
                  data={
                    chartData
                  }
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis
                    allowDecimals={
                      false
                    }
                  />

                  <Tooltip />

                  <Bar
                    dataKey="completed"
                    fill="hsl(var(--marsala))"
                    radius={[
                      8,
                      8,
                      0,
                      0,
                    ]}
                    name="Completed"
                  />

                </BarChart>

              ) : chartType ===
                "line" ? (

                <LineChart
                  data={
                    chartData
                  }
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis
                    domain={[
                      0,
                      5,
                    ]}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="confidence"
                    stroke="hsl(var(--marsala))"
                    strokeWidth={
                      3
                    }
                    dot={{
                      r: 5,
                    }}
                    name="Confidence"
                  />

                  <Line
                    type="monotone"
                    dataKey="understanding"
                    stroke="hsl(var(--cognac))"
                    strokeWidth={
                      3
                    }
                    dot={{
                      r: 5,
                    }}
                    name="Understanding"
                  />

                  <Legend />

                </LineChart>

              ) : (

                <PieChart>

                  <Pie
                    data={
                      pieData
                    }
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={
                      110
                    }
                    label
                  >

                    <Cell fill="hsl(var(--marsala))" />

                    <Cell fill="hsl(var(--rose-quartz))" />

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              )}

            </ResponsiveContainer>

          </div>

        )}

      </section>


      {/* =================================================
          REVIEWS
      ================================================= */}

      {completed > 0 && (

        <section className="mt-12">

          <h3 className="font-serif text-3xl">
            Session Insights
          </h3>

          <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-1">
            Your reflections from this course.
          </p>


          <div className="grid md:grid-cols-2 gap-4 mt-5">

            {completedSessions.map(
              (session) => (

                <div
                  key={
                    session.id
                  }
                  className="bg-white rounded-2xl border border-[hsl(var(--rose-quartz))]/50 p-5"
                >

                  <div className="flex items-center justify-between">

                    <h4 className="font-button font-semibold">
                      {
                        session.topic
                      }
                    </h4>

                    <CheckCircle2 className="w-5 h-5 text-green-600" />

                  </div>


                  {session.review ? (

                    <>

                      <div className="flex gap-5 mt-4 font-button text-xs text-[hsl(var(--marsala))]/60">

                        <span>
                          Understanding:{" "}
                          {
                            session
                              .review
                              .understanding
                          }/5
                        </span>

                        <span>
                          Confidence:{" "}
                          {
                            session
                              .review
                              .confidence
                          }/5
                        </span>

                      </div>


                      {session.review
                        .feedback && (

                        <p className="font-button text-sm text-[hsl(var(--marsala))]/60 mt-4">
                          "
                          {
                            session
                              .review
                              .feedback
                          }
                          "
                        </p>

                      )}

                    </>

                  ) : (

                    <button
                      onClick={() =>
                        setReviewSession(
                          session
                        )
                      }
                      className="mt-4 font-button text-xs underline"
                    >
                      Add review
                    </button>

                  )}

                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* REVIEW MODAL */}

      <ReviewModal
        session={
          reviewSession
        }
        close={() =>
          setReviewSession(
            null
          )
        }
        save={(review) => {

          onSaveReview(
            reviewSession.id,
            review
          );

          setReviewSession(
            null
          );

        }}
      />

    </section>
  );
}


/* =========================================================
   SESSION
========================================================= */

function Session({
  session,
  onComplete,
  onReview,
}) {
  const completed =
    session.status ===
    "completed";

  return (
    <div className="bg-white rounded-2xl border border-[hsl(var(--rose-quartz))]/50 p-5">

      <div className="flex flex-col md:flex-row md:items-center gap-4">

        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center font-button text-sm shrink-0 ${
            completed
              ? "bg-green-50 text-green-700"
              : "bg-[hsl(var(--rose-quartz))]/20"
          }`}
        >

          {completed ? (
            <Check className="w-5 h-5" />
          ) : (
            String(
              session.sessionNumber
            ).padStart(2, "0")
          )}

        </div>


        <div className="flex-1">

          <div className="flex items-center gap-3 flex-wrap">

            <h4 className="font-button font-semibold">
              {session.topic}
            </h4>

            {completed && (
              <span className="font-button text-xs text-green-700">
                Completed
              </span>
            )}

          </div>


          <div className="flex flex-wrap gap-4 mt-2 font-button text-xs text-[hsl(var(--marsala))]/45">

            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {session.scheduledDay}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {session.scheduledTime}
            </span>

            <span>
              {session.duration} min
            </span>

          </div>

        </div>


        {completed ? (

          <button
            onClick={
              onReview
            }
            className="px-5 py-2.5 rounded-full border border-[hsl(var(--rose-quartz))] font-button text-xs"
          >
            {session.review
              ? "Edit Review"
              : "Review"}
          </button>

        ) : (

          <button
            onClick={
              onComplete
            }
            className="px-5 py-2.5 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-xs"
          >
            Complete
          </button>

        )}

      </div>

    </div>
  );
}


/* =========================================================
   FIRST BLAST
========================================================= */

function FirstBlast({
  open,
  close,
  addCourse,
}) {
  const [step, setStep] =
    useState(1);

  const [person, setPerson] =
    useState(null);

  const [learningSkill, setLearningSkill] =
    useState("");

  const [teachingSkill, setTeachingSkill] =
    useState("");

  const [learningGoal, setLearningGoal] =
    useState("");

  const [teachingGoal, setTeachingGoal] =
    useState("");

  const [learningCount, setLearningCount] =
    useState(8);

  const [teachingCount, setTeachingCount] =
    useState(6);

  const [learningTopics, setLearningTopics] =
    useState(
      Array.from(
        { length: 8 },
        (_, i) =>
          `Session ${i + 1}`
      )
    );

  const [teachingTopics, setTeachingTopics] =
    useState(
      Array.from(
        { length: 6 },
        (_, i) =>
          `Session ${i + 1}`
      )
    );

  const [sessionsPerWeek, setSessionsPerWeek] =
    useState(2);

  const [day, setDay] =
    useState("Saturday");

  const [time, setTime] =
    useState("16:00");


  if (!open) return null;


  const changeCount = (
    type,
    value
  ) => {

    const count = Math.max(
      1,
      Math.min(
        30,
        Number(value) || 1
      )
    );


    if (
      type ===
      "learning"
    ) {

      setLearningCount(
        count
      );

      setLearningTopics(
        (current) =>
          Array.from(
            {
              length:
                count,
            },
            (_, i) =>
              current[i] ||
              `Session ${
                i + 1
              }`
          )
      );

    } else {

      setTeachingCount(
        count
      );

      setTeachingTopics(
        (current) =>
          Array.from(
            {
              length:
                count,
            },
            (_, i) =>
              current[i] ||
              `Session ${
                i + 1
              }`
          )
      );

    }
  };


  const updateTopic = (
    type,
    index,
    value
  ) => {

    if (
      type ===
      "learning"
    ) {

      setLearningTopics(
        (current) =>
          current.map(
            (topic, i) =>
              i === index
                ? value
                : topic
          )
      );

    } else {

      setTeachingTopics(
        (current) =>
          current.map(
            (topic, i) =>
              i === index
                ? value
                : topic
          )
      );

    }
  };


  const createSessions = (
    topics,
    count,
    direction,
    skill
  ) => {

    return Array.from(
      {
        length:
          count,
      },
      (_, i) => ({
        id:
          `${Date.now()}-${direction}-${i}`,

        sessionNumber:
          i + 1,

        topic:
          topics[i] ||
          `Session ${
            i + 1
          }`,

        direction,

        skill,

        duration: 60,

        scheduledDay:
          day,

        scheduledTime:
          time,

        status:
          "upcoming",

        completedAt:
          null,

        review:
          null,
      })
    );
  };


  const finish = () => {

    const learningCourse = {
      id:
        `course-${Date.now()}-learning`,

      type:
        "learning",

      skill:
        learningSkill,

      partner:
        person,

      goal:
        learningGoal,

      sessions:
        createSessions(
          learningTopics,
          learningCount,
          "learning",
          learningSkill
        ),

      sessionsPerWeek,

      day,

      time,
    };


    const teachingCourse = {
      id:
        `course-${Date.now()}-teaching`,

      type:
        "teaching",

      skill:
        teachingSkill,

      partner:
        person,

      goal:
        teachingGoal,

      sessions:
        createSessions(
          teachingTopics,
          teachingCount,
          "teaching",
          teachingSkill
        ),

      sessionsPerWeek,

      day,

      time,
    };


    addCourse([
      learningCourse,
      teachingCourse,
    ]);

    setStep(1);
  };


  return (
    <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">

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
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] p-7 shadow-2xl"
      >

        <button
          onClick={close}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/20"
        >
          <X className="w-5 h-5" />
        </button>


        <p className="font-button text-xs text-[hsl(var(--cognac))]">
          First Blast · Step {step}/4
        </p>

        <h2 className="font-serif text-3xl mt-1">
          Build your learning exchange.
        </h2>


        {/* STEP 1 */}

        {step === 1 && (

          <div className="mt-8">

            <h3 className="font-serif text-2xl">
              Choose your partner
            </h3>

            <div className="grid md:grid-cols-3 gap-3 mt-6">

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
                      className={`text-left p-5 rounded-2xl border ${
                        selected
                          ? "border-[hsl(var(--marsala))] bg-[hsl(var(--rose-quartz))]/10"
                          : "border-[hsl(var(--rose-quartz))]/50"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                          className="w-12 h-12 rounded-full object-cover"
                        />

                        <div>

                          <p className="font-button font-semibold text-sm">
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

                      </div>

                      {selected && (
                        <p className="font-button text-xs mt-3">
                          ✓ Selected
                        </p>
                      )}

                    </button>
                  );
                }
              )}

            </div>


            {person && (

              <div className="grid md:grid-cols-2 gap-5 mt-7">

                <SelectBox
                  label="I want to learn"
                  value={
                    learningSkill
                  }
                  onChange={
                    setLearningSkill
                  }
                  options={
                    person.teaches
                  }
                />

                <SelectBox
                  label="I want to teach"
                  value={
                    teachingSkill
                  }
                  onChange={
                    setTeachingSkill
                  }
                  options={
                    person.wants
                  }
                />

              </div>

            )}


            <NextButton
              disabled={
                !person ||
                !learningSkill ||
                !teachingSkill
              }
              onClick={() =>
                setStep(2)
              }
            >
              Set Goals
            </NextButton>

          </div>
        )}


        {/* STEP 2 */}

        {step === 2 && (

          <div className="mt-8">

            <h3 className="font-serif text-2xl">
              Define both goals
            </h3>

            <div className="grid md:grid-cols-2 gap-5 mt-7">

              <div>

                <label className="font-button text-sm font-semibold">
                  My learning goal
                </label>

                <textarea
                  value={
                    learningGoal
                  }
                  onChange={(e) =>
                    setLearningGoal(
                      e.target
                        .value
                    )
                  }
                  placeholder="What do you want to achieve?"
                  className="mt-2 w-full min-h-36 p-4 rounded-2xl border border-[hsl(var(--rose-quartz))] font-button text-sm resize-none"
                />

              </div>


              <div>

                <label className="font-button text-sm font-semibold">
                  Their learning goal
                </label>

                <textarea
                  value={
                    teachingGoal
                  }
                  onChange={(e) =>
                    setTeachingGoal(
                      e.target
                        .value
                    )
                  }
                  placeholder="What will you help them achieve?"
                  className="mt-2 w-full min-h-36 p-4 rounded-2xl border border-[hsl(var(--rose-quartz))] font-button text-sm resize-none"
                />

              </div>

            </div>


            <NextButton
              disabled={
                !learningGoal.trim() ||
                !teachingGoal.trim()
              }
              onClick={() =>
                setStep(3)
              }
            >
              Plan Sessions
            </NextButton>

          </div>
        )}


        {/* STEP 3 */}

        {step === 3 && (

          <div className="mt-8 space-y-6">

            <CourseEditor
              title={
                `Learn ${learningSkill}`
              }
              subtitle={
                `From ${person?.name}`
              }
              count={
                learningCount
              }
              setCount={(value) =>
                changeCount(
                  "learning",
                  value
                )
              }
              topics={
                learningTopics
              }
              updateTopic={(
                index,
                value
              ) =>
                updateTopic(
                  "learning",
                  index,
                  value
                )
              }
            />


            <CourseEditor
              title={
                `Teach ${teachingSkill}`
              }
              subtitle={
                `To ${person?.name}`
              }
              count={
                teachingCount
              }
              setCount={(value) =>
                changeCount(
                  "teaching",
                  value
                )
              }
              topics={
                teachingTopics
              }
              updateTopic={(
                index,
                value
              ) =>
                updateTopic(
                  "teaching",
                  index,
                  value
                )
              }
            />


            <NextButton
              onClick={() =>
                setStep(4)
              }
            >
              Schedule
            </NextButton>

          </div>
        )}


        {/* STEP 4 */}

        {step === 4 && (

          <div className="mt-8">

            <h3 className="font-serif text-2xl">
              Set your schedule
            </h3>

            <div className="grid md:grid-cols-3 gap-5 mt-7">

              <SelectField
                label="Sessions per week"
                value={
                  sessionsPerWeek
                }
                onChange={(e) =>
                  setSessionsPerWeek(
                    Number(
                      e.target
                        .value
                    )
                  )
                }
                options={[
                  [
                    1,
                    "1 session",
                  ],
                  [
                    2,
                    "2 sessions",
                  ],
                  [
                    3,
                    "3 sessions",
                  ],
                ]}
              />

              <SelectField
                label="Preferred day"
                value={
                  day
                }
                onChange={(e) =>
                  setDay(
                    e.target
                      .value
                  )
                }
                options={[
                  [
                    "Monday",
                    "Monday",
                  ],
                  [
                    "Tuesday",
                    "Tuesday",
                  ],
                  [
                    "Wednesday",
                    "Wednesday",
                  ],
                  [
                    "Thursday",
                    "Thursday",
                  ],
                  [
                    "Friday",
                    "Friday",
                  ],
                  [
                    "Saturday",
                    "Saturday",
                  ],
                  [
                    "Sunday",
                    "Sunday",
                  ],
                ]}
              />

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
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] font-button"
                />

              </div>

            </div>


            <div className="mt-8 p-6 rounded-2xl bg-[hsl(var(--rose-quartz))]/10">

              <p className="font-button text-sm font-semibold">
                Ready to start?
              </p>

              <p className="font-button text-sm text-[hsl(var(--marsala))]/55 mt-2">
                You'll create two courses:
                <strong>
                  {" "}
                  {learningSkill}
                </strong>{" "}
                and{" "}
                <strong>
                  {teachingSkill}
                </strong>.
              </p>

              <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-2">
                {sessionsPerWeek} sessions
                per week · {day} ·{" "}
                {time}
              </p>

            </div>


            <button
              onClick={
                finish
              }
              className="w-full mt-7 py-4 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm hover:bg-[hsl(var(--cognac))]"
            >
              Confirm & Create Courses
            </button>

          </div>
        )}

      </motion.div>
    </div>
  );
}


/* =========================================================
   COURSE EDITOR
========================================================= */

function CourseEditor({
  title,
  subtitle,
  count,
  setCount,
  topics,
  updateTopic,
}) {
  return (
    <div className="border border-[hsl(var(--rose-quartz))]/50 rounded-2xl p-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h4 className="font-serif text-xl">
            {title}
          </h4>

          <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-1">
            {subtitle}
          </p>

        </div>


        <div>

          <label className="font-button text-xs text-[hsl(var(--marsala))]/50">
            Number of sessions
          </label>

          <input
            type="number"
            min="1"
            max="30"
            value={
              count
            }
            onChange={(e) =>
              setCount(
                e.target.value
              )
            }
            className="block mt-1 w-24 px-3 py-2 rounded-lg border border-[hsl(var(--rose-quartz))] font-button text-sm"
          />

        </div>

      </div>


      <div className="mt-5 space-y-2">

        {Array.from({
          length:
            count,
        }).map(
          (_, index) => (

            <div
              key={
                index
              }
              className="flex items-center gap-3"
            >

              <span className="w-7 font-button text-xs text-[hsl(var(--marsala))]/35">
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}
              </span>

              <input
                value={
                  topics[
                    index
                  ] || ""
                }
                onChange={(e) =>
                  updateTopic(
                    index,
                    e.target
                      .value
                  )
                }
                className="flex-1 px-4 py-2.5 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm"
                placeholder={`Session ${
                  index + 1
                }`}
              />

            </div>

          )
        )}

      </div>

    </div>
  );
}


/* =========================================================
   REVIEW MODAL
========================================================= */

function ReviewModal({
  session,
  close,
  save,
}) {
  const [understanding, setUnderstanding] =
    useState(
      session?.review
        ?.understanding || 0
    );

  const [confidence, setConfidence] =
    useState(
      session?.review
        ?.confidence || 0
    );

  const [achieved, setAchieved] =
    useState(
      session?.review
        ?.achieved || ""
    );

  const [feedback, setFeedback] =
    useState(
      session?.review
        ?.feedback || ""
    );

  if (!session) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative w-full max-w-xl bg-white rounded-[2rem] p-7 shadow-2xl"
      >

        <button
          onClick={close}
          className="absolute right-5 top-5 w-9 h-9 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>


        <p className="font-button text-xs text-[hsl(var(--cognac))]">
          Session Review
        </p>

        <h2 className="font-serif text-3xl mt-1">
          {session.topic}
        </h2>


        <Rating
          label="Understanding"
          value={
            understanding
          }
          onChange={
            setUnderstanding
          }
        />

        <Rating
          label="Confidence"
          value={
            confidence
          }
          onChange={
            setConfidence
          }
        />


        <div className="mt-6">

          <p className="font-button text-sm font-semibold">
            Did you achieve the goal?
          </p>

          <div className="flex flex-wrap gap-2 mt-3">

            {[
              "Yes",
              "Partially",
              "No",
            ].map(
              (option) => (

                <button
                  key={
                    option
                  }
                  onClick={() =>
                    setAchieved(
                      option
                    )
                  }
                  className={`px-4 py-2 rounded-full border font-button text-xs ${
                    achieved ===
                    option
                      ? "bg-[hsl(var(--marsala))] text-white border-[hsl(var(--marsala))]"
                      : "border-[hsl(var(--rose-quartz))]"
                  }`}
                >
                  {option}
                </button>

              )
            )}

          </div>

        </div>


        <textarea
          value={
            feedback
          }
          onChange={(e) =>
            setFeedback(
              e.target.value
            )
          }
          placeholder="What do you want to remember?"
          className="mt-6 w-full min-h-28 p-4 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm resize-none"
        />


        <button
          disabled={
            !understanding ||
            !confidence
          }
          onClick={() =>
            save({
              understanding,
              confidence,
              achieved,
              feedback,
            })
          }
          className="w-full mt-5 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm disabled:opacity-40"
        >
          Save Review
        </button>

      </motion.div>

    </div>
  );
}


/* =========================================================
   RATING
========================================================= */

function Rating({
  label,
  value,
  onChange,
}) {
  return (
    <div className="mt-6">

      <p className="font-button text-sm font-semibold">
        {label}
      </p>

      <div className="flex gap-2 mt-3">

        {[1, 2, 3, 4, 5].map(
          (number) => (

            <button
              key={
                number
              }
              onClick={() =>
                onChange(
                  number
                )
              }
            >

              <Star
                className={`w-7 h-7 ${
                  number <=
                  value
                    ? "fill-[hsl(var(--cognac))] text-[hsl(var(--cognac))]"
                    : "text-[hsl(var(--rose-quartz))]"
                }`}
              />

            </button>

          )
        )}

      </div>

    </div>
  );
}


/* =========================================================
   SELECT BOX
========================================================= */

function SelectBox({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="font-button text-sm font-semibold">
        {label}
      </label>

      <select
        value={
          value
        }
        onChange={(e) =>
          onChange(
            e.target
              .value
          )
        }
        className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] bg-white font-button"
      >

        <option value="">
          Choose a skill
        </option>

        {options.map(
          (option) => (
            <option
              key={
                option
              }
              value={
                option
              }
            >
              {option}
            </option>
          )
        )}

      </select>

    </div>
  );
}


/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="font-button text-sm font-semibold">
        {label}
      </label>

      <select
        value={
          value
        }
        onChange={
          onChange
        }
        className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] bg-white font-button"
      >

        {options.map(
          ([value, label]) => (

            <option
              key={
                value
              }
              value={
                value
              }
            >
              {label}
            </option>

          )
        )}

      </select>

    </div>
  );
}


/* =========================================================
   METRIC
========================================================= */

function Metric({
  label,
  value,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[hsl(var(--rose-quartz))]/50 p-5">

      <p className="font-button text-xs text-[hsl(var(--marsala))]/45">
        {label}
      </p>

      <p className="font-button text-2xl font-semibold mt-2">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   NEXT BUTTON
========================================================= */

function NextButton({
  children,
  onClick,
  disabled,
}) {
  return (
    <div className="flex justify-end mt-7">

      <button
        disabled={
          disabled
        }
        onClick={
          onClick
        }
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm disabled:opacity-40"
      >

        {children}

        <ArrowRight className="w-4 h-4" />

      </button>

    </div>
  );
}