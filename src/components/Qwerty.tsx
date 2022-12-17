
interface QwertyProps {
  keys: string[],
  onKeyPressed: (key: string) => void;
}

export default function Qwerty({keys, onKeyPressed}: QwertyProps) {

  const handleKeyDown = (event: any) => {
    onKeyPressed(event.target.textContent);
  }
  const handleEnter = (event: any) => {
    onKeyPressed('ENTER');
  }
  const handleDelete = (event: any) => {
    onKeyPressed('BACKSPACE');
  }
  
  return(
    <div>
      <div className="qwertyContainer">
        {
          Array.from(Array(10)).map((_, i) => (
            <button key={i} className='qwertyKey' onClick={handleKeyDown}>
              {keys[i]}
            </button>
          ))
        }
        <div className="emptyKey" />
        {
          Array.from(Array(9)).map((_, i) => (
            <button key={i + 10} className='qwertyKey' onClick={handleKeyDown}>
              {keys[i + 10]}
            </button>
          ))
        }
        <button className="enterKey" onClick={handleEnter}>Enter</button>
        {
          Array.from(Array(7)).map((_, i) => (
            <button key={i + 19} className='qwertyKey' onClick={handleKeyDown}>
              {keys[i + 19]}
            </button>
          ))
        }
        <button className="deleteKey" onClick={handleDelete}>Delete</button>

        </div>
    </div>
  )
}