import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";

import {
  Search,
  Send,
  Phone,
  Video,
  Info,
  MoreVertical,
  Smile,
  Paperclip,
  Image as ImageIcon,
  Mic,
  ArrowLeft,
  CheckCheck,
  Calendar,
} from "lucide-react";


/* =========================================================
   MOCK DATA
   Later this will come from the backend/database.
========================================================= */

const conversations = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Design Student",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    online: true,
    unread: 2,
    lastMessage: "Are you free tomorrow for our session?",
    time: "10m",

    learning: ["UI Design", "Figma"],
    teaching: ["React"],

    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hey! I saw that you're learning UI Design.",
        time: "9:42 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Yes! I've been wanting to improve my design skills.",
        time: "9:44 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "I'd be happy to help you with Figma and UI Design.",
        time: "9:45 AM",
      },
      {
        id: 4,
        sender: "me",
        text: "That would be amazing. I can help you with React in return.",
        time: "9:47 AM",
      },
      {
        id: 5,
        sender: "them",
        text: "Perfect! Are you free tomorrow for our session?",
        time: "10:02 AM",
      },
    ],
  },

  {
    id: 2,
    name: "Sarah Chen",
    role: "Computer Science Student",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    online: false,
    unread: 1,
    lastMessage: "Thanks for helping me with React!",
    time: "1h",

    learning: ["Python", "Data Science"],
    teaching: ["Web Development"],

    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hey! Would you be interested in a Python exchange?",
        time: "8:12 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Definitely. Python is one of the skills I want to improve.",
        time: "8:15 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "Great! I can help you with Python and Data Science.",
        time: "8:17 AM",
      },
      {
        id: 4,
        sender: "me",
        text: "And I can help you with web development.",
        time: "8:20 AM",
      },
      {
        id: 5,
        sender: "them",
        text: "Thanks for helping me with React!",
        time: "9:01 AM",
      },
    ],
  },

  {
    id: 3,
    name: "Daniel Lee",
    role: "Software Developer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    online: true,
    unread: 0,
    lastMessage: "Sounds good! Let's do Saturday.",
    time: "Yesterday",

    learning: ["React", "JavaScript"],
    teaching: ["UI/UX"],

    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hey! I saw your profile on LEANR.",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "Hey Daniel! I'd love to learn React from you.",
        time: "Yesterday",
      },
      {
        id: 3,
        sender: "them",
        text: "Absolutely. I could also use some help with UI/UX.",
        time: "Yesterday",
      },
      {
        id: 4,
        sender: "me",
        text: "That's something I can definitely help with.",
        time: "Yesterday",
      },
      {
        id: 5,
        sender: "them",
        text: "Sounds good! Let's do Saturday.",
        time: "Yesterday",
      },
    ],
  },

  {
    id: 4,
    name: "Emily Davis",
    role: "Language Student",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    online: false,
    unread: 0,
    lastMessage: "I can teach you some basic French!",
    time: "2d",

    learning: ["French", "Spanish"],
    teaching: ["Web Development"],

    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi! I saw that you're interested in learning French.",
        time: "Monday",
      },
      {
        id: 2,
        sender: "me",
        text: "Yes! I've always wanted to learn.",
        time: "Monday",
      },
      {
        id: 3,
        sender: "them",
        text: "I can teach you some basic French!",
        time: "Monday",
      },
    ],
  },

  {
    id: 5,
    name: "Priya Sharma",
    role: "Business Student",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
    online: true,
    unread: 0,
    lastMessage: "I'll send you the notes later.",
    time: "3d",

    learning: ["Marketing", "Business"],
    teaching: ["Python"],

    messages: [
      {
        id: 1,
        sender: "them",
        text: "Would you be interested in exchanging skills?",
        time: "Friday",
      },
      {
        id: 2,
        sender: "me",
        text: "Definitely!",
        time: "Friday",
      },
      {
        id: 3,
        sender: "them",
        text: "I'll send you the notes later.",
        time: "Friday",
      },
    ],
  },
];


