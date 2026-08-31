import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  Lightbulb,
  Mail,
  MessageCircle,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";

/* =========================================================
   FAQ DATA
========================================================= */

const faqs = [
  {
    id: 1,
    question: "How does Leanr work?",
    answer:
      "Leanr helps people exchange skills. You can add skills you can teach, skills you want to learn, discover people, connect with them and plan a learning exchange together.",
  },
  {
    id: 2,
    question: "How do AI Matches work?",
    answer:
      "AI Matches use information such as your skills, learning interests, experience level and preferences to identify people who may be useful learning partners.",
  },
  {
    id: 3,
    question: "What is a Skill Exchange?",
    answer:
      "A Skill Exchange is a learning partnership where two people decide what they can teach each other and create a shared learning plan.",
  },
  {
    id: 4,
    question: "What happens after I connect with someone?",
    answer:
      "You can message them, start your first planning session and decide what skills you will exchange, how many sessions you need and when you want to meet.",
  },
  {
    id: 5,
    question: "How does My Learning work?",
    answer:
      "My Learning keeps your active learning exchanges organized. Each course can contain multiple sessions, and your progress can be updated as sessions are completed.",
  },
  {
    id: 6,
    question: "Can I block someone?",
    answer:
      "Yes. Open a person's profile, use the three-dot menu and choose Block. Blocked users can later be managed from Settings → Privacy & Safety.",
  },
];


/* =========================================================
   MAIN PAGE
========================================================= */

