import { useKeyword } from "../hooks/useKeyword";
import { useEffect, useState } from "react";
import { useDictionary } from "../hooks/useDictionary";
import { GameStatus } from "../components/types";

export function useStateGame() {
  const keyword = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];

  // States for the game =============

  const { update, word, loading, validate } = useDictionary();

  // Event for the Keys =============
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();

    onKeyPressed(key);
  };

  // ==== Function, when the user presses the keys of their keypad ======
  const onKeyPressed = (key: string) => {
    const lengthWord = currentWord.length;

    if (gameStatus !== GameStatus.Playing) {
      return;
    }
    // Event to erase 1 letter
    if (key === "BACKSPACE" && lengthWord > 0) {
      onDelete();
      return;
    }

    // Event to inset the Word
    if (key === "ENTER" && lengthWord === 5 && turn <= 6) {
      onEnter();
      return;
    }

    // Event to not add more letters
    if (lengthWord >= 5) {
      return;
    }

    if (keyword.includes(key)) {
      // add the letters to the state
      onWord(key);
      return;
    }
  };

  const onWord = (key: string) => {
    const newWord = currentWord + key;
    setCurrentWord(newWord);
  };

  const onDelete = () => {
    const newWord = currentWord.slice(0, -1);
    setCurrentWord(newWord);
  };

  const onEnter = () => {
    if (currentWord === correctWord) {
      // User Win the game
      setSquaresComplete([...squaresComplete, currentWord]);
      setGameStatus(GameStatus.Win);
      return;
    }

    if (turn === 6) {
      // User Lose the game
      setSquaresComplete([...squaresComplete, currentWord]);
      setGameStatus(GameStatus.Lose);
      return;
    }

    if (currentWord.length === 5 && !validate(currentWord)) {
      alert("Invalid Word");
    }

    setSquaresComplete([...squaresComplete, currentWord]);
    setTurn(turn + 1);
    setCurrentWord("");
  };

  // Hooks to detect, when the user press a key
  useKeyword("keydown", handleKeyDown);

  // Hook to generate a new word
  useEffect(() => {
    const FIVE_MINUTES = 300_000;
    const interval = setInterval(() => update(), FIVE_MINUTES);

    setCorrectWord(word);

    return () => clearInterval(interval);
  }, [word, update]);

  return {
    onKeyPressed,
  };
}
