export const COMMAND_ANIMATION = {
  height: {
    type: "spring" as const,
    stiffness: 400,
    damping: 35,
    mass: 0.8,
  },
};

export const LIST_ANIMATION = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.15 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.2 },
      opacity: { duration: 0.1 },
    },
  },
};

export const ITEM_ANIMATION = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 0.8,
  },
}; 