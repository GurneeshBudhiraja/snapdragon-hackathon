import React, { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

function Room() {
  const location = useLocation();
  const [path, setPath] = React.useState<"create" | "join" | "">("");
  // Room id
  const [roomId, setRoomId] = React.useState("");
  // Room password
  const [password, setPassword] = React.useState("");

  // Generate a room id
  const generateRoomId = () => {
    const vowels = "aeiou";
    const consonants = "bcdfghjklmnpqrstvwxyz";
    const hyphen = "-";

    // Generate a segment
    const generateSegment = () => {
      return (
        consonants[Math.floor(Math.random() * consonants.length)] +
        vowels[Math.floor(Math.random() * vowels.length)] +
        (Math.random() > 0.5 ? hyphen : "")
      );
    };

    // Combine segments to create a readable ID
    let roomId = "";
    while (roomId.length < 8) {
      roomId += generateSegment();
    }

    return roomId;
  };

  // Update path based on URL
  useEffect(() => {
    const [, currentPath] = location.pathname.split("/create-room/");
    if (currentPath === "create" || currentPath === "join") {
      setPath(currentPath);
    } else {
      setPath("");
    }
    console.log(currentPath);
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (path === "create") {
      // Room create logic
      console.log("Creating room:", roomId, password);
    } else if (path === "join") {
      // Room join logic
      console.log("Joining room:", roomId, password);
    }
  };

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center rounded-lg border border-white/10 p-8 overflow-auto relative shadow-[0px_-1px_20px_2px_#ffffff1c]">
      {/* Background Animation */}
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

      {/* Home Icon */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-slate-300 hover:text-slate-50 transition-colors"
      >
        <Home className="w-6 h-6" />
      </Link>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-zinc-800 rounded-lg border border-white/10 p-8 max-w-md w-full shadow-lg relative"
      >
        <h2 className="text-2xl font-bold text-slate-50 mb-6">
          {path === "create" ? "Create New Room" : "Join Existing Room"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="roomId"
                className="text-sm font-medium text-slate-300"
              >
                Room ID {path === "create" && "(Custom or Generated)"}
              </label>
              {path === "create" && (
                <motion.button
                  type="button"
                  onClick={() => setRoomId(generateRoomId())}
                  className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Generate ID
                </motion.button>
              )}
            </div>
            <input
              type="text"
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-700 text-slate-50 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder={
                path === "create"
                  ? "e.g. XA3B8C or leave empty to generate"
                  : "Enter existing Room ID"
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Security Key
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-700 text-slate-50 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Enter security key"
              minLength={6}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 px-6 text-slate-50 font-semibold rounded-lg  transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 bg-emerald-500/90 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-500/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {path === "create" ? "Create Secure Room" : "Join Room"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Room;
