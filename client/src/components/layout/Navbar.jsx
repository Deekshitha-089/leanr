import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LayoutGrid, MessageCircle, Calendar, User } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const isAuth = ["/dashboard", "/chat", "/meets", "/profile-setup"].some(
    (path) => location.startsWith(path)
  );

  const authLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { name: "Chat", href: "/chat", icon: MessageCircle },
    { name: "Meets", href: "/meets", icon: Calendar },
  ];

  const linksToRender = isAuth ? authLinks : [];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between border border-white/20 shadow-sm bg-white/80 backdrop-blur-xl">
        
        {/* Logo */}
        <Link href={isAuth ? "/dashboard" : "/"}>
          <a className="font-serif text-2xl font-bold tracking-tight text-[hsl(var(--marsala))]">
            Leanr.
          </a>
        </Link>

        {/* Auth Navigation (Desktop) */}
        {linksToRender.length > 0 && (
          <div className="hidden md:flex items-center gap-8">
            {linksToRender.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[hsl(var(--cognac))] flex items-center gap-2",
                    location === link.href
                      ? "text-[hsl(var(--marsala))]"
                      : "text-[hsl(var(--marsala))]/60"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        )}

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          {isAuth ? (
            <Link href="/profile-setup">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-[hsl(var(--rose-quartz))]/20 text-[hsl(var(--marsala))]"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth">
                <Button
                  variant="ghost"
                  className="hidden md:inline-flex text-[hsl(var(--marsala))] hover:text-[hsl(var(--cognac))] hover:bg-[hsl(var(--rose-quartz))]/30 font-button"
                >
                  Log in
                </Button>
              </Link>

              <Link href="/auth?tab=signup">
                <Button className="rounded-full bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))] text-white font-button px-6 transition-all duration-300 hover:scale-105 shadow-md">
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