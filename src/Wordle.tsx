import { GameStatus } from "./components/types";
import { useModal } from "./hooks/useModal";
import { useStateGame } from "./hooks/useStateGame";

import SquaresComplete from "./components/SquaresComplete";
import SquaresCurrent from "./components/SquaresCurrent";
import SquaresEmpty from "./components/SquaresEmpty";
import ModalRules from "./components/ModalRules";
import Qwerty from "./components/Qwerty";
import ModalStatistic from "./components/ModalStatistic";
import Header from "./components/Header";

export default function Wordle() {
  const { showModal, modalRules } = useModal();
  const {
    keyword,
    correctWord,
    turn,
    gameStatus,
    squaresComplete,
    currentWord,
    onKeyPressed,
  } = useStateGame();

  return (
    <>
      <div className="mainWordle">
        <Header />
        {/* =========== Boxes Game ============== */}
        {squaresComplete.map((word, i) => (
          <SquaresComplete key={i} word={word} wordCorrect={correctWord} />
        ))}

        {gameStatus === GameStatus.Playing ? (
          <SquaresCurrent word={currentWord} />
        ) : null}

        {Array.from(Array(6 - turn)).map((_, i) => (
          <SquaresEmpty key={i} />
        ))}

        <Qwerty keys={keyword} onKeyPressed={onKeyPressed} />

        {/* =========== Boxes Game ============== */}

        {/*  ================ This is the Statistics Modal =========== */}
        <div
          className={showModal ? "containerModal show" : "containerModal hide"}
        >
          <ModalStatistic />
        </div>
        {/*  ================ End the Statistics Modal =========== */}

        {/*  ================ This is the Rules Modal =========== */}
        <div
          className={
            modalRules ? "containerModal show" : "containerModal hide rules"
          }
        >
          <ModalRules />
        </div>
        {/*  ================ End the Rules Modal =========== */}
      </div>
    </>
  );
}
