import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Check,
  ChevronRight,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

/* =========================================================
   DEFAULT SKILLS
========================================================= */

const defaultSkills = [
  {
    id: 1,
    name: "Python",
    type: "teach",
    level: "Advanced",
    progress: 80,
    experience: "2 years",
    description:
      "Python programming, problem solving and scripting.",
  },
  {
    id: 2,
    name: "UI/UX Design",
    type: "teach",
    level: "Intermediate",
    progress: 60,
    experience: "1 year",
    description:
      "Interface design, Figma and user experience basics.",
  },
  {
    id: 3,
    name: "React",
    type: "teach",
    level: "Intermediate",
    progress: 55,
    experience: "1 year",
    description:
      "Building responsive interfaces using React.",
  },
  {
    id: 4,
    name: "Machine Learning",
    type: "learn",
    level: "Beginner",
    progress: 30,
    experience: "Currently learning",
    description:
      "Learning ML concepts, models and practical implementation.",
  },
  {
    id: 5,
    name: "Public Speaking",
    type: "learn",
    level: "Intermediate",
    progress: 60,
    experience: "Currently learning",
    description:
      "Improving communication and presentation skills.",
  },
];

/* =========================================================
   MAIN
========================================================= */

export default function Skills() {
  const [skills, setSkills] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingSkill, setEditingSkill] =
    useState(null);

  /* -------------------------------------------------------
     LOAD
  ------------------------------------------------------- */

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "leanr_skills"
      );

    if (saved) {
      try {
        setSkills(
          JSON.parse(saved)
        );
      } catch {
        setSkills(
          defaultSkills
        );
      }
    } else {
      setSkills(
        defaultSkills
      );
    }
  }, []);

  /* -------------------------------------------------------
     SAVE
  ------------------------------------------------------- */

  useEffect(() => {
    if (skills.length > 0) {
      localStorage.setItem(
        "leanr_skills",
        JSON.stringify(skills)
      );
    }
  }, [skills]);

  /* -------------------------------------------------------
     FILTER
  ------------------------------------------------------- */

  const filteredSkills =
    useMemo(() => {
      return skills.filter(
        (skill) =>
          skill.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [skills, search]);

  const teachingSkills =
    filteredSkills.filter(
      (skill) =>
        skill.type === "teach"
    );

  const learningSkills =
    filteredSkills.filter(
      (skill) =>
        skill.type === "learn"
    );

  /* -------------------------------------------------------
     ADD
  ------------------------------------------------------- */

  const addSkill = (
    skill
  ) => {
    setSkills((current) => [
      ...current,
      {
        ...skill,
        id: Date.now(),
      },
    ]);

    setShowModal(false);
  };

  /* -------------------------------------------------------
     EDIT
  ------------------------------------------------------- */

  const updateSkill = (
    updatedSkill
  ) => {
    setSkills((current) =>
      current.map((skill) =>
        skill.id ===
        updatedSkill.id
          ? updatedSkill
          : skill
      )
    );

    setEditingSkill(null);
  };

  /* -------------------------------------------------------
     DELETE
  ------------------------------------------------------- */

  const deleteSkill = (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove this skill?"
      );

    if (!confirmed) return;

    setSkills((current) =>
      current.filter(
        (skill) =>
          skill.id !== id
      )
    );
  };

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
              Your skill profile
            </p>

            <h1 className="font-serif text-5xl mt-1">
              My Skills
            </h1>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-3 max-w-xl">
              Tell Leanr what you know and what you
              want to learn. Your skills help people
              discover you and power your learning
              matches.
            </p>

          </div>


          <button
            onClick={() =>
              setShowModal(true)
            }
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm hover:bg-[hsl(var(--cognac))] transition"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="relative max-w-xl mt-8">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--marsala))]/35" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search your skills..."
            className="w-full pl-11 pr-5 py-3.5 rounded-full bg-white border border-[hsl(var(--rose-quartz))]/50 font-button text-sm outline-none focus:border-[hsl(var(--marsala))]"
          />

        </div>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

          <Summary
            label="Skills I Teach"
            value={
              skills.filter(
                (skill) =>
                  skill.type ===
                  "teach"
              ).length
            }
          />

          <Summary
            label="Skills I'm Learning"
            value={
              skills.filter(
                (skill) =>
                  skill.type ===
                  "learn"
              ).length
            }
          />

          <Summary
            label="Advanced"
            value={
              skills.filter(
                (skill) =>
                  skill.level ===
                  "Advanced"
              ).length
            }
          />

          <Summary
            label="In Progress"
            value={
              skills.filter(
                (skill) =>
                  skill.type ===
                  "learn" &&
                  skill.progress <
                    100
              ).length
            }
          />

        </div>


        {/* =================================================
            TEACHING
        ================================================= */}

        <section className="mt-14">

          <div className="flex items-end justify-between">

            <div>

              <div className="flex items-center gap-2">

                <Sparkles className="w-4 h-4" />

                <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
                  Share what you know
                </p>

              </div>

              <h2 className="font-serif text-4xl mt-1">
                Skills I Teach
              </h2>

              <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-2">
                Skills you're confident enough to
                share with another learner.
              </p>

            </div>

          </div>


          <div className="mt-6 divide-y divide-[hsl(var(--rose-quartz))]/40">

            {teachingSkills.length ===
            0 ? (

              <EmptySkills
                message="You haven't added any teaching skills yet."
                onAdd={() =>
                  setShowModal(true)
                }
              />

            ) : (

              teachingSkills.map(
                (skill) => (

                  <SkillRow
                    key={
                      skill.id
                    }
                    skill={
                      skill
                    }
                    onEdit={() =>
                      setEditingSkill(
                        skill
                      )
                    }
                    onDelete={() =>
                      deleteSkill(
                        skill.id
                      )
                    }
                  />

                )
              )

            )}

          </div>

        </section>


        {/* =================================================
            LEARNING
        ================================================= */}

        <section className="mt-16">

          <div>

            <div className="flex items-center gap-2">

              <BookOpen className="w-4 h-4" />

              <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
                Keep growing
              </p>

            </div>

            <h2 className="font-serif text-4xl mt-1">
              Skills I'm Learning
            </h2>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-2">
              Skills you're currently working towards.
            </p>

          </div>


          <div className="mt-6 divide-y divide-[hsl(var(--rose-quartz))]/40">

            {learningSkills.length ===
            0 ? (

              <EmptySkills
                message="You haven't added any learning skills yet."
                onAdd={() =>
                  setShowModal(true)
                }
              />

            ) : (

              learningSkills.map(
                (skill) => (

                  <SkillRow
                    key={
                      skill.id
                    }
                    skill={
                      skill
                    }
                    onEdit={() =>
                      setEditingSkill(
                        skill
                      )
                    }
                    onDelete={() =>
                      deleteSkill(
                        skill.id
                      )
                    }
                  />

                )
              )

            )}

          </div>

        </section>


        {/* =================================================
            HOW SKILLS WORK
        ================================================= */}

        <section className="mt-16 border-t border-[hsl(var(--rose-quartz))]/40 pt-10">

          <div className="max-w-3xl">

            <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
              How Leanr uses your skills
            </p>

            <h2 className="font-serif text-3xl mt-2">
              Your skills shape your experience.
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mt-7">

              <InfoItem
                number="01"
                title="Discover"
                text="Your teaching skills help other learners find you."
              />

              <InfoItem
                number="02"
                title="Match"
                text="Your learning goals help Leanr suggest useful people."
              />

              <InfoItem
                number="03"
                title="Grow"
                text="Your course progress can update your skill journey over time."
              />

            </div>

          </div>

        </section>

      </main>


      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      <AnimatePresence>

        {(showModal ||
          editingSkill) && (

          <SkillModal
            skill={
              editingSkill
            }
            close={() => {
              setShowModal(
                false
              );
              setEditingSkill(
                null
              );
            }}
            save={
              editingSkill
                ? updateSkill
                : addSkill
            }
          />

        )}

      </AnimatePresence>

    </div>
  );
}


