import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLocation } from "wouter";

export default function ComingSoon() {
  const [, setLocation] = useLocation();

  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background Image */}
        <img
          src="/coming-bg.png"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Light overlay */}
        <div className="absolute inset-0 bg-white/20"></div>

        <div className="relative z-20 flex flex-col min-h-screen">


          {/* Hero Content */}
          <main className="flex-1 flex items-center justify-center px-6">

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto space-y-6"
            >

              <h1 className="font-serif text-5xl md:text-6xl text-[hsl(var(--marsala))]">
                Dashboard Coming Soon
              </h1>

              <p className="font-sans text-lg text-[hsl(var(--marsala))]/70">
                We're building something exciting for Leanr.
              </p>

              <p className="italic text-[hsl(var(--cognac))]">
                Stay tuned 🚀
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">

                <button
                  onClick={() => setLocation("/")}
                  className="px-8 py-3 rounded-full bg-[hsl(var(--marsala))] text-white hover:bg-[hsl(var(--cognac))] transition"
                >
                  Back to Home
                </button>

                <button
                  onClick={() => setLocation("/dashboard")}
                  className="px-8 py-3 rounded-full border border-[hsl(var(--marsala))] text-[hsl(var(--marsala))] hover:bg-[hsl(var(--rose-quartz))]/40 transition"
                >
                  Preview Rough Dashboard
                </button>

              </div>

              <p className="text-xs text-[hsl(var(--marsala))]/60 pt-2">
                Early preview of dashboard features under development
              </p>

            </motion.div>

          </main>

        </div>

      </section>



    </div>
  );
}