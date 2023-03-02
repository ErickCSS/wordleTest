import { useEffect, useState } from "react";
import { useStateGame } from "./useStateGame";
import { GameStatus } from "../components/types";
import { useDictionary } from "./useDictionary";

export function useModal() {
  // Hook to detect the status of the game
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalRules, setModalRules] = useState<boolean>(false);
  const [wins, setWins] = useState<number>(0);
  const [plays, setPlays] = useState<number>(0);
  const { word } = useDictionary();
  const {
    turn,
    gameStatus,
    setTurn,
    setCurrentWord,
    setSquaresComplete,
    setGameStatus,
  } = useStateGame();

  useEffect(() => {
    if (gameStatus === GameStatus.Win) {
      setWins(wins + 1);
      setPlays(plays + 1);
    } else if (gameStatus === GameStatus.Lose || turn === 6) {
      setWins(wins);
      setPlays(plays + 1);
    }
  }, [gameStatus, turn, wins, plays]);

  // Active the modal rules when the user open the page ==============
  useEffect(() => {
    if (modalRules === false) {
      window.onload = () => {
        setModalRules(!modalRules);
      };
    }
  }, [modalRules]);

  useEffect(() => {
    if (gameStatus === GameStatus.Win || gameStatus === GameStatus.Lose) {
      setShowModal(!showModal);
    }
  }, [gameStatus, showModal]);

  useEffect(() => {
    setSquaresComplete([]);
    setTurn(1);
    setCurrentWord("");
    setGameStatus(GameStatus.Playing);
  }, [word, setSquaresComplete, setTurn, setCurrentWord, setGameStatus]);

  return { showModal, modalRules, wins, plays, setShowModal, setModalRules };
}
