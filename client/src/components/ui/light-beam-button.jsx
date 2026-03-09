import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function LightBeamButton({
  children,
  className,
  gradientColors = ["#8B3A2E", "#E3A38F", "#8B3A2E"], // Marsala themed
  ...props
}) {

  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  };

  const gradientString = `conic-gradient(
    from var(--gradient-angle),
    transparent 0%,
    ${gradientColors[0]} 40%,
    ${gradientColors[1]} 50%,
    transparent 60%,
    transparent 100%
  )`;

  return (
    <>
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-spin {
          from { --gradient-angle: 0deg; }
          to { --gradient-angle: 360deg; }
        }

        .animate-border-spin {
          animation: border-spin 3s linear infinite;
        }

        @keyframes slideUpBlur {
          0% {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(8px);
          }
          100% {
            opacity: 4;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .animate-slideUp {
          animation: slideUpBlur 0.8s ease forwards;
        }
      `}</style>

      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "group relative isolate overflow-hidden rounded-full",
          "px-10 py-4 text-lg font-semibold",
          "bg-[hsl(var(--marsala))] text-white",
          "transition-all duration-300",
          "animate-slideUp",
          className
        )}
        {...props}
      >

        {/* rotating beam border */}
        <div
          className="absolute inset-0 -z-10 rounded-full p-[2px] animate-border-spin"
          style={{
            "--gradient-angle": "0deg",
            background: gradientString
          }}
        />

        {/* inner background */}
        <div className="absolute inset-[2px] -z-10 rounded-full bg-[hsl(var(--marsala))]" />

        {/* mouse glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background:
              "radial-gradient(120px circle at var(--x) var(--y), rgba(250,179,170,0.25), transparent 50%)"
          }}
        />

        {/* content */}
        <span className="relative z-10 flex items-center gap-2">

          {children}

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />

        </span>

        {/* underline */}
        <span
          className="
          absolute bottom-0 left-1/2 h-[2px] w-0
          bg-peach transition-all duration-300
          group-hover:w-full group-hover:left-0
          "
        />

      </motion.button>
    </>
  );
}