import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Calendar,
  Check,
  CheckCheck,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

/* =========================================================
   DEFAULT NOTIFICATIONS
========================================================= */

const defaultNotifications = [
  {
    id: 1,
    type: "match",
    title: "New AI Match",
    message:
      "Sarah Chen wants to learn Python from you.",
    time: "10 min ago",
    date: "today",
    read: false,
    link: "/ai-matches",
  },

  {
    id: 2,
    type: "session",
    title: "Session reminder",
    message:
      "Your UI Design session with Alex starts today at 4:00 PM.",
    time: "1 hour ago",
    date: "today",
    read: false,
    link: "/meets",
  },

  {
    id: 3,
    type: "message",
    title: "New message",
    message:
      "Alex Rivera sent you a message.",
    time: "2 hours ago",
    date: "today",
    read: false,
    link: "/chat",
  },

  {
    id: 4,
    type: "learning",
    title: "Session completed",
    message:
      "You completed Python — Session 2.",
    time: "Yesterday",
    date: "earlier",
    read: true,
    link: "/learning",
  },

  {
    id: 5,
    type: "match",
    title: "Someone matched your skill",
    message:
      "James Wilson is interested in learning React.",
    time: "Yesterday",
    date: "earlier",
    read: true,
    link: "/ai-matches",
  },

  {
    id: 6,
    type: "session",
    title: "Session scheduled",
    message:
      "Your Python session with Sarah is scheduled for Saturday.",
    time: "2 days ago",
    date: "earlier",
    read: true,
    link: "/meets",
  },
];

/* =========================================================
   ICON
========================================================= */

function NotificationIcon({
  type,
}) {
  const icons = {
    match: Sparkles,
    session: Calendar,
    message: MessageCircle,
    learning: Check,
    profile: UserRound,
  };

  const Icon =
    icons[type] || Bell;

  return (
    <div className="w-11 h-11 shrink-0 rounded-full bg-[hsl(var(--rose-quartz))]/20 flex items-center justify-center">
      <Icon className="w-4 h-4 text-[hsl(var(--marsala))]" />
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [activeFilter, setActiveFilter] =
    useState("All");

  /* -------------------------------------------------------
     LOAD
  ------------------------------------------------------- */

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "leanr_notifications"
      );

    if (saved) {
      try {
        setNotifications(
          JSON.parse(saved)
        );
      } catch {
        setNotifications(
          defaultNotifications
        );
      }
    } else {
      setNotifications(
        defaultNotifications
      );
    }
  }, []);

  /* -------------------------------------------------------
     SAVE
  ------------------------------------------------------- */

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem(
        "leanr_notifications",
        JSON.stringify(
          notifications
        )
      );
    }
  }, [notifications]);

  /* -------------------------------------------------------
     UNREAD
  ------------------------------------------------------- */

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  /* -------------------------------------------------------
     FILTER
  ------------------------------------------------------- */

  const filteredNotifications =
    notifications.filter(
      (notification) => {
        if (
          activeFilter ===
          "Unread"
        ) {
          return !notification.read;
        }

        return true;
      }
    );

  const todayNotifications =
    filteredNotifications.filter(
      (notification) =>
        notification.date ===
        "today"
    );

  const earlierNotifications =
    filteredNotifications.filter(
      (notification) =>
        notification.date ===
        "earlier"
    );

  /* -------------------------------------------------------
     MARK READ
  ------------------------------------------------------- */

  const markAsRead = (
    id
  ) => {
    setNotifications(
      (current) =>
        current.map(
          (notification) =>
            notification.id ===
            id
              ? {
                  ...notification,
                  read: true,
                }
              : notification
        )
    );
  };

  /* -------------------------------------------------------
     MARK ALL READ
  ------------------------------------------------------- */

  const markAllAsRead = () => {
    setNotifications(
      (current) =>
        current.map(
          (notification) => ({
            ...notification,
            read: true,
          })
        )
    );
  };

  /* -------------------------------------------------------
     DELETE
  ------------------------------------------------------- */

  const deleteNotification = (
    id
  ) => {
    setNotifications(
      (current) =>
        current.filter(
          (notification) =>
            notification.id !==
            id
        )
    );
  };

  /* -------------------------------------------------------
     CLEAR ALL
  ------------------------------------------------------- */

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem(
      "leanr_notifications"
    );
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[hsl(var(--marsala))]">

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <div>

            <div className="flex items-center gap-2">

              <Bell className="w-4 h-4 text-[hsl(var(--cognac))]" />

              <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
                Stay updated
              </p>

            </div>

            <h1 className="font-serif text-5xl mt-2">
              Notifications
            </h1>

            <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-3">
              Important updates from your learning
              journey.
            </p>

          </div>


          {/* ACTIONS */}

          <div className="flex items-center gap-3">

            {unreadCount > 0 && (
              <button
                onClick={
                  markAllAsRead
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[hsl(var(--rose-quartz))]/50 font-button text-xs hover:bg-white transition"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </button>
            )}

            {notifications.length >
              0 && (
              <button
                onClick={
                  clearAll
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[hsl(var(--rose-quartz))]/50 font-button text-xs text-red-400 hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            )}

          </div>

        </div>


        {/* =================================================
            FILTER
        ================================================= */}

        <div className="flex items-center gap-2 mt-9 border-b border-[hsl(var(--rose-quartz))]/40 pb-3">

          {[
            "All",
            "Unread",
          ].map(
            (filter) => (

              <button
                key={
                  filter
                }
                onClick={() =>
                  setActiveFilter(
                    filter
                  )
                }
                className={`px-5 py-2 rounded-full font-button text-xs transition ${
                  activeFilter ===
                  filter
                    ? "bg-[hsl(var(--marsala))] text-white"
                    : "text-[hsl(var(--marsala))]/55 hover:bg-[hsl(var(--rose-quartz))]/10"
                }`}
              >
                {filter}

                {filter ===
                  "Unread" &&
                  unreadCount >
                    0 && (
                    <span className="ml-2">
                      {unreadCount}
                    </span>
                  )}

              </button>

            )
          )}

        </div>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        {filteredNotifications.length ===
        0 ? (

          <EmptyNotifications />

        ) : (

          <div className="mt-5">

            {/* TODAY */}

            {todayNotifications.length >
              0 && (

              <NotificationGroup
                title="Today"
                notifications={
                  todayNotifications
                }
                onRead={
                  markAsRead
                }
                onDelete={
                  deleteNotification
                }
              />

            )}


            {/* EARLIER */}

            {earlierNotifications.length >
              0 && (

              <NotificationGroup
                title="Earlier"
                notifications={
                  earlierNotifications
                }
                onRead={
                  markAsRead
                }
                onDelete={
                  deleteNotification
                }
              />

            )}

          </div>

        )}

      </main>

    </div>
  );
}