export default function Help() {

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    openFaq,
    setOpenFaq,
  ] = useState(null);

  const [
    feedbackType,
    setFeedbackType,
  ] = useState("Feedback");

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    submitted,
    setSubmitted,
  ] = useState(false);


  /* =======================================================
     FILTER FAQ
  ======================================================= */

  const filteredFaqs =
    faqs.filter(
      (faq) =>
        faq.question
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        faq.answer
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );


  /* =======================================================
     SUBMIT
  ======================================================= */

  const submitFeedback = () => {

    if (!message.trim()) {
      return;
    }


    const existing =
      JSON.parse(
        localStorage.getItem(
          "leanr_feedback"
        ) || "[]"
      );


    existing.push({
      id: Date.now(),
      type: feedbackType,
      message:
        message.trim(),
      createdAt:
        new Date().toISOString(),
    });


    localStorage.setItem(
      "leanr_feedback",
      JSON.stringify(existing)
    );


    setMessage("");
    setSubmitted(true);


    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };


  return (

    <div className="min-h-screen bg-[#faf9f6] text-[hsl(var(--marsala))]">

      <Navbar />


      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">


        {/* =================================================
            BACK
        ================================================= */}

        <Link href="/dashboard">

          <a className="inline-flex items-center gap-2 font-button text-sm text-[hsl(var(--marsala))]/50 hover:text-[hsl(var(--marsala))] transition">

            <ArrowLeft className="w-4 h-4" />

            Back

          </a>

        </Link>



        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mt-8">

          <div className="flex items-center gap-2">

            <CircleHelp className="w-4 h-4 text-[hsl(var(--cognac))]" />

            <p className="font-button text-xs uppercase tracking-[0.15em] text-[hsl(var(--marsala))]/40">
              We're here to help
            </p>

          </div>


          <h1 className="font-serif text-5xl md:text-6xl mt-2">
            Help & Feedback
          </h1>


          <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-4 max-w-2xl leading-6">
            Find answers, tell us what's not working,
            or help us make Leanr better.
          </p>

        </div>



        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="grid md:grid-cols-3 gap-4 mt-10">

          <QuickAction
            icon={BookOpen}
            title="Getting Started"
            text="Learn how Leanr works."
            href="#faq"
          />

          <QuickAction
            icon={ShieldAlert}
            title="Report a Problem"
            text="Something isn't working?"
            href="#feedback"
            onClick={() =>
              setFeedbackType(
                "Problem"
              )
            }
          />

          <QuickAction
            icon={Lightbulb}
            title="Share Feedback"
            text="Have an idea for Leanr?"
            href="#feedback"
            onClick={() =>
              setFeedbackType(
                "Feedback"
              )
            }
          />

        </section>



        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="mt-14">

          <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
            Find an answer
          </p>


          <div className="relative max-w-2xl mt-4">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--marsala))]/35" />

            <input
              value={
                search
              }
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search help..."
              className="w-full pl-11 pr-5 py-4 rounded-full bg-white border border-[hsl(var(--rose-quartz))]/50 font-button text-sm outline-none focus:border-[hsl(var(--marsala))]"
            />

          </div>

        </section>



        {/* =================================================
            FAQ
        ================================================= */}

        <section
          id="faq"
          className="mt-8"
        >

          <div className="flex items-center gap-2 mb-4">

            <MessageCircle className="w-4 h-4" />

            <h2 className="font-serif text-3xl">
              Frequently Asked Questions
            </h2>

          </div>


          <div className="divide-y divide-[hsl(var(--rose-quartz))]/35 border-y border-[hsl(var(--rose-quartz))]/35">

            {filteredFaqs.length ===
            0 ? (

              <div className="py-12 text-center">

                <p className="font-serif text-2xl">
                  No answers found
                </p>

                <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-2">
                  Try searching with different words.
                </p>

              </div>

            ) : (

              filteredFaqs.map(
                (faq) => {

                  const isOpen =
                    openFaq ===
                    faq.id;

                  return (

                    <div
                      key={
                        faq.id
                      }
                    >

                      <button
                        onClick={() =>
                          setOpenFaq(
                            isOpen
                              ? null
                              : faq.id
                          )
                        }
                        className="w-full flex items-center justify-between gap-5 py-5 text-left"
                      >

                        <span className="font-button text-sm font-semibold">
                          {
                            faq.question
                          }
                        </span>


                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />

                      </button>


                      <AnimatePresence>

                        {isOpen && (

                          <motion.div
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

                            <p className="font-button text-sm leading-6 text-[hsl(var(--marsala))]/55 pb-5 max-w-3xl">
                              {
                                faq.answer
                              }
                            </p>

                          </motion.div>

                        )}

                      </AnimatePresence>

                    </div>

                  );
                }
              )

            )}

          </div>

        </section>



        {/* =================================================
            FEEDBACK
        ================================================= */}

        <section
          id="feedback"
          className="mt-16 pt-12 border-t border-[hsl(var(--rose-quartz))]/40"
        >

          <div className="max-w-3xl">

            <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
              Help us improve
            </p>


            <h2 className="font-serif text-4xl mt-2">
              Tell us what you think.
            </h2>


            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-3 leading-6">
              Found something broken or have an idea
              that could make Leanr better? Tell us.
            </p>



            {/* TYPE */}

            <div className="flex flex-wrap gap-2 mt-7">

              {[
                "Feedback",
                "Problem",
                "Suggestion",
              ].map(
                (type) => (

                  <button
                    key={
                      type
                    }
                    onClick={() =>
                      setFeedbackType(
                        type
                      )
                    }
                    className={`px-4 py-2 rounded-full font-button text-xs transition ${
                      feedbackType ===
                      type
                        ? "bg-[hsl(var(--marsala))] text-white"
                        : "border border-[hsl(var(--rose-quartz))]/50 bg-white"
                    }`}
                  >
                    {type}
                  </button>

                )
              )}

            </div>



            {/* MESSAGE */}

            <textarea
              value={
                message
              }
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder={
                feedbackType ===
                "Problem"
                  ? "Tell us what went wrong..."
                  : feedbackType ===
                    "Suggestion"
                  ? "What would you like Leanr to improve?"
                  : "Share your thoughts..."
              }
              className="w-full min-h-40 mt-4 p-5 rounded-2xl bg-white border border-[hsl(var(--rose-quartz))]/50 font-button text-sm resize-none outline-none focus:border-[hsl(var(--marsala))]"
            />


            {/* SUBMIT */}

            <div className="flex items-center justify-between gap-5 mt-4">

              <p className="font-button text-xs text-[hsl(var(--marsala))]/35">
                Your feedback helps shape Leanr.
              </p>


              <button
                disabled={
                  !message.trim()
                }
                onClick={
                  submitFeedback
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm disabled:opacity-40 hover:bg-[hsl(var(--cognac))] transition"
              >

                <Send className="w-4 h-4" />

                Send

              </button>

            </div>


            {/* SUCCESS */}

            <AnimatePresence>

              {submitted && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                  }}
                  className="flex items-center gap-2 mt-5 font-button text-sm"
                >

                  <Check className="w-4 h-4" />

                  Thanks! Your feedback has been
                  recorded.

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </section>



        {/* =================================================
            CONTACT
        ================================================= */}

        <section className="mt-16 pt-10 border-t border-[hsl(var(--rose-quartz))]/40">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <div className="flex items-center gap-2">

                <Mail className="w-4 h-4" />

                <h2 className="font-serif text-2xl">
                  Still need help?
                </h2>

              </div>

              <p className="font-button text-sm text-[hsl(var(--marsala))]/45 mt-2">
                Reach out and we'll help you figure it out.
              </p>

            </div>


            <a
              href="mailto:support@leanr.app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[hsl(var(--marsala))]/20 bg-white font-button text-sm hover:bg-[hsl(var(--rose-quartz))]/10 transition"
            >

              Contact Support

              <ArrowUpRight className="w-4 h-4" />

            </a>

          </div>

        </section>



        {/* =================================================
            FOOTER LINKS
        ================================================= */}

        <div className="flex flex-wrap items-center gap-5 mt-12 pt-7 border-t border-[hsl(var(--rose-quartz))]/30">

          <Link href="/settings">

            <a className="font-button text-xs text-[hsl(var(--marsala))]/45 hover:text-[hsl(var(--marsala))]">
              Privacy & Safety
            </a>

          </Link>


          <Link href="/profile-setup">

            <a className="font-button text-xs text-[hsl(var(--marsala))]/45 hover:text-[hsl(var(--marsala))]">
              My Profile
            </a>

          </Link>


          <Link href="/explore">

            <a className="font-button text-xs text-[hsl(var(--marsala))]/45 hover:text-[hsl(var(--marsala))]">
              Explore Leanr
            </a>

          </Link>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon: Icon,
  title,
  text,
  href,
  onClick,
}) {

  return (

    <a
      href={href}
      onClick={onClick}
      className="group bg-white border border-[hsl(var(--rose-quartz))]/40 rounded-[1.5rem] p-5 hover:border-[hsl(var(--marsala))]/25 transition"
    >

      <div className="flex items-start justify-between">

        <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/15 flex items-center justify-center">

          <Icon className="w-4 h-4" />

        </div>


        <ArrowUpRight
          className="w-4 h-4 text-[hsl(var(--marsala))]/30 group-hover:text-[hsl(var(--marsala))] transition"
        />

      </div>


      <h3 className="font-serif text-xl mt-5">
        {title}
      </h3>


      <p className="font-button text-xs text-[hsl(var(--marsala))]/45 mt-1">
        {text}
      </p>

    </a>

  );
}