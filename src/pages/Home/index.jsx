import {useState, useRef, useEffect} from 'react'
import './index.scss'
import Grid from '../../components/Grid'
const Home = () => {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)))
  const [winner, setWinner] = useState(null)
  const blackIsNext = useRef(false)
  const currentX = useRef()
  const currentY = useRef()

  function handleChessClick(x, y) {
    currentX.current = x
    currentY.current = y
    changeBoard()
  }

  function changeBoard() {
    setBoard(board => {
      return board.map((row, y) => {
        if (y !== currentY.current) return row
        return row.map((col, x) => {
          if (x !== currentX.current) return col
          return x = blackIsNext.current ? 'black' : 'white'
        })
      })
    })
  }

  useEffect(() => {
    if (!currentX.current && !currentY.current) return
    calculateWinner(board, currentX.current, currentY.current)

    function calculateWinner(board, x, y) {
      if (
        countChess(board, x, y, -1, 0) + countChess(board, x, y, 1, 0) >= 4 ||
        countChess(board, x, y, 0, -1) + countChess(board, x, y, 0, 1) >= 4 ||
        countChess(board, x, y, 1, 1) + countChess(board, x, y, -1, -1) >= 4 ||
        countChess(board, x, y, -1, 1) + countChess(board, x, y, 1, -1) >= 4
      ) {
        return setWinner(board[y][x])
      }
    }
  }, [board])

  function countChess(board, x, y, directionX, directionY) {
    let totalChess = 0
    let findX = x + directionX
    let findY = y + directionY

    while (board[findY] && board[findY][findX] === board[y][x]) {
      findX = findX + directionX
      findY = findY + directionY
      totalChess++
    }
    return totalChess
  }

  function handleRestartClick() {
    window.location.reload()
  }

  return (
    <>
      <div className={'board-wrapper'}>
        <div className={'PlayerStatus'}>
          {
            (winner && <div className={'status-desc'}>獲勝方 : {winner}</div>) ||
            (!winner && <div className={'status-desc'}>輪到 : {blackIsNext.current ? 'black' : 'white'}</div>)
          }
          <div className={'restart'} onClick={handleRestartClick}>重來</div>
        </div>
        <div className={'board-status'}>
          {board.map((row, y) => {
            return (
              <div className={'board-row'} key={y}>
                {row.map((col, x) => {
                  return <Grid key={x} x={x} y={y} blackIsNext={blackIsNext} handleChessClick={handleChessClick}
                               winner={winner}/>
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home;
