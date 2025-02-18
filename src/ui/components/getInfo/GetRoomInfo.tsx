import { motion } from "motion/react";
import { generateRoomId } from "../../utils";

function GetRoomInfo({
  path,
  handleSubmit,
  roomIdInput,
  passwordInput,
}: GetRoomInfoProps) {
  return (
    <form onSubmit={(e) => handleSubmit(e, "getName")} className="space-y-6">
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
              onClick={() => {
                if (roomIdInput && roomIdInput.current) {
                  (roomIdInput.current as HTMLInputElement).value =
                    generateRoomId();
                }
              }}
              className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              Generate ID
            </motion.button>
          )}
        </div>
        <input
          type="text"
          id="roomId"
          ref={roomIdInput}
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
          ref={passwordInput}
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
        Next
      </motion.button>
    </form>
  );
}

export default GetRoomInfo;
