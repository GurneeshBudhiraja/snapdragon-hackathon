import { motion } from "motion/react";
import { useState } from "react";

export default function GetUserInfo({
  path,
  handleSubmit,
  userNameRef,
}: GetRoomInfoProps) {
  // User Avatar state
  const [avatar, setAvatar] = useState<string>("");
  return (
    <form onSubmit={(e) => handleSubmit(e, "submit")} className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-emerald-500/90 flex items-center justify-center text-2xl font-bold text-zinc-950">
          {avatar}
        </div>
        <input
          type="text"
          id="userName"
          autoFocus={true}
          ref={userNameRef}
          onChange={(e) => {
            if (userNameRef?.current) {
              let tempAvatarString = "";
              e.target.value.split(" ").map((word) => {
                tempAvatarString += word.charAt(0).toUpperCase();
              });
              setAvatar(tempAvatarString);
            }
          }}
          className="flex-1 px-4 py-2 bg-zinc-700 text-slate-50 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="Enter your name"
          required
        />
      </div>

      <motion.button
        type="submit"
        className="w-full py-3 px-6 text-slate-50 font-semibold rounded-lg  transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 bg-emerald-500/90 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-500/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {`${path.slice(0, 1).toUpperCase() + path.substring(1)} Room`}
      </motion.button>
    </form>
  );
}
