import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Svg from './Svg''
import { motion } from "framer-motion";

const pathVar = {
  hidden: {
    opacity: 0,
    rotate: -180,
    pathLength: 0,
  },
  visible: {
    rotate: 0,
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 3,
      ease: "easeInOut",
    },
  },
};
function Initial() {
  const navigate = useNavigate();
  const [animateH3, setAnimateH3] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      navigate("/landing");
    }, 5000);
  }, [navigate]);

  return (
    <div>
      <div className="bg-blue-700 h-screen flex flex-col justify-center items-center text-center relative">
        <div className="absolute top-0 left-0 m-8">
          <img
            src={require("../../Assets/images/a-logo-for-house-related-web-application.png")}
            alt="hoem icon"
            className="w-[50px] h-[50px]"
          />
        </div>
        <motion.div className="w-[200px] h-[200px]">
          <motion.img
            src={require("../../Assets/images/_7557661c-52c2-4495-b956-3bdcf0956458-removebg-preview.png")}
            alt="home-icon"
            variants={pathVar}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => {
              setAnimateH3(true);
            }}
          />
        </motion.div>
        {animateH3 && (
          <motion.h3
            className="text-white text-4xl font-bold "
            initial={{ x: "-50vw" }}
            animate={{ x: 0 }}
          >
            LivingLink
          </motion.h3>
        )}

        <motion.p
          className="text-white text-xl mt-4"
          initial={{ opacity: -10 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Home Designs & Professionals
        </motion.p>
      </div>
    </div>
  );
}

export default Initial;
