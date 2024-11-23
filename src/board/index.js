import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

const useGameStore = create(
  combine({ squares: Array(9).fill(null), xIsNext: true }, (set) => {
    return {
      setSquares: (nextSquares) => {
        set((state) => ({
          squares:
          typeof nextSquares === 'function'
            ? nextSquares(state.squares)
            : nextSquares,
        }))
      },
      setXIsNext: (nextXIsNext) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === 'function'
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }))
      }
    }
  })
)

function Square({ value, onSquareClick }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#fff',
        border: '1px solid #999',
        outline: 0,
        borderRadius: 0,
        fontSize: '1rem',
        fontWeight: 'bold',
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function Board() {
  // const squares = useGameStore((state) => state.squares);
  // const setSquares = useGameStore((state) => state.setSquares);
  // const [squares, setSquares] = useGameStore((state) => [
  //   state.squares,
  //   state.setSquares,
  // ])
  const [xIsNext, setXIsNext] = useGameStore(useShallow((state) => [
    state.xIsNext,
    state.setXIsNext,
  ]))
  const [squares, setSquares] = useGameStore(useShallow((state) => [
    state.squares,
    state.setSquares
  ]))
  const player = xIsNext ? 'X' : 'O'

  function handleClick(i) {
    if (squares[i]) return
    const nextSquares = squares.slice()
    nextSquares[i] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: 'calc(3 * 2.5rem)',
        height: 'calc(3 * 2.5rem)',
        border: '1px solid #999',
      }}
    >
      {squares.map((square, squareIndex) => (
        <Square key={squareIndex} value={square} onSquareClick={() => handleClick(squareIndex)} />
      ))}
    </div>
  )
}

export default Board;