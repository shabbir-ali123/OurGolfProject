import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const TournmentBg: React.FC = () => {
  const { t } = useTranslation();
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
        className="flex items-center justify-center w-full max-w-6xl col-span-8 py-6 mx-auto mt-4 rounded-3xl"
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
            {t('TOURNAMENT')}
          </h2>
        </motion.div>
      </motion.div>
      
    </div>
  );
};

export default TournmentBg;
