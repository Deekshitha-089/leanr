import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import TiltedCard from "@/components/ui/TiltedCard";
import LightBeamButton from "@/components/ui/light-beam-button";
import heroImage from "@/assets/hero-illustration.png";
import { useEffect, useState } from "react";


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function RollingWord() {
  const words = ["exchange", "upskill", "develop", "progress"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="font-serif text-[28px] sm:text-4xl md:text-6xl text-[hsl(var(--marsala))] text-center whitespace-nowrap flex items-center justify-center gap-2 sm:gap-3">

  Ready to

  <span className="relative h-[1.2em] overflow-hidden text-[hsl(var(--cognac))]">

    <em><span
      className="flex flex-col transition-transform duration-500 ease-in-out"
      style={{ transform: `translateY(-${index * 1.2}em)` }}
    >
      {words.map((word, i) => (
        <span key={i} className="h-[1.2em] flex items-center justify-center">
          {word}
        </span>
      ))}
    </span></em>

  </span>

  ?

</h2>
  );
}


export default function Landing() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--rose-quartz))]/10 via-white/70 to-[hsl(var(--peach))]/20" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 rounded-full border border-[hsl(var(--marsala))]/10 bg-white/50 backdrop-blur-sm"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-[hsl(var(--marsala))]">
                Beta Access Now Open
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-7xl leading-[1.1] text-[hsl(var(--marsala))]"
            >
              Learn What You Lack. <br />
              <span className="italic text-[hsl(var(--cognac))]">
                Teach What You Know.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-[hsl(var(--marsala))]/70 max-w-lg font-sans leading-relaxed"
            >
              A peer-to-peer skill exchange platform built for students who
              believe everyone has something valuable to offer.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/auth?tab=signup">
  <LightBeamButton
    className="h-12 sm:h-14 w-full sm:w-auto px-6 sm:px-8 rounded-full bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))] text-white text-base sm:text-lg flex items-center justify-center"
  >
    Start Exchanging
  </LightBeamButton>
</Link>

              <Button
                variant="outline"
                className="h-14 px-8 rounded-full border-[hsl(var(--cognac))] text-[hsl(var(--cognac))]"
              >
                How it Works
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center justify-center">
            <TiltedCard
              imageSrc={heroImage}
              altText="Students exchanging knowledge"
              captionText="Leanr Skill Exchange"
              containerHeight="420px"
              containerWidth="420px"
              imageHeight="380px"
              imageWidth="380px"
              rotateAmplitude={14}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="bg-[hsl(var(--marsala))]/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
                  <p className="text-white text-sm font-medium">
                    Learn • Teach • Grow
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section className="py-24 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    
    <div className="text-center mb-16">
      <h2 className="font-display text-4xl md:text-5xl text-[hsl(var(--marsala))] mb-4">
        Mutual <span className="text-[#9A6451]">
          <em>Exchange</em></span>
      </h2>
      <p className="text-[hsl(var(--cognac))] font-sans max-w-2xl mx-auto">
        Build genuine connections through shared knowledge.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {[
        {
          icon: <BookOpen className="w-8 h-8 text-[hsl(var(--marsala))]" />,
          title: "List What You Teach",
          desc: "Share your expertise, from Calculus to coding, cooking to creative writing."
        },
        {
          icon: <Search className="w-8 h-8 text-[hsl(var(--marsala))]" />,
          title: "Find What You Need",
          desc: "Discover peers who can help you master the skills you're looking to learn."
        },
        {
          icon: <Users className="w-8 h-8 text-[hsl(var(--marsala))]" />,
          title: "Grow Together",
          desc: "Connect, schedule a session, and exchange knowledge. Free forever."
        }
      ].map((card, idx) => (

        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="group p-8 rounded-3xl bg-[#faf9f6] hover:bg-[hsl(var(--rose-quartz))]/20 transition-all duration-300 border border-transparent hover:border-[hsl(var(--peach))] hover:-translate-y-1"
        >

          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--rose-quartz))]/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            {card.icon}
          </div>

          <h3 className="font-serif text-2xl text-[hsl(var(--marsala))] mb-3">
            {card.title}
          </h3>

          <p className="text-[hsl(var(--marsala))]/70 leading-relaxed">
            {card.desc}
          </p>

        </motion.div>

      ))}

    </div>

  </div>
