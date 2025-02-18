import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import GetRoomInfo from "../components/getInfo/GetRoomInfo";
import GetUserInfo from "../components/getInfo/GetUserinfo";

function Room() {
  const location = useLocation();
  const [path, setPath] = React.useState<"create" | "join" | "">("");
  // Room id
  const roomIdInput = React.useRef(null);
  // Room password
  const passwordInput = React.useRef(null);

  // Get user name
  const [userNameState, setUserNameState] = React.useState<{
    acceptName: boolean;
    userName: React.RefObject<HTMLInputElement | null>;
  }>({ acceptName: false, userName: React.useRef(null) });

  // Contains the room info entered by the user
  const [roomInfo, setRoomInfo] = useState<{
    roomId: string;
    roomPassword: string;
  }>({
    roomId: "",
    roomPassword: "",
  });

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

  // Submits the form
  const handleSubmit = (e: React.FormEvent, params: "getName" | "submit") => {
    e.preventDefault();
    if (params === "getName" && roomIdInput.current && passwordInput.current) {
      setRoomInfo({
        roomId: (roomIdInput.current as HTMLInputElement).value,
        roomPassword: (passwordInput.current as HTMLInputElement).value,
      });
      console.log({
        roomId: (roomIdInput.current as HTMLInputElement).value,
        roomPassword: (passwordInput.current as HTMLInputElement).value,
      });
      setUserNameState({
        ...userNameState,
        acceptName: true,
      });
    } else if (params === "submit" && userNameState.userName.current) {
      console.log({
        ...roomInfo,
        name: (userNameState.userName.current as HTMLInputElement).value,
      });
    }
  };

  return (
    <div className="h-full bg-zinc-900 flex items-center justify-center rounded-lg border border-white/10 p-8 overflow-clip relative shadow-[0px_-1px_20px_2px_#ffffff1c]">
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
          {!userNameState.acceptName
            ? path === "create"
              ? "Create New Room"
              : "Join Existing Room"
            : "Add Name"}
        </h2>

        {!userNameState.acceptName ? (
          <GetRoomInfo
            handleSubmit={handleSubmit}
            passwordInput={passwordInput}
            roomIdInput={roomIdInput}
            key={"room"}
            path={path}
          />
        ) : (
          <GetUserInfo
            handleSubmit={handleSubmit}
            path={path}
            key={"user-info"}
            userNameRef={userNameState.userName}
          />
        )}
      </motion.div>
    </div>
  );
}

export default Room;