export default function Chat() {

  const [selectedId, setSelectedId] = useState(1);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");

  const [mobileList, setMobileList] = useState(true);


  const selectedConversation =
    conversations.find(
      (conversation) =>
        conversation.id === selectedId
    ) || conversations[0];


  const filteredConversations =
    conversations.filter((conversation) =>
      conversation.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  /* =========================================================
     SEND MESSAGE
     ---------------------------------------------------------
     Currently frontend only.
     Backend will be connected later.
  ========================================================= */

  const sendMessage = () => {

    if (!message.trim()) return;

    setMessage("");
  };


  return (

    <div className="
      min-h-screen
      bg-[#faf9f6]
      font-button
    ">

      <Navbar />


      <main className="
        pt-24
        max-w-[1500px]
        mx-auto
      ">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            h-[calc(100vh-120px)]
            min-h-[600px]
            bg-white
            border
            border-[hsl(var(--rose-quartz))]
            overflow-hidden
            md:rounded-2xl
            flex
          "
        >


          {/* =================================================
              LEFT — CONVERSATIONS
          ================================================== */}

          <aside
            className={`
              ${
                mobileList
                  ? "flex"
                  : "hidden"
              }

              md:flex

              w-full
              md:w-[310px]
              lg:w-[350px]

              flex-col
              shrink-0

              border-r
              border-[hsl(var(--rose-quartz))]

              bg-white
            `}
          >


            {/* =================================================
                SIDEBAR HEADER
            ================================================== */}

            <div className="
              px-5
              pt-5
              pb-4
            ">

              <div className="
                flex
                items-center
                justify-between
                mb-5
              ">

                <h1 className="
                  text-xl
                  font-semibold
                  text-[hsl(var(--marsala))]
                  font-button
                ">
                  Messages
                </h1>


                <button
                  className="
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <MoreVertical className="w-5 h-5" />

                </button>

              </div>


              {/* Search */}

              <div className="relative">

                <Search className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-[hsl(var(--marsala))]/40
                " />


                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search"
                  className="
                    w-full
                    h-10
                    pl-10
                    pr-4
                    rounded-full
                    border-0
                    outline-none
                    bg-[hsl(var(--rose-quartz))]/15
                    text-[hsl(var(--marsala))]
                    placeholder:text-[hsl(var(--marsala))]/40
                    font-button
                    text-sm
                  "
                />

              </div>

            </div>



            {/* =================================================
                CONVERSATIONS
            ================================================== */}

            <div className="
              flex-1
              overflow-y-auto
              px-2
              pb-5
            ">

              {filteredConversations.map(
                (conversation) => {

                  const active =
                    selectedId ===
                    conversation.id;


                  return (

                    <button
                      key={conversation.id}
                      onClick={() => {

                        setSelectedId(
                          conversation.id
                        );

                        setMobileList(false);

                      }}
                      className={`
                        w-full
                        flex
                        items-center
                        gap-3
                        px-3
                        py-3.5
                        rounded-xl
                        text-left
                        transition-colors

                        ${
                          active
                            ? "bg-[hsl(var(--rose-quartz))]/25"
                            : "hover:bg-[hsl(var(--rose-quartz))]/10"
                        }
                      `}
                    >


                      {/* Avatar */}

                      <div className="
                        relative
                        shrink-0
                      ">

                        <img
                          src={conversation.image}
                          alt={conversation.name}
                          className="
                            w-12
                            h-12
                            rounded-full
                            object-cover
                            border
                            border-[hsl(var(--rose-quartz))]
                          "
                        />


                        {conversation.online && (

                          <span className="
                            absolute
                            right-0
                            bottom-0
                            w-3
                            h-3
                            rounded-full
                            bg-green-500
                            border-2
                            border-white
                          " />

                        )}

                      </div>



                      {/* Text */}

                      <div className="
                        flex-1
                        min-w-0
                      ">

                        <div className="
                          flex
                          items-center
                          justify-between
                          gap-2
                        ">

                          <p className="
                            text-sm
                            font-semibold
                            text-[hsl(var(--marsala))]
                            truncate
                            font-button
                          ">

                            {conversation.name}

                          </p>


                          <span className="
                            text-[10px]
                            text-[hsl(var(--marsala))]/35
                            shrink-0
                            font-button
                          ">

                            {conversation.time}

                          </span>

                        </div>


                        <div className="
                          flex
                          items-center
                          gap-2
                          mt-1
                        ">

                          <p className="
                            text-xs
                            text-[hsl(var(--marsala))]/50
                            truncate
                            font-button
                          ">

                            {conversation.lastMessage}

                          </p>


                          {conversation.unread > 0 && (

                            <span className="
                              w-5
                              h-5
                              rounded-full
                              bg-[hsl(var(--marsala))]
                              text-white
                              text-[10px]
                              flex
                              items-center
                              justify-center
                              shrink-0
                              font-button
                            ">

                              {conversation.unread}

                            </span>

                          )}

                        </div>

                      </div>

                    </button>

                  );

                }
              )}

            </div>

          </aside>



          {/* =================================================
              RIGHT — CHAT
          ================================================== */}

          <section
            className={`
              ${
                mobileList
                  ? "hidden md:flex"
                  : "flex"
              }

              flex-1
              min-w-0
              flex-col
              bg-white
            `}
          >


            {/* =================================================
                CHAT HEADER
            ================================================== */}

            <header className="
              h-[76px]
              px-4
              sm:px-6
              flex
              items-center
              justify-between
              border-b
              border-[hsl(var(--rose-quartz))]
            ">


              <div className="
                flex
                items-center
                gap-3
              ">


                {/* Mobile back */}

                <button
                  onClick={() =>
                    setMobileList(true)
                  }
                  className="
                    md:hidden
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <ArrowLeft className="w-4 h-4" />

                </button>


                <Link
                  href={`/profile/${selectedConversation.id}`}
                >

                  <img
                    src={selectedConversation.image}
                    alt={selectedConversation.name}
                    className="
                      w-11
                      h-11
                      rounded-full
                      object-cover
                      border
                      border-[hsl(var(--rose-quartz))]
                    "
                  />

                </Link>


                <div>

                  <Link
                    href={`/profile/${selectedConversation.id}`}
                  >

                    <h2 className="
                      text-base
                      font-semibold
                      text-[hsl(var(--marsala))]
                      font-button
                      hover:underline
                    ">

                      {selectedConversation.name}

                    </h2>

                  </Link>


                  <div className="
                    flex
                    items-center
                    gap-1.5
                    mt-0.5
                  ">

                    {selectedConversation.online && (

                      <span className="
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-green-500
                      " />

                    )}


                    <span className="
                      text-xs
                      text-[hsl(var(--marsala))]/45
                      font-button
                    ">

                      {selectedConversation.online
                        ? "Active now"
                        : selectedConversation.role}

                    </span>

                  </div>

                </div>

              </div>



              {/* Header actions */}

              <div className="
                flex
                items-center
                gap-1
              ">

                <button
                  className="
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <Phone className="w-5 h-5" />

                </button>


                <button
                  className="
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <Video className="w-5 h-5" />

                </button>


                <button
                  className="
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <Info className="w-5 h-5" />

                </button>

              </div>

            </header>



            {/* =================================================
                SKILL EXCHANGE — SIMPLE TEXT BAR
            ================================================== */}

            <div className="
              px-5
              py-2
              border-b
              border-[hsl(var(--rose-quartz))]
              bg-[hsl(var(--rose-quartz))]/5
            ">

              <p className="
                text-xs
                text-[hsl(var(--marsala))]/50
                font-button
              ">

                Learning:{" "}

                <span className="
                  text-[hsl(var(--marsala))]
                  font-medium
                ">

                  {selectedConversation.learning.join(
                    " · "
                  )}

                </span>


                <span className="
                  mx-2
                  text-[hsl(var(--marsala))]/25
                ">

                  ↔

                </span>


                Teaching:{" "}

                <span className="
                  text-[hsl(var(--cognac))]
                  font-medium
                ">

                  {selectedConversation.teaching.join(
                    " · "
                  )}

                </span>

              </p>

            </div>



            {/* =================================================
                MESSAGE AREA
            ================================================== */}

            <div className="
              flex-1
              overflow-y-auto
              px-4
              sm:px-8
              lg:px-12
              py-6
              space-y-3
            ">


              {/* Date */}

              <div className="
                flex
                justify-center
                py-2
              ">

                <span className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-[hsl(var(--marsala))]/30
                  font-button
                ">

                  Today

                </span>

              </div>


              {selectedConversation.messages.map(
                (msg) => {

                  const mine =
                    msg.sender === "me";


                  return (

                    <div
                      key={msg.id}
                      className={`
                        flex
                        ${
                          mine
                            ? "justify-end"
                            : "justify-start"
                        }
                      `}
                    >

                      <div className="
                        max-w-[78%]
                        sm:max-w-[60%]
                      ">


                        {/* Message bubble */}

                        <div className={`
                          px-4
                          py-2.5

                          ${
                            mine
                              ? `
                                bg-[hsl(var(--marsala))]
                                text-white
                                rounded-2xl
                                rounded-br-md
                              `
                              : `
                                bg-[#eeeeec]
                                text-[hsl(var(--marsala))]
                                rounded-2xl
                                rounded-bl-md
                              `
                          }
                        `}>

                          <p className="
                            text-sm
                            leading-relaxed
                            font-button
                          ">

                            {msg.text}

                          </p>

                        </div>


                        {/* Time */}

                        <div className={`
                          flex
                          items-center
                          gap-1
                          mt-1
                          px-1

                          ${
                            mine
                              ? "justify-end"
                              : "justify-start"
                          }
                        `}>

                          <span className="
                            text-[10px]
                            text-[hsl(var(--marsala))]/30
                            font-button
                          ">

                            {msg.time}

                          </span>


                          {mine && (

                            <CheckCheck className="
                              w-3
                              h-3
                              text-[hsl(var(--cognac))]
                            " />

                          )}

                        </div>

                      </div>

                    </div>

                  );

                }
              )}

            </div>



            {/* =================================================
                SCHEDULE SESSION
            ================================================== */}

            <div className="
              px-5
              sm:px-8
              pb-2
            ">

              <Link
                href={`/meets?with=${selectedConversation.id}`}
              >

                <button className="
                  flex
                  items-center
                  gap-1.5
                  text-xs
                  text-[hsl(var(--cognac))]
                  hover:underline
                  font-button
                ">

                  <Calendar className="
                    w-3.5
                    h-3.5
                  " />

                  Schedule a learning session

                </button>

              </Link>

            </div>



            {/* =================================================
                MESSAGE INPUT
            ================================================== */}

            <div className="
              px-4
              sm:px-6
              py-4
            ">

              <div className="
                min-h-[48px]
                border
                border-[hsl(var(--marsala))]/20
                rounded-full
                px-2
                flex
                items-center
                gap-1
                focus-within:border-[hsl(var(--cognac))]
                transition-colors
              ">


                {/* Emoji */}

                <button
                  className="
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]/55
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <Smile className="w-5 h-5" />

                </button>


                {/* Input */}

                <input
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {

                      e.preventDefault();

                      sendMessage();

                    }

                  }}
                  placeholder="Message..."
                  className="
                    flex-1
                    min-w-0
                    bg-transparent
                    outline-none
                    text-sm
                    text-[hsl(var(--marsala))]
                    placeholder:text-[hsl(var(--marsala))]/40
                    font-button
                  "
                />


                {/* Attach */}

                <button
                  className="
                    hidden
                    sm:flex
                    w-9
                    h-9
                    rounded-full
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]/55
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <Paperclip className="w-5 h-5" />

                </button>


                {/* Image */}

                <button
                  className="
                    hidden
                    sm:flex
                    w-9
                    h-9
                    rounded-full
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]/55
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <ImageIcon className="w-5 h-5" />

                </button>


                {/* Microphone */}

                <button
                  className="
                    hidden
                    md:flex
                    w-9
                    h-9
                    rounded-full
                    items-center
                    justify-center
                    text-[hsl(var(--marsala))]/55
                    hover:bg-[hsl(var(--rose-quartz))]/20
                  "
                >

                  <Mic className="w-5 h-5" />

                </button>


                {/* Send */}

                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--cognac))]
                    text-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                    disabled:opacity-30
                    transition-all
                  "
                >

                  <Send className="w-4 h-4" />

                </button>

              </div>

            </div>

          </section>

        </motion.div>

      </main>

    </div>
  );
}