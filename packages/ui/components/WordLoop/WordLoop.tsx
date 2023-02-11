import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface WordLoopProps {
  words: string[];
}

const variants = {
  enter: (direction) => {
    return {
      y: -20,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      opacity: 0,
    };
  },
};

export const WordLoop = ({ words }: WordLoopProps) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === words.length) {
        next = 0;
      }
      setIndex(next);
    }, 3 * 1000);
  }, [index, setIndex]);

  return (
    <div className="absolute w-full">
      <AnimatePresence>
        <motion.span
          style={{ position: "absolute" }}
          variants={variants}
          key={index}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 200 },
            opacity: { duration: 0.5 },
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
