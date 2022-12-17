const FIVE_MINUTES = 300_000;

export const useLoop = (callback: Function) => {
  setInterval(callback, FIVE_MINUTES);
};
