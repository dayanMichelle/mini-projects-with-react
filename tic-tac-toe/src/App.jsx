import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

import { Square } from './components/Square'
import { TURNS } from './components/constants'
import { checkWinnerForm, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'


function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // no actualizamos esta posicion
    if (board[index] || winner) return
    //actualizar en el panel
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // revisar si alguien ganó
    const newWinner = checkWinnerForm(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)

    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset the game</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
      <section>
        <WinnerModal winner={winner} resetGame={resetGame} />
      </section>
    </main>
  )
}

export default App
