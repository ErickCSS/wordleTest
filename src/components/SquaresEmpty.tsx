import Square from "./Square";

export default function SquareEmpty() {
  return(
    <div className="mainRow">
      {
        // Set an arrangement of 5 Array, to display the squares empty
        Array.from(Array(5)).map((_, i) => (
          <Square key={i} value="" status="empty" />
        ))
      }
    </div>
  )
}