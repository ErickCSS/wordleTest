import { statusSquare } from "./types"
import classNames from "classnames/bind"

const styles = {
  present: 'squarePresent',
  correct: 'squareCorrect',
  incorrect: 'squareIncorrect',
  edit: 'squareEdit',
  empty: 'squareEmpty',
}

const classStatus = classNames.bind(styles);


interface propsSquare{
  value: string,
  status: statusSquare,
}




export default function Square({value, status}:propsSquare) {

  const squareStatus = classStatus({
    present: status === 'present',
    correct: status === 'correct',
    incorrect: status === 'incorrect',
    edit: status === 'edit',
    empty: status === 'empty',
  })

  
  return(
    <div className={squareStatus}>{value}</div>
  )
}