/* =========================================================
   SKILL ROW
========================================================= */

function SkillRow({
  skill,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      layout
      className="py-6 flex flex-col md:flex-row md:items-center gap-5"
    >

      {/* NAME */}

      <div className="w-full md:w-64 shrink-0">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/20 flex items-center justify-center">

            {skill.type ===
            "teach" ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <BookOpen className="w-4 h-4" />
            )}

          </div>

          <div>

            <h3 className="font-button text-sm font-semibold">
              {skill.name}
            </h3>

            <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
              {skill.level}
              {" · "}
              {skill.experience}
            </p>

          </div>

        </div>

      </div>


      {/* PROGRESS */}

      <div className="flex-1">

        <div className="flex items-center justify-between mb-2">

          <span className="font-button text-xs text-[hsl(var(--marsala))]/45">
            Skill progress
          </span>

          <span className="font-button text-xs font-semibold">
            {skill.progress}%
          </span>

        </div>


        <div className="h-2 rounded-full bg-[hsl(var(--rose-quartz))]/20 overflow-hidden">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width:
                `${skill.progress}%`,
            }}
            transition={{
              duration: 0.6,
            }}
            className="h-full rounded-full bg-[hsl(var(--marsala))]"
          />

        </div>


        {skill.description && (

          <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-2 line-clamp-1">
            {skill.description}
          </p>

        )}

      </div>


      {/* ACTIONS */}

      <div className="flex items-center gap-2">

        <button
          onClick={onEdit}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/15"
          title="Edit skill"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          onClick={onDelete}
          className="w-9 h-9 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50"
          title="Delete skill"
        >
          <Trash2 className="w-4 h-4" />
        </button>

      </div>

    </motion.div>
  );
}


