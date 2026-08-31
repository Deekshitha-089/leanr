import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutGrid,
  Search,
  Sparkles,
  MessageCircle,
  Calendar,
  User,
  GraduationCap,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  /* =========================================================
     AUTHENTICATED ROUTES
  ========================================================= */

  const authRoutes = [
    "/dashboard",
    "/explore",
    "/ai-matches",
    "/chat",
    "/meets",
    "/profile",
    "/learning",
    "/skills",
    "/notifications",
    "/settings",
    "/help",
  ];

  const isAuth = authRoutes.some((path) =>
    location.startsWith(path)
  );

  /* =========================================================
     MAIN NAVBAR LINKS
  ========================================================= */

  const mainLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "Explore",
      href: "/explore",
      icon: Search,
    },
    {
      name: "AI Matches",
      href: "/ai-matches",
      icon: Sparkles,
    },
    {
      name: "Chat",
      href: "/chat",
      icon: MessageCircle,
    },
    {
      name: "Meets",
      href: "/meets",
      icon: Calendar,
    },
  ];

  /* =========================================================
     PROFILE DROPDOWN LINKS
  ========================================================= */

  const profileLinks = [
    
    {
      name: "My Learning",
      href: "/learning",
      icon: GraduationCap,
    },
    {
      name: "My Skills",
      href: "/skills",
      icon: LayoutGrid,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: MessageCircle,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  /* =========================================================
     HELP
  ========================================================= */

  const helpLink = {
    name: "Help & Feedback",
    href: "/help",
    icon: HelpCircle,
  };

  /* =========================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================================
     CLOSE DROPDOWN
  ========================================================= */

  const closeDropdown = () => {
    setProfileOpen(false);
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    setProfileOpen(false);

    // Real authentication logout will be connected later.
    window.location.href = "/";
  };

  return (
    <motion.nav
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        px-4
        py-4
        md:px-6
      "
    >
      {/* =====================================================
          NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          glass-panel
          rounded-full
          px-6
          py-3
          flex
          items-center
          relative
          border
          border-white/20
          shadow-sm
          bg-white/80
          backdrop-blur-xl
        "
      >

        {/* ===================================================
            LOGO — LEFT
        ==================================================== */}

        <Link
          href={
            isAuth
              ? "/dashboard"
              : "/"
          }
        >
          <a
            className="
              font-serif
              text-2xl
              font-bold
              tracking-tight
              text-[hsl(var(--marsala))]
              shrink-0
            "
          >
            Leanr.
          </a>
        </Link>


        {/* ===================================================
            MAIN NAVIGATION — CENTERED
        ==================================================== */}

        {isAuth && (
          <div
            className="
              hidden
              lg:flex
              items-center
              justify-center
              gap-7
              absolute
              left-1/2
              -translate-x-1/2
            "
          >
            {mainLinks.map((link) => {
              const Icon = link.icon;

              const isActive =
                location === link.href ||
                location.startsWith(
                  `${link.href}/`
                );

              return (
                <Link
                  key={link.name}
                  href={link.href}
                >
                  <a
                    className={cn(
                      `
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        font-button
                        transition-colors
                        whitespace-nowrap
                      `,
                      isActive
                        ? `
                          text-[hsl(var(--marsala))]
                        `
                        : `
                          text-[hsl(var(--marsala))]/60
                          hover:text-[hsl(var(--cognac))]
                        `
                    )}
                  >
                    <Icon
                      className="
                        w-4
                        h-4
                      "
                    />

                    {link.name}
                  </a>
                </Link>
              );
            })}
          </div>
        )}


        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

        <div
          className="
            flex
            items-center
            gap-3
            ml-auto
          "
        >

          {/* =================================================
              AUTHENTICATED USER
          ================================================== */}

          {isAuth ? (

            <div
              ref={dropdownRef}
              className="
                relative
              "
            >

              {/* =============================================
                  PROFILE AVATAR BUTTON
              ============================================== */}

              <button
                type="button"
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
                aria-label="Open profile menu"
                aria-expanded={
                  profileOpen
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  overflow-hidden
                  border-2
                  border-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:scale-105
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[hsl(var(--rose-quartz))]
                "
              >
                <img
                  src="/mine.jpg"
                  alt="Deekshitha Puppala"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              </button>


              {/* =============================================
                  PROFILE DROPDOWN
              ============================================== */}

              <AnimatePresence>
                {profileOpen && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="
                      absolute
                      right-0
                      top-14
                      w-72
                      bg-white
                      rounded-2xl
                      border
                      border-[hsl(var(--rose-quartz))]/60
                      shadow-xl
                      overflow-hidden
                    "
                  >

                    {/* =======================================
                        PROFILE HEADER
                    ======================================== */}

                    <div
                      className="
                        px-5
                        py-4
                        border-b
                        border-[hsl(var(--rose-quartz))]/60
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <img
                          src="/mine.jpg"
                          alt="Deekshitha Puppala"
                          className="
                            w-11
                            h-11
                            rounded-full
                            object-cover
                            border-2
                            border-[hsl(var(--rose-quartz))]
                          "
                        />

                        <div
                          className="
                            min-w-0
                          "
                        >

                          <p
                            className="
                              text-sm
                              font-semibold
                              text-[hsl(var(--marsala))]
                              font-button
                              truncate
                            "
                          >
                            Deekshitha Puppala
                          </p>

                          <p
                            className="
                              text-xs
                              text-[hsl(var(--marsala))]/50
                              font-button
                              mt-0.5
                            "
                          >
                            AI/ML Student
                          </p>

                        </div>

                      </div>


                      {/* VIEW PROFILE */}

                      <Link href="/profile-setup">

                        <a
                          onClick={
                            closeDropdown
                          }
                          className="
                            mt-3
                            flex
                            items-center
                            justify-between
                            text-xs
                            font-button
                            text-[hsl(var(--cognac))]
                            hover:text-[hsl(var(--marsala))]
                            transition-colors
                          "
                        >

                          <span>
                            View profile
                          </span>

                          <ChevronRight
                            className="
                              w-3.5
                              h-3.5
                            "
                          />

                        </a>

                      </Link>

                    </div>


                    {/* =======================================
                        PROFILE LINKS
                    ======================================== */}

                    <div
                      className="
                        py-2
                      "
                    >

                      {profileLinks.map(
                        (link) => {

                          const Icon =
                            link.icon;

                          const isActive =
                            location ===
                              link.href ||
                            location.startsWith(
                              `${link.href}/`
                            );

                          return (

                            <Link
                              key={link.name}
                              href={link.href}
                            >

                              <a
                                onClick={
                                  closeDropdown
                                }
                                className={cn(
                                  `
                                    flex
                                    items-center
                                    gap-3
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-button
                                    transition-colors
                                  `,
                                  isActive
                                    ? `
                                      text-[hsl(var(--marsala))]
                                      bg-[hsl(var(--rose-quartz))]/15
                                    `
                                    : `
                                      text-[hsl(var(--marsala))]
                                      hover:bg-[hsl(var(--rose-quartz))]/15
                                    `
                                )}
                              >

                                <Icon
                                  className="
                                    w-4
                                    h-4
                                    text-[hsl(var(--marsala))]/55
                                  "
                                />

                                {link.name}

                              </a>

                            </Link>

                          );
                        }
                      )}

                    </div>


                    {/* =======================================
                        HELP + LOGOUT
                    ======================================== */}

                    <div
                      className="
                        border-t
                        border-[hsl(var(--rose-quartz))]/60
                        py-2
                      "
                    >

                      {/* HELP */}

                      <Link
                        href={
                          helpLink.href
                        }
                      >

                        <a
                          onClick={
                            closeDropdown
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            px-5
                            py-2.5
                            text-sm
                            font-button
                            text-[hsl(var(--marsala))]
                            hover:bg-[hsl(var(--rose-quartz))]/15
                            transition-colors
                          "
                        >

                          <HelpCircle
                            className="
                              w-4
                              h-4
                              text-[hsl(var(--marsala))]/55
                            "
                          />

                          Help & Feedback

                        </a>

                      </Link>


                      {/* LOGOUT */}

                      <button
                        type="button"
                        onClick={
                          handleLogout
                        }
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-5
                          py-2.5
                          text-sm
                          font-button
                          text-[hsl(var(--marsala))]
                          hover:bg-red-50
                          hover:text-red-600
                          transition-colors
                          text-left
                        "
                      >

                        <LogOut
                          className="
                            w-4
                            h-4
                          "
                        />

                        Log out

                      </button>

                    </div>

                  </motion.div>

                )}
              </AnimatePresence>

            </div>

          ) : (

            /* =================================================
               LOGGED-OUT NAVBAR
            ================================================== */

            <>

              <Link href="/auth">

                <Button
                  variant="ghost"
                  className="
                    hidden
                    md:inline-flex
                    font-button
                    text-[hsl(var(--marsala))]
                    hover:text-[hsl(var(--cognac))]
                    hover:bg-[hsl(var(--rose-quartz))]/30
                  "
                >
                  Log in
                </Button>

              </Link>


              <Link
                href="/auth?tab=signup"
              >

                <Button
                  className="
                    rounded-full
                    bg-[hsl(var(--marsala))]
                    hover:bg-[hsl(var(--cognac))]
                    text-white
                    font-button
                    px-6
                    transition-all
                    duration-300
                    hover:scale-105
                    shadow-md
                  "
                >
                  Get Started
                </Button>

              </Link>

            </>

          )}

        </div>

      </div>
    </motion.nav>
  );
}