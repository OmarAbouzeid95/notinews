type MotionSpecs = {
  initial?: { [key: string]: number };
  whileInView?: { [key: string]: number };
  transition?: { [key: string]: number };
  viewport?: { [key: string]: boolean };
};

const defaultSpecs: MotionSpecs = {
  initial: { y: 75, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export const generateMotionSpecs = (modifiedSpecs?: MotionSpecs) => {
  return { ...defaultSpecs, ...modifiedSpecs };
};