/* =========================================================
   SKILL MODAL
========================================================= */

function SkillModal({
  skill,
  close,
  save,
}) {
  const [name, setName] =
    useState(
      skill?.name || ""
    );

  const [type, setType] =
    useState(
      skill?.type ||
        "teach"
    );

  const [level, setLevel] =
    useState(
      skill?.level ||
        "Beginner"
    );

  const [progress, setProgress] =
    useState(
      skill?.progress ??
        0
    );

  const [experience, setExperience] =
    useState(
      skill?.experience ||
        ""
    );

  const [description, setDescription] =
    useState(
      skill?.description ||
        ""
    );


  const handleSave = () => {

    if (!name.trim()) {
      return;
    }

    save({
      id:
        skill?.id ||
        Date.now(),

      name:
        name.trim(),

      type,

      level,

      progress:
        Number(
          progress
        ),

      experience,

      description:
        description.trim(),
    });
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
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative w-full max-w-xl bg-white rounded-[2rem] p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
      >

        {/* CLOSE */}

        <button
          onClick={
            close
          }
          className="absolute right-5 top-5 w-9 h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/20"
        >
          <X className="w-5 h-5" />
        </button>


        <p className="font-button text-xs text-[hsl(var(--cognac))]">
          {skill
            ? "Edit Skill"
            : "Add Skill"}
        </p>

        <h2 className="font-serif text-4xl mt-1">
          {skill
            ? "Update your skill"
            : "Add a skill"}
        </h2>

        <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-2">
          Keep this information accurate so Leanr can
          understand what you know and what you want
          to learn.
        </p>


        {/* NAME */}

        <div className="mt-7">

          <label className="font-button text-sm font-semibold">
            Skill name
          </label>

          <input
            value={
              name
            }
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Example: Python"
            className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm outline-none focus:border-[hsl(var(--marsala))]"
          />

        </div>


        {/* TYPE */}

        <div className="mt-5">

          <label className="font-button text-sm font-semibold">
            I want to
          </label>

          <div className="grid grid-cols-2 gap-3 mt-2">

            <button
              onClick={() =>
                setType(
                  "teach"
                )
              }
              className={`p-4 rounded-xl border text-left ${
                type ===
                "teach"
                  ? "border-[hsl(var(--marsala))] bg-[hsl(var(--rose-quartz))]/10"
                  : "border-[hsl(var(--rose-quartz))]/50"
              }`}
            >

              <Sparkles className="w-4 h-4" />

              <p className="font-button text-sm font-semibold mt-2">
                Teach
              </p>

              <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
                Share this skill with others.
              </p>

            </button>


            <button
              onClick={() =>
                setType(
                  "learn"
                )
              }
              className={`p-4 rounded-xl border text-left ${
                type ===
                "learn"
                  ? "border-[hsl(var(--marsala))] bg-[hsl(var(--rose-quartz))]/10"
                  : "border-[hsl(var(--rose-quartz))]/50"
              }`}
            >

              <BookOpen className="w-4 h-4" />

              <p className="font-button text-sm font-semibold mt-2">
                Learn
              </p>

              <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
                Find someone who can teach you.
              </p>

            </button>

          </div>

        </div>


        {/* LEVEL */}

        <div className="mt-5">

          <label className="font-button text-sm font-semibold">
            Current level
          </label>

          <select
            value={
              level
            }
            onChange={(e) =>
              setLevel(
                e.target.value
              )
            }
            className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] bg-white font-button text-sm"
          >

            <option>
              Beginner
            </option>

            <option>
              Intermediate
            </option>

            <option>
              Advanced
            </option>

            <option>
              Expert
            </option>

          </select>

        </div>


        {/* PROGRESS */}

        <div className="mt-5">

          <div className="flex justify-between">

            <label className="font-button text-sm font-semibold">
              Progress
            </label>

            <span className="font-button text-sm">
              {progress}%
            </span>

          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={
              progress
            }
            onChange={(e) =>
              setProgress(
                e.target.value
              )
            }
            className="w-full mt-3"
          />

        </div>


        {/* EXPERIENCE */}

        <div className="mt-5">

          <label className="font-button text-sm font-semibold">
            Experience
          </label>

          <input
            value={
              experience
            }
            onChange={(e) =>
              setExperience(
                e.target.value
              )
            }
            placeholder="Example: 2 years"
            className="mt-2 w-full px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm"
          />

        </div>


        {/* DESCRIPTION */}

        <div className="mt-5">

          <label className="font-button text-sm font-semibold">
            About this skill
          </label>

          <textarea
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Tell people a little about your experience..."
            className="mt-2 w-full min-h-24 px-4 py-3 rounded-xl border border-[hsl(var(--rose-quartz))] font-button text-sm resize-none"
          />

        </div>


        {/* SAVE */}

        <button
          disabled={
            !name.trim()
          }
          onClick={
            handleSave
          }
          className="w-full mt-7 py-3.5 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm disabled:opacity-40"
        >
          <Check className="inline w-4 h-4 mr-2" />

          {skill
            ? "Save Changes"
            : "Add Skill"}
        </button>

      </motion.div>

    </motion.div>
  );
}


/* =========================================================
   SUMMARY
========================================================= */

function Summary({
  label,
  value,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[hsl(var(--rose-quartz))]/40 p-5">

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
   EMPTY
========================================================= */

function EmptySkills({
  message,
  onAdd,
}) {
  return (
    <div className="py-10 text-center border-b border-[hsl(var(--rose-quartz))]/40">

      <p className="font-button text-sm text-[hsl(var(--marsala))]/45">
        {message}
      </p>

      <button
        onClick={
          onAdd
        }
        className="mt-3 font-button text-xs underline"
      >
        + Add a skill
      </button>

    </div>
  );
}


/* =========================================================
   INFO
========================================================= */

function InfoItem({
  number,
  title,
  text,
}) {
  return (
    <div>

      <p className="font-button text-xs text-[hsl(var(--cognac))]">
        {number}
      </p>

      <h3 className="font-serif text-xl mt-2">
        {title}
      </h3>

      <p className="font-button text-xs text-[hsl(var(--marsala))]/50 mt-2 leading-5">
        {text}
      </p>

    </div>
  );
}