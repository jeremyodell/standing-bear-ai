import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleOnHover: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
  },
  hover: {
    y: -2,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(59, 130, 246, 0.1)",
    transition: {
      duration: 0.25,
    },
  },
};

export const navBackground: Variants = {
  transparent: {
    backgroundColor: "rgba(10, 10, 10, 0.8)",
    borderBottomColor: "transparent",
  },
  solid: {
    backgroundColor: "rgba(10, 10, 10, 0.95)",
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const heroTextStagger: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const heroItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
