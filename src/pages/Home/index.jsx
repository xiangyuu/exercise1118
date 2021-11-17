import {useState} from 'react'
import './index.scss'

const Home = () => {
  const [board, setBoard] = useState({
    squares: Array(19 * 19).fill(null),
    xIsNext: true,
    currentX: null,
    currentY: null
  })
  const block = Array(19 * 19).fill(null)

  const renderSquare = (i) => {
    return <Square value={board.squares[i]} onClick={() => handleClick(i)}/>
  }

  function calculateWinner(squares, x, y) {
    if (x === null || y === null) {
      return null;
    }
    let coordinates = []
    for (let i = 0; i < 19; i++) {
      const start = i * 19
      const end = start + 19
      coordinates.push(squares.slice(start, end))
    }
    const currentPieces = coordinates[y][x]

    function checkLine(currentX, currentY, directionX, directionY) {
      let nextX = currentX
      let nextY = currentY
      let lineLength = 0
      do {
        nextX += directionX
        nextY += directionY
        if (
          nextX >= 0 &&
          nextX < 19 &&
          nextY >= 0 &&
          nextY < 19 &&
          coordinates[nextY][nextX] === currentPieces
        ) {
          lineLength += 1
        } else {
          break
        }
      } while (lineLength)
      return lineLength
    }

    if (
      checkLine(x, y, 1, 0) + checkLine(x, y, -1, 0) >= 4 ||
      checkLine(x, y, 0, 1) + checkLine(x, y, 0, -1) >= 4 ||
      checkLine(x, y, 1, -1) + checkLine(x, y, -1, 1) >= 4 ||
      checkLine(x, y, 1, 1) + checkLine(x, y, -1, -1) >= 4
    ) {
      return currentPieces
    }
    return null
  }

  const handleClick = (i) => {
    const {squares, currentX, currentY} = board
    if (calculateWinner(squares, currentX, currentY) || squares[i]) {
      return
    }
    squares[i] = board.xIsNext ? '黑棋' : '白棋'
    setBoard({
      squares: squares,
      xIsNext: !board.xIsNext,
      currentX: i % 19,
      currentY: Math.floor((i / 19))
    })
  }

  const Square = (props) => {
    return (
      <button className='square' onClick={props.onClick}>
        {props.value && (
          <div className={props.value === '黑棋' ? 'black' : 'white'}></div>
        )}
      </button>
    )
  }

  const winner = calculateWinner(board.squares, board.currentX, board.currentY)
  let status
  if (winner) {
    status = '遊戲結束!! ' + winner + '獲勝'
  } else {
    status = '輪到: ' + (board.xIsNext ? '黑棋' : '白棋')
  }
  return (
    <div className='game-board'>
      <div className='status'>{status}</div>
      <div className='board'>
        <div className='board_block'>
          {block.map((item, index) => (
            <div className='block'>{renderSquare(index)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;
