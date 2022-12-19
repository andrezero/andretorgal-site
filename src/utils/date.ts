const NOW = new Date();

export const today = (): string => {
  return NOW.toISOString().slice(0, 10);
};
