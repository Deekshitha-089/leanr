import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  ChevronRight,
  Clock,
  Moon,
  Shield,
  Sun,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   SETTINGS PAGE
========================================================= */

export default function Settings() {
  const [settings, setSettings] = useState({
    sessionDuration: "60",
    learningMode: "Both",
    preferredDays: [
      "Saturday",
      "Sunday",
    ],
    preferredTime: "Evening",

    notifications: {
      sessions: true,
      messages: true,
      matches: true,
      learning: true,
    },

    appearance: "system",
  });

  const [saved, setSaved] =
    useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  /* -------------------------------------------------------
     LOAD SETTINGS
  ------------------------------------------------------- */

  useEffect(() => {
    const stored =
      localStorage.getItem(
        "leanr_settings"
      );

    if (stored) {
      try {
        setSettings(
          JSON.parse(stored)
        );
      } catch {
        // Keep defaults
      }
    }
  }, []);

  /* -------------------------------------------------------
     SAVE
  ------------------------------------------------------- */

  const saveSettings = () => {
    localStorage.setItem(
      "leanr_settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  /* -------------------------------------------------------
     UPDATE NOTIFICATION
  ------------------------------------------------------- */

  const updateNotification = (
    key
  ) => {
    setSettings(
      (current) => ({
        ...current,
        notifications: {
          ...current.notifications,
          [key]:
            !current.notifications[
              key
            ],
        },
      })
    );
  };

  /* -------------------------------------------------------
     DAYS
  ------------------------------------------------------- */

  const toggleDay = (
    day
  ) => {
    setSettings(
      (current) => {
        const exists =
          current.preferredDays.includes(
            day
          );

        return {
          ...current,
          preferredDays:
            exists
              ? current.preferredDays.filter(
                  (item) =>
                    item !== day
                )
              : [
                  ...current.preferredDays,
                  day,
                ],
        };
      }
    );
  };

  /* -------------------------------------------------------
     DELETE
  ------------------------------------------------------- */

  const deleteAccount = () => {
    localStorage.removeItem(
      "leanr_settings"
    );

    localStorage.removeItem(
      "leanr_skills"
    );

    localStorage.removeItem(
      "leanr_notifications"
    );

    localStorage.removeItem(
      "leanr_meet_sessions"
    );

    localStorage.removeItem(
      "leanr_user"
    );

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[hsl(var(--marsala))]">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>

          <p className="font-button text-xs uppercase tracking-wider text-[hsl(var(--marsala))]/40">
            Your preferences
          </p>

          <h1 className="font-serif text-5xl mt-2">
            Settings
          </h1>

          <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-3">
            Make Leanr work the way you learn.
          </p>

        </div>


        {/* =================================================
            ACCOUNT
        ================================================= */}

        <SettingsSection
          icon={UserRound}
          title="Account"
          description="Manage your account preferences."
        >

          <SettingsRow
            title="Profile information"
            description="Your name, bio and profile details."
            action={
              <a
                href="/profile-setup"
                className="inline-flex items-center gap-1 font-button text-xs"
              >
                Edit
                <ChevronRight className="w-3 h-3" />
              </a>
            }
          />

        </SettingsSection>


        {/* =================================================
            LEARNING
        ================================================= */}

        <SettingsSection
          icon={Users}
          title="Learning"
          description="Set your preferred way of learning."
        >

          {/* SESSION DURATION */}

          <div className="py-5 border-b border-[hsl(var(--rose-quartz))]/30">

            <div className="flex items-center gap-3">

              <Clock className="w-4 h-4 text-[hsl(var(--marsala))]/50" />

              <div>

                <p className="font-button text-sm font-semibold">
                  Default session duration
                </p>

                <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
                  Used when creating a new session.
                </p>

              </div>

            </div>


            <div className="flex flex-wrap gap-2 mt-4 ml-7">

              {[
                "30",
                "45",
                "60",
                "90",
                "120",
              ].map(
                (duration) => (

                  <button
                    key={
                      duration
                    }
                    onClick={() =>
                      setSettings(
                        (
                          current
                        ) => ({
                          ...current,
                          sessionDuration:
                            duration,
                        })
                      )
                    }
                    className={`px-4 py-2 rounded-full font-button text-xs transition ${
                      settings.sessionDuration ===
                      duration
                        ? "bg-[hsl(var(--marsala))] text-white"
                        : "border border-[hsl(var(--rose-quartz))]/50 hover:bg-white"
                    }`}
                  >
                    {duration ===
                    "120"
                      ? "2 hours"
                      : `${duration} min`}
                  </button>

                )
              )}

            </div>

          </div>


          {/* LEARNING MODE */}

          <div className="py-5 border-b border-[hsl(var(--rose-quartz))]/30">

            <div className="flex items-center gap-3">

              <Users className="w-4 h-4 text-[hsl(var(--marsala))]/50" />

              <div>

                <p className="font-button text-sm font-semibold">
                  Learning mode
                </p>

                <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
                  Choose what kind of exchanges you prefer.
                </p>

              </div>

            </div>


            <div className="flex flex-wrap gap-2 mt-4 ml-7">

              {[
                "Learning",
                "Teaching",
                "Both",
              ].map(
                (mode) => (

                  <button
                    key={
                      mode
                    }
                    onClick={() =>
                      setSettings(
                        (
                          current
                        ) => ({
                          ...current,
                          learningMode:
                            mode,
                        })
                      )
                    }
                    className={`px-4 py-2 rounded-full font-button text-xs transition ${
                      settings.learningMode ===
                      mode
                        ? "bg-[hsl(var(--marsala))] text-white"
                        : "border border-[hsl(var(--rose-quartz))]/50 hover:bg-white"
                    }`}
                  >
                    {mode}
                  </button>

                )
              )}

            </div>

          </div>


          {/* PREFERRED DAYS */}

          <div className="py-5 border-b border-[hsl(var(--rose-quartz))]/30">

            <p className="font-button text-sm font-semibold">
              Preferred days
            </p>

            <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
              Help us understand when you're available.
            </p>


            <div className="flex flex-wrap gap-2 mt-4">

              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map(
                (day) => {

                  const selected =
                    settings.preferredDays.includes(
                      day
                    );

                  return (
                    <button
                      key={
                        day
                      }
                      onClick={() =>
                        toggleDay(
                          day
                        )
                      }
                      className={`px-3 py-2 rounded-full font-button text-xs transition ${
                        selected
                          ? "bg-[hsl(var(--marsala))] text-white"
                          : "border border-[hsl(var(--rose-quartz))]/50"
                      }`}
                    >
                      {day.slice(
                        0,
                        3
                      )}
                    </button>
                  );
                }
              )}

            </div>

          </div>


          {/* TIME */}

          <div className="py-5">

            <p className="font-button text-sm font-semibold">
              Preferred time
            </p>

            <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
              When do you usually prefer sessions?
            </p>


            <div className="flex flex-wrap gap-2 mt-4">

              {[
                "Morning",
                "Afternoon",
                "Evening",
                "Night",
              ].map(
                (time) => (

                  <button
                    key={
                      time
                    }
                    onClick={() =>
                      setSettings(
                        (
                          current
                        ) => ({
                          ...current,
                          preferredTime:
                            time,
                        })
                      )
                    }
                    className={`px-4 py-2 rounded-full font-button text-xs ${
                      settings.preferredTime ===
                      time
                        ? "bg-[hsl(var(--marsala))] text-white"
                        : "border border-[hsl(var(--rose-quartz))]/50"
                    }`}
                  >
                    {time}
                  </button>

                )
              )}

            </div>

          </div>

        </SettingsSection>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <SettingsSection
          icon={Bell}
          title="Notifications"
          description="Choose what Leanr should notify you about."
        >

          <NotificationSetting
            title="Session reminders"
            description="Get reminded before your learning sessions."
            enabled={
              settings.notifications
                .sessions
            }
            onChange={() =>
              updateNotification(
                "sessions"
              )
            }
          />

          <NotificationSetting
            title="New messages"
            description="Know when someone sends you a message."
            enabled={
              settings.notifications
                .messages
            }
            onChange={() =>
              updateNotification(
                "messages"
              )
            }
          />

          <NotificationSetting
            title="AI matches"
            description="Get notified when Leanr finds a useful match."
            enabled={
              settings.notifications
                .matches
            }
            onChange={() =>
              updateNotification(
                "matches"
              )
            }
          />

          <NotificationSetting
            title="Learning updates"
            description="Receive updates about your courses and progress."
            enabled={
              settings.notifications
                .learning
            }
            onChange={() =>
              updateNotification(
                "learning"
              )
            }
          />

        </SettingsSection>


        {/* =================================================
            APPEARANCE
        ================================================= */}

        <SettingsSection
          icon={Sun}
          title="Appearance"
          description="Choose how Leanr looks for you."
        >

          <div className="py-5">

            <p className="font-button text-sm font-semibold">
              Theme
            </p>

            <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
              Choose your preferred appearance.
            </p>


            <div className="grid grid-cols-3 gap-3 mt-5">

              <ThemeOption
                value="light"
                label="Light"
                icon={Sun}
                selected={
                  settings.appearance ===
                  "light"
                }
                onClick={() =>
                  setSettings(
                    (
                      current
                    ) => ({
                      ...current,
                      appearance:
                        "light",
                    })
                  )
                }
              />

              <ThemeOption
                value="dark"
                label="Dark"
                icon={Moon}
                selected={
                  settings.appearance ===
                  "dark"
                }
                onClick={() =>
                  setSettings(
                    (
                      current
                    ) => ({
                      ...current,
                      appearance:
                        "dark",
                    })
                  )
                }
              />

              <ThemeOption
                value="system"
                label="System"
                icon={SparklesIcon}
                selected={
                  settings.appearance ===
                  "system"
                }
                onClick={() =>
                  setSettings(
                    (
                      current
                    ) => ({
                      ...current,
                      appearance:
                        "system",
                    })
                  )
                }
              />

            </div>

          </div>

        </SettingsSection>


        {/* =================================================
            PRIVACY
        ================================================= */}

        <SettingsSection
          icon={Shield}
          title="Privacy"
          description="Control how your profile is discovered."
        >

          <SettingsRow
            title="Profile visibility"
            description="Your profile is visible to other Leanr users so they can discover your skills."
            action={
              <span className="font-button text-xs px-3 py-1.5 rounded-full bg-[hsl(var(--rose-quartz))]/20">
                Visible
              </span>
            }
          />

        </SettingsSection>


        {/* =================================================
            SAVE
        ================================================= */}

        <div className="flex items-center justify-end gap-4 mt-10">

          {saved && (

            <motion.p
              initial={{
                opacity: 0,
                x: 10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="flex items-center gap-2 font-button text-xs text-[hsl(var(--marsala))]"
            >
              <Check className="w-4 h-4" />
              Settings saved
            </motion.p>

          )}


          <button
            onClick={
              saveSettings
            }
            className="px-7 py-3 rounded-full bg-[hsl(var(--marsala))] text-white font-button text-sm hover:bg-[hsl(var(--cognac))] transition"
          >
            Save Changes
          </button>

        </div>


        {/* =================================================
            DANGER ZONE
        ================================================= */}

        <section className="mt-16 pt-10 border-t border-red-200">

          <p className="font-button text-xs uppercase tracking-wider text-red-400">
            Danger Zone
          </p>

          <h2 className="font-serif text-3xl mt-2">
            Delete account
          </h2>

          <p className="font-button text-sm text-[hsl(var(--marsala))]/45 mt-2 max-w-xl">
            This removes your local Leanr profile,
            skills, sessions and notification data.
            This action cannot be undone.
          </p>


          <button
            onClick={() =>
              setShowDeleteConfirm(
                true
              )
            }
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-200 text-red-500 font-button text-xs hover:bg-red-50 transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>

        </section>

      </main>


      {/* =================================================
          DELETE CONFIRMATION
      ================================================= */}

      {showDeleteConfirm && (

        <DeleteModal
          close={() =>
            setShowDeleteConfirm(
              false
            )
          }
          confirm={
            deleteAccount
          }
        />

      )}

    </div>
  );
}


/* =========================================================
   SETTINGS SECTION
========================================================= */

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="mt-12">

      <div className="flex items-start gap-4 mb-4">

        <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/20 flex items-center justify-center shrink-0">

          <Icon className="w-4 h-4" />

        </div>

        <div>

          <h2 className="font-serif text-2xl">
            {title}
          </h2>

          <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
            {description}
          </p>

        </div>

      </div>


      <div className="bg-white rounded-[1.5rem] border border-[hsl(var(--rose-quartz))]/40 px-5 divide-y divide-[hsl(var(--rose-quartz))]/30">

        {children}

      </div>

    </section>
  );
}


/* =========================================================
   SETTINGS ROW
========================================================= */

function SettingsRow({
  title,
  description,
  action,
}) {
  return (
    <div className="py-5 flex items-center justify-between gap-6">

      <div>

        <p className="font-button text-sm font-semibold">
          {title}
        </p>

        <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
          {description}
        </p>

      </div>

      {action}

    </div>
  );
}


/* =========================================================
   NOTIFICATION SETTING
========================================================= */

function NotificationSetting({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="py-5 flex items-center justify-between gap-6">

      <div>

        <p className="font-button text-sm font-semibold">
          {title}
        </p>

        <p className="font-button text-xs text-[hsl(var(--marsala))]/40 mt-1">
          {description}
        </p>

      </div>


      <button
        onClick={
          onChange
        }
        className={`relative w-11 h-6 rounded-full transition shrink-0 ${
          enabled
            ? "bg-[hsl(var(--marsala))]"
            : "bg-[hsl(var(--rose-quartz))]"
        }`}
      >

        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}


/* =========================================================
   THEME
========================================================= */

function ThemeOption({
  label,
  icon: Icon,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={
        onClick
      }
      className={`p-4 rounded-2xl border text-left transition ${
        selected
          ? "border-[hsl(var(--marsala))] bg-[hsl(var(--rose-quartz))]/10"
          : "border-[hsl(var(--rose-quartz))]/40 hover:bg-white"
      }`}
    >

      <Icon className="w-4 h-4" />

      <p className="font-button text-xs font-semibold mt-3">
        {label}
      </p>

      {selected && (
        <div className="flex items-center gap-1 mt-2">

          <Check className="w-3 h-3" />

          <span className="font-button text-[10px]">
            Selected
          </span>

        </div>
      )}

    </button>
  );
}


/* =========================================================
   SYSTEM ICON
========================================================= */

function SparklesIcon({
  className,
}) {
  return (
    <span
      className={
        className
      }
    >
      ✦
    </span>
  );
}


/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteModal({
  close,
  confirm,
}) {
  return (
    <div className="fixed inset-0 z-[300] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative w-full max-w-md bg-white rounded-[2rem] p-7 shadow-2xl"
      >

        <button
          onClick={
            close
          }
          className="absolute right-5 top-5 w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-50"
        >
          <X className="w-5 h-5" />
        </button>


        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">

          <Trash2 className="w-5 h-5 text-red-400" />

        </div>


        <h2 className="font-serif text-3xl mt-5">
          Delete your account?
        </h2>

        <p className="font-button text-sm text-[hsl(var(--marsala))]/50 mt-3 leading-6">
          This will remove your Leanr data from
          this browser, including your skills,
          sessions and notifications.
        </p>


        <div className="flex gap-3 mt-7">

          <button
            onClick={
              close
            }
            className="flex-1 py-3 rounded-full border border-[hsl(var(--rose-quartz))]/50 font-button text-sm"
          >
            Cancel
          </button>

          <button
            onClick={
              confirm
            }
            className="flex-1 py-3 rounded-full bg-red-500 text-white font-button text-sm hover:bg-red-600"
          >
            Delete Account
          </button>

        </div>

      </motion.div>

    </div>
  );
}