import React from "react";
import { motion } from "framer-motion";
const TournmentBg: React.FC = () => {
  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="col-span-8 w-full mx-auto max-w-6xl flex items-center justify-center rounded-3xl mt-4 py-6"
        style={{
          backgroundImage: "url(/img/tournament.png)",
          backgroundSize: "cover",
          height: "auto",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          style={{ x: 10 }}
        >
          <h2 className="text-white text-xl font-bold font-sans lg:text-[64px] animate-bounce">
            Tournament
          </h2>
        </motion.div>
      </motion.div>
      <div className="flex justify-center mt-2">
        <button className="bg-[#52FF86] hover:bg-blue-700 text-[#ffffff]  py-4 px-5 rounded text-3xl font-bold cursor-pointer hover:animate-bounce">
          Create Event
        </button>
      </div>
    </div>
  );
};

export default TournmentBg;
