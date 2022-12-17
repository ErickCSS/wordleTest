import Square from "./Square"
import { statusSquare } from "./types"

interface SquareCompleteProps {
  word: string,
  wordCorrect: string,
}

export default function SquaresComplete({word, wordCorrect}: SquareCompleteProps) {

  // function to check letter by letter
  const checkLetter = (letter: string, position: number): statusSquare => {
    if (wordCorrect.includes(letter)) {
      if (wordCorrect[position] === letter) {
        return 'correct'
      }
      else{
        return 'present'
      }
    }
    else{
      return "incorrect"
    }

  }

  return(
    <div className="mainRow">
      {
        // Set an arrangement of 5 Array, to display the squares
        Array.from(Array(5)).map((_, i) => (
          <Square key={i} value={word[i]} status={checkLetter(word[i], i)} />
        ))
      }
    </div>
  )
}