import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const AnimatedCounter = ({ from = 0, to = 100, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration });
    return controls.stop;
  }, [to]);

  return (
    <motion.span className="text-3xl font-bold text-amber-600">
      {rounded}
    </motion.span>
  );
};

export default AnimatedCounter;
