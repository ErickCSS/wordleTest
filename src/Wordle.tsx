import { MdAnalytics, MdOutlineHelp } from "react-icons/md";
import { useEffect, useState } from "react";
import SquaresComplete from "./components/SquaresComplete";
import SquaresCurrent from "./components/SquaresCurrent";
import SquaresEmpty from "./components/SquaresEmpty";
import { GameStatus } from "./components/types";
import { useKeyword } from "./hooks/useKeyword";
import Qwerty from "./components/Qwerty";
import { useDictionary } from "./hooks/useDictionary";
import { Counter } from "./components/Counter";

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

export default function Wordle() {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.classList.add("dark");
    } else {
      setTheme("light");
      document.body.classList.remove("dark");
    }
  };

  // States for the game =============
  const [correctWord, setCorrectWord] = useState<string>("");
  const [turn, setTurn] = useState<number>(1);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [squaresComplete, setSquaresComplete] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);

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

  const onWord = (letter: string) => {
    const newWord = currentWord + letter;
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
  }, [word]);

  // Hook to detect the status of the game
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalRules, setModalRules] = useState<boolean>(false);
  const [wins, setWins] = useState<number>(0);
  const [plays, setPlays] = useState<number>(0);

  useEffect(() => {
    if (gameStatus === GameStatus.Win) {
      setWins(wins + 1);
      setPlays(plays + 1);
    } else if (gameStatus === GameStatus.Lose || turn === 6) {
      setWins(wins);
      setPlays(plays + 1);
    }
  }, [gameStatus, turn]);

  // Active the modal rules when the user open the page ==============
  useEffect(() => {
    if (modalRules === false) {
      window.onload = () => {
        setModalRules(!modalRules);
      };
    }
  });

  useEffect(() => {
    if (gameStatus === GameStatus.Win || gameStatus === GameStatus.Lose) {
      setShowModal(!showModal);
    }
  }, [gameStatus]);

  useEffect(() => {
    setSquaresComplete([]);
    setTurn(1);
    setCurrentWord("");
    setGameStatus(GameStatus.Playing);
  }, [word]);

  return (
    <>
      <div className="mainWordle">
        {/* Header */}
        <div className="header">
          <div className="rowHeader">
            <div className="colHeader">
              <button onClick={() => setModalRules(!modalRules)}>
                <MdOutlineHelp className="help" />
              </button>
            </div>
            <div className="colHeader">
              <h1 className="title">Wordle</h1>
            </div>
            <div className="colHeader">
              <div className="rowCol">
                <button onClick={() => setShowModal(!showModal)}>
                  <MdAnalytics className="analytics" />
                </button>
                <input
                  type="checkbox"
                  className="toggleButton"
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
              </div>
            </div>
          </div>
        </div>
        {/*  =========== End Header ========== */}

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
          <div className="modal">
            <>
              <h2 className="titleModal">Estadísticas</h2>
              <div className="rowModal">
                <div className="colModal">
                  <div className="statistic">
                    <>
                      <span>{plays}</span>
                      <h6 className="playsGame">Jugadas</h6>
                    </>
                  </div>
                </div>
                <div className="colModal">
                  <div className="statistic">
                    <>
                      <span>{wins}</span>
                      <h6 className="playsGame">Ganadas</h6>
                    </>
                  </div>
                </div>
              </div>
              <div className="timerWord">
                <h5>Siguiente Palabra en</h5>
                <Counter />
              </div>
              <button
                className="buttonModal"
                onClick={() => setShowModal(!showModal)}
              >
                Aceptar
              </button>
            </>
          </div>
        </div>
        {/*  ================ End the Statistics Modal =========== */}

        {/*  ================ This is the Rules Modal =========== */}
        <div
          className={
            modalRules ? "containerModal show" : "containerModal hide rules"
          }
        >
          <div className="modal">
            <h2 className="titleModal">Como Jugar</h2>
            <div className="infoRules">
              <p>Adivina la palabra oculta en cinco intentos.</p>
              <p>Cada intento debe ser una palabra válida de 5 letras.</p>
              <p>
                {" "}
                Después de cada intento el color de las letras cambia para
                mostrar qué tan cerca estás de acertar la palabra.
              </p>
            </div>
            <h5 className="subTitleModal">Ejemplos</h5>
            <div className="gridSquare">
              <div className="square correct">G</div>
              <div className="square">A</div>
              <div className="square">T</div>
              <div className="square">O</div>
              <div className="square">S</div>
            </div>
            <div className="infoRules">
              <p>
                La letra <b>G</b> está en la palabra y en la posición correcta.
              </p>
            </div>

            <div className="gridSquare">
              <div className="square">V</div>
              <div className="square">O</div>
              <div className="square present">C</div>
              <div className="square">A</div>
              <div className="square">L</div>
            </div>

            <div className="infoRules">
              <p>
                La letra <b>C</b> está en la palabra pero en la posición
                incorrecta.
              </p>
            </div>

            <div className="gridSquare">
              <div className="square">C</div>
              <div className="square">A</div>
              <div className="square">N</div>
              <div className="square">T</div>
              <div className="square incorrect">O</div>
            </div>

            <div className="infoRules">
              <p>
                La letra <b>O</b> no está en la palabra.
              </p>
            </div>
            <div className="infoRules">
              <p>
                Puede haber letras repetidas. Las pistas son independientes para
                cada letra.
              </p>
            </div>

            <div className="infoFinal">
              <p>¡Una palabra nueva cada 5 minutos!</p>
            </div>
            <button
              className="buttonModal"
              onClick={() => setModalRules(!modalRules)}
            >
              ¡A Jugar!
            </button>
          </div>
        </div>
        {/*  ================ End the Rules Modal =========== */}
      </div>
    </>
  );
}
