import { useEffect, useState } from 'react'
const FollowMouse = ({ setEnabled, enabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // limpiar el efecto cleanefect
    return () => {
      /* se ejecuta siempre que se desmonta el componente 
      y cada vez que cambie la dependencia
      truco -> getEventlisener(windows)
      */
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  return (
    <>
      <div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          border: '1px solid #fff',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'}
      </button>
    </>
  )
}
let points = 0
const RandomPoint = ({ setCount }) => {
  const [random, setRandom] = useState({ x: 100, y: 50 })

  const changePosition = () => {
    let new_x = Math.floor(Math.random() * 800)
    let new_y = Math.floor(Math.random() * 600)
    setRandom({
      x: new_x,
      y: new_y,
    })

  }
  setTimeout(() => {
    changePosition()
  }, '2000')
  const sumPoints = () => {
    points += 1
    setCount(points)
  }
  return (
    <div
      onMouseDown={sumPoints}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'red',
        border: '1px solid #fff',
        opacity: 0.8,
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${random.x}px, ${random.y}px)`,
        transition: 'all 0.3s ease',
      }}
    />
  )
}
const Count = ({ count }) => {
  return <p>Points: {count}</p>
}
function App () {
  let point = 0
  const [count, setCount] = useState(points)
  const [enabled, setEnabled] = useState(false)
  return (
    <main>
      <Count count={count} />
      <FollowMouse enabled={enabled} setEnabled={setEnabled} />
      {enabled && <RandomPoint count={count} setCount={setCount} />}
    </main>
  )
}

export default App
