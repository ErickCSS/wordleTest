import Square from "./Square"

interface CurrentProps {
  word: string,
}

export default function SquaresCurrent({word}: CurrentProps) {

  const wordSplit = word.split('')
  return(
    <div className="mainRow">
      {
        // .map to add 1 letter to the squares
        wordSplit.map((letter, i) => (
          <Square key={i} value={letter} status="edit" />
        ))
      }
      {
        // When the user add 1 letter to the squares, this code remove a square empty and add the new letter added by the user
        Array.from(Array(5 - wordSplit.length)).map((letter, i) => (
          <Square key={i} value={""} status="edit" />
        ))
      }

    </div>
  )
}