import { create } from "zustand";
import { GameStatus } from "../components/types";
import { useDictionary } from "../hooks/useDictionary";

const useStore = create<StoreContext>((set, get) => {
  return {
    turn: 0,
    correctWord: "",
    currentWord: [],
    squaresComplete: [],
    gameStatus: GameStatus.Playing,
    incrementTurn: () =>
      set(({ turn }) => ({
        turn: turn + 1,
      })),
    updateCurrentWord: (action: Actions, key?: string) => {
      if (action === "add" && key) {
        const arr = get().currentWord;

        arr.push(key);
      }

      if (action === "remove") {
        const arr = get().currentWord;

        arr.pop();
      }
    },
    updateSquaresComplete: (word: string) => {
      get().squaresComplete.push(word);
    },
    setGameStatus: (status: GameStatus) => set(() => ({ gameStatus: status })),
  };
});

type Actions = "add" | "remove";

interface StoreContext {
  turn: number;
  correctWord: string;
  currentWord: Array<string>;
  squaresComplete: Array<string>;
  gameStatus: GameStatus;
  incrementTurn: () => void;
  updateCurrentWord: (actions: Actions, key: string) => void;
  updateSquaresComplete: (word: string) => void;
  setGameStatus: (status: GameStatus) => void;
}

export const useIncrementTurn = () => useStore((state) => state.incrementTurn);
export const useUpdateCurrentWord = () => useStore((state) => state.updateCurrentWord);
export const useUpdateSquaresComplete = () => useStore((state) => state.updateSquaresComplete);
export const useSetGameStatus = () => useStore((state) => state.setGameStatus);