</section>

{/* Explore Skills */}
<section className="py-24 px-6 bg-[hsl(var(--rose-quartz))]/10 overflow-hidden">

  <div className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
    <h2 className="font-display text-4xl text-[hsl(var(--marsala))]">
      Explore <span className="text-[#9A6451]"><em>Skills</em></span>
    </h2>

    <Link href="/explore">
      <span className="flex items-center gap-2 text-[hsl(var(--marsala))] hover:text-[hsl(var(--cognac))] cursor-pointer">
        View all categories →
      </span>
    </Link>
  </div>

  <div className="relative">

    {/* fade mask */}
<div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#faf9f6] to-transparent z-10" />
<div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#faf9f6] to-transparent z-10" />
    {/* ROW 1 (left direction) */}
    <div className="flex gap-6 animate-marquee-left whitespace-nowrap mb-6">

      {[ 
        "Design","Development","Languages","Music","Fitness","Cooking",
        "Photography","Marketing","Business","Writing","Math","Science"
      ].map((skill, i) => (

        <div
          key={i}
          className="min-w-[220px] h-[160px] rounded-2xl bg-white flex flex-col items-center justify-center gap-3 shadow-sm border border-[hsl(var(--peach))]/40"
        >
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[hsl(var(--marsala))]" />
          </div>

          <span className="text-[hsl(var(--marsala))] font-medium">
            {skill}
          </span>
        </div>

      ))}

      {/* duplicate for loop */}
      {[ 
        "Design","Development","Languages","Music","Fitness","Cooking",
        "Photography","Marketing","Business","Writing","Math","Science"
      ].map((skill, i) => (

        <div
          key={"dup"+i}
          className="min-w-[220px] h-[160px] rounded-2xl bg-white flex flex-col items-center justify-center gap-3 shadow-sm border border-[hsl(var(--peach))]/40"
        >
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[hsl(var(--marsala))]" />
          </div>

          <span className="text-[hsl(var(--marsala))] font-medium">
            {skill}
          </span>
        </div>

      ))}

    </div>

    {/* ROW 2 (reverse direction) */}
    <div className="flex gap-6 animate-marquee-right whitespace-nowrap">

      {[ 
        "Design","Development","Languages","Music","Fitness","Cooking",
        "Photography","Marketing","Business","Writing","Math","Science"
      ].map((skill, i) => (

        <div
          key={"row2"+i}
          className="min-w-[220px] h-[160px] rounded-2xl bg-white flex flex-col items-center justify-center gap-3 shadow-sm border border-[hsl(var(--peach))]/40"
        >
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[hsl(var(--marsala))]" />
          </div>

          <span className="text-[hsl(var(--marsala))] font-medium">
            {skill}
          </span>
        </div>

      ))}

      {/* duplicate */}
      {[ 
        "Design","Development","Languages","Music","Fitness","Cooking",
        "Photography","Marketing","Business","Writing","Math","Science"
      ].map((skill, i) => (

        <div
          key={"row2dup"+i}
          className="min-w-[220px] h-[160px] rounded-2xl bg-white flex flex-col items-center justify-center gap-3 shadow-sm border border-[hsl(var(--peach))]/40"
        >
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--rose-quartz))]/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[hsl(var(--marsala))]" />
          </div>

          <span className="text-[hsl(var(--marsala))] font-medium">
            {skill}
          </span>
        </div>

      ))}

    </div>

  </div>

</section>


{/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <RollingWord className="font-serif text-5xl md:text-6xl text-[hsl(var(--marsala))]">
            Ready to
          </RollingWord>

          <p className="text-xl text-[hsl(var(--marsala))]/60 max-w-2xl mx-auto">
            Join thousands of students who are democratizing education, one
            conversation at a time.
          </p>

          <Link href="/auth?tab=signup">
            <LightBeamButton className="h-16 px-6 rounded-full bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--marsala))] text-white text-xl font-display">
                  Join the Community
            </LightBeamButton>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}