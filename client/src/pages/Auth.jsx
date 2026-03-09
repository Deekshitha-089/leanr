import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("login");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLocation("/dashboard");
    }, 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLocation("/profile-setup");
    }, 1500);
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
    <h2 className="font-serif text-4xl md:text-5xl text-[hsl(var(--marsala))] text-center flex items-center justify-center gap-2">

      Ready to

      <span className="relative h-[1.2em] overflow-hidden text-[hsl(var(--cognac))]">

        <span
          className="flex flex-col transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${index * 1.2}em)` }}
        >
          {words.map((word, i) => (
            <span key={i} className="h-[1.2em] flex items-center justify-center">
              {word}
            </span>
          ))}
        </span>

      </span>

      ?

    </h2>
  );
}

  return (
<div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Background image */}
      <img
        src="/login-bg.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover blur-md scale-110 z-0"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--rose-quartz))]/20 via-white/60 to-[hsl(var(--peach))]/20 z-10"></div>

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Auth section */}
<div className="flex-1 flex items-center justify-center p-6 pt-32 relative z-20">
        <motion.div
  initial={{ opacity: 0, y: 35 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55 }}
  className="w-full max-w-md space-y-8"
>

  <RollingWord />

<Card className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl"></Card>

          <Card className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl">

            <CardContent className="p-8">

              {/* Welcome message */}
              <div className="text-center mb-6">

                <h2 className="text-xl font-semibold text-[hsl(var(--marsala))]">
                  {tab === "login"
                    ? "Welcome back, we missed you"
                    : "Hi, welcome"}
                </h2>

                <p className="text-sm text-[hsl(var(--marsala))]/60">
                  {tab === "login"
                    ? "Please enter your details"
                    : "Fill your information below"}
                </p>

              </div>

              <Tabs value={tab} onValueChange={setTab}>

                <TabsList className="grid grid-cols-2 mb-8 bg-[hsl(var(--rose-quartz))]/30 p-1 rounded-full">

                  <TabsTrigger
                    value="login"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[hsl(var(--marsala))]"
                  >
                    Login
                  </TabsTrigger>

                  <TabsTrigger
                    value="signup"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[hsl(var(--marsala))]"
                  >
                    Register
                  </TabsTrigger>

                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">

                  <form onSubmit={handleLogin} className="space-y-5">

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">

                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Remember me
                      </label>

                      <span className="hover:underline cursor-pointer">
                        Forgot password?
                      </span>

                    </div>

                    <Button
                      type="submit"
                      className="w-full rounded-full h-12 bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4 text-gray-500">
                      <hr className="flex-grow border-gray-300" />
                      OR
                      <hr className="flex-grow border-gray-300" />
                    </div>

                    {/* Social login */}
                    <div className="flex gap-4 justify-center">

  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-white hover:shadow-md transition">

    <img
      src="https://i.pinimg.com/1200x/45/20/dd/4520ddfc56208707045c56232e946f7f.jpg"
      alt="Google"
      className="w-5 h-5"
    />

  </button>

  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-white hover:shadow-md transition">

    <img
      src="https://i.pinimg.com/736x/ab/96/4b/ab964bcf79cbc2d86b15a9e2efe05ffa.jpg"
      alt="Facebook"
      className="w-5 h-5"
    />

  </button>

</div>

                    <p className="text-center text-sm mt-4">
                      Don’t have an account?{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => setTab("signup")}
                      >
                        Sign up
                      </span>
                    </p>

                  </form>

                </TabsContent>

                {/* REGISTER */}
                <TabsContent value="signup">

                  <form onSubmit={handleSignup} className="space-y-5">

                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" required />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" required />
                    </div>

                    <div className="space-y-2">
                      <Label>Confirm Password</Label>
                      <Input type="password" required />
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" required />
                      I agree with the Terms & Conditions
                    </label>

                    <Button
                      type="submit"
                      className="w-full rounded-full h-12 bg-[hsl(var(--marsala))] hover:bg-[hsl(var(--cognac))] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Sign Up"}
                    </Button>

                    <div className="flex items-center gap-3 my-4 text-gray-500">
                      <hr className="flex-grow border-gray-300" />
                      OR
                      <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="flex gap-4 justify-center">

  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-white hover:shadow-md transition">

    <img
      src="https://i.pinimg.com/1200x/45/20/dd/4520ddfc56208707045c56232e946f7f.jpg"
      alt="Google"
      className="w-5 h-5"
    />

  </button>

  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-white  hover:shadow-md transition">

    <img
      src="https://i.pinimg.com/736x/ab/96/4b/ab964bcf79cbc2d86b15a9e2efe05ffa.jpg"
      alt="Facebook"
      className="w-5 h-5"
    />

  </button>

</div>
                    <p className="text-center text-sm mt-4">
                      Already have an account?{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => setTab("login")}
                      >
                        Sign in
                      </span>
                    </p>

                  </form>

                </TabsContent>

              </Tabs>

            </CardContent>

          </Card>

        </motion.div>

      </div>

      {/* Footer */}
<div className="relative z-30 backdrop-blur-md border-t border-[hsl(var(--peach))]/30">
        <Footer />
      </div>

    </div>
  );
}