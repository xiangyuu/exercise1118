import { useState } from 'react'
import './index.scss'
const Grid = ({ x, y, blackIsNext, handleChessClick, winner }) => {

  const [color, setColor] = useState(null)

  function handleClick() {
    if (color) return
    if (winner) return
    blackIsNext.current ? setColor('white') : setColor('black')
    blackIsNext.current = !blackIsNext.current
    handleChessClick(x, y)
  }

  return (
    <div className={'grid'} onClick={handleClick}>
      <div className={`${color==='black'?'black-chess':'white-chess'}`} color={color} />
    </div>
  )
}

export default Grid;
