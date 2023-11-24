export const generateRandom = (length) => {
  return Math.random().toString(36).slice(-length);
};
