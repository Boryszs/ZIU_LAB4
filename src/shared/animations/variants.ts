export const TRANSITIONS = {
  FAST: 0.18,
  PAGE: 0.3,
  STAGGER_DELAY: 0.08,
};

export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: TRANSITIONS.PAGE } },
  out: { opacity: 0, y: -10, transition: { duration: TRANSITIONS.PAGE } },
};

export const reducedPageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: TRANSITIONS.PAGE } },
  out: { opacity: 0, transition: { duration: TRANSITIONS.PAGE } },
};

export const listVariants = {
  initial: {},
  in: {
    transition: { staggerChildren: TRANSITIONS.STAGGER_DELAY },
  },
};

export const itemVariants = {
  initial: { opacity: 0, x: -10 },
  in: { opacity: 1, x: 0, transition: { duration: TRANSITIONS.FAST } },
};

export const reducedItemVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: TRANSITIONS.FAST } },
};
