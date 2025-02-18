import Text from "../components/text/Text";
import Button from "../components/button/Button";
import { motion } from "motion/react";
import { Link } from "react-router";
function StartPage() {
  return (
    <div className="h-full  bg-zinc-900 rounded-lg border border-white/10 p-8 flex flex-col items-center justify-center gap-6 relative overflow-clip shadow-[0px_-1px_20px_2px_#ffffff1c]">
      {/* Enhanced Light Beams */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(8)].map((_, i) => {
          const direction = Math.random() > 0.5 ? "x" : "y"; // Randomize direction
          const start =
            direction === "x"
              ? {
                  x: Math.random() > 0.5 ? "-100%" : "100%",
                  y: `${Math.random() * 100}%`,
                }
              : {
                  y: Math.random() > 0.5 ? "-100%" : "100%",
                  x: `${Math.random() * 100}%`,
                };

          const beamLength = Math.random() * 100 + 100; // Randomize beam length
          const duration = 6 + Math.random() * 2; // Randomize duration for variety

          return (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-[linear-gradient(to_right,theme(colors.slate.50),transparent)]"
              style={{
                width: `${beamLength}px`,
                top:
                  direction === "x"
                    ? start.y
                    : start.y === "-100%"
                    ? 0
                    : "100%",
                left:
                  direction === "y"
                    ? start.x
                    : start.x === "-100%"
                    ? 0
                    : "100%",
                transformOrigin: "left center",
                rotate: direction === "y" ? "90deg" : "0deg",
              }}
              initial={{
                opacity: 0,
                translateX:
                  direction === "x" ? (start.x === "-100%" ? -40 : 40) : 0,
                translateY:
                  direction === "y" ? (start.y === "-100%" ? -40 : 40) : 0,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                translateX:
                  direction === "x"
                    ? start.x === "-100%"
                      ? "66%"
                      : "-66%"
                    : 0,
                translateY:
                  direction === "y"
                    ? start.y === "-100%"
                      ? "66%"
                      : "-66%"
                    : 0,
              }}
              transition={{
                duration: duration,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-slate-50/50" />
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full flex flex-col items-center justify-center gap-2 relative overflow-trim"
      >
        <Text
          textContent="Clarify"
          className="text-3xl font-bold text-slate-50 z-10 "
        />
        <Text
          textContent="Break Language Barriers, Connect Globally"
          className="text-lg text-center max-w-md opacity-80 text-slate-300 z-10"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md z-10">
          <Link
            to={"/create-room/join"}
            className="w-full py-3 px-6 border border-slate-50/30 hover:border-slate-50/50 bg-transparent hover:bg-slate-50/10 font-semibold rounded-lg transition-all text-base text-slate-50 text-center"
          >
            <Button>Join Existing Room</Button>
          </Link>
          <Link
            to={"/create-room/create"}
            className="w-full py-3 px-6 bg-emerald-500/90 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-500/50 font-semibold rounded-lg transition-all text-base text-slate-50 text-center"
          >
            <Button>Create New Room</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default StartPage;
