"use client";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface AnimatedMainProps {
  children: ReactNode;
  className?: string;
}

const AnimatedMain: FC<AnimatedMainProps> = ({ children, className }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.main>
  );
};

export default AnimatedMain;