/* =========================================================
   GROUP
========================================================= */

function NotificationGroup({
  title,
  notifications,
  onRead,
  onDelete,
}) {
  return (
    <section className="mb-10">

      <h2 className="font-serif text-2xl mb-3">
        {title}
      </h2>


      <div className="divide-y divide-[hsl(var(--rose-quartz))]/35">

        <AnimatePresence>
          {notifications.map(
            (
              notification
            ) => (

              <motion.div
                key={
                  notification.id
                }
                layout
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
                  height: 0,
                }}
                className={`group flex items-center gap-4 py-5 ${
                  !notification.read
                    ? "bg-[hsl(var(--rose-quartz))]/5"
                    : ""
                }`}
              >

                {/* ICON */}

                <NotificationIcon
                  type={
                    notification.type
                  }
                />


                {/* CONTENT */}

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2">

                    <h3 className="font-button text-sm font-semibold">
                      {
                        notification.title
                      }
                    </h3>

                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-[hsl(var(--cognac))]" />
                    )}

                  </div>


                  <p className="font-button text-sm text-[hsl(var(--marsala))]/55 mt-1">
                    {
                      notification.message
                    }
                  </p>


                  <p className="font-button text-[10px] text-[hsl(var(--marsala))]/35 mt-2">
                    {
                      notification.time
                    }
                  </p>

                </div>


                {/* ACTION */}

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">

                  {!notification.read && (
                    <button
                      onClick={() =>
                        onRead(
                          notification.id
                        )
                      }
                      title="Mark as read"
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/15"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}


                  <button
                    onClick={() =>
                      onDelete(
                        notification.id
                      )
                    }
                    title="Delete"
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-50 text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>

                </div>


                {/* NAVIGATION */}

                <Link
                  href={
                    notification.link
                  }
                >
                  <a
                    onClick={() =>
                      onRead(
                        notification.id
                      )
                    }
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[hsl(var(--rose-quartz))]/15"
                  >
                    <ChevronRight className="w-4 h-4 text-[hsl(var(--marsala))]/40" />
                  </a>
                </Link>

              </motion.div>

            )
          )}
        </AnimatePresence>

      </div>

    </section>
  );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyNotifications() {
  return (
    <div className="text-center py-24">

      <div className="w-16 h-16 rounded-full bg-[hsl(var(--rose-quartz))]/20 flex items-center justify-center mx-auto">

        <Bell className="w-6 h-6 text-[hsl(var(--marsala))]/35" />

      </div>

      <h2 className="font-serif text-3xl mt-6">
        You're all caught up
      </h2>

      <p className="font-button text-sm text-[hsl(var(--marsala))]/45 mt-2">
        No new notifications right now.
      </p>

    </div>
  );
}