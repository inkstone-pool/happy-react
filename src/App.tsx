import React from './core/React'
import { useEffect, useState } from './core/wookloop'
function UseStateDemo() {
  console.log('usestatedemo')
  const [num, setNum] = useState(10)
  useEffect(() => {
    console.log('init')
  }, [])
  useEffect(() => {
    console.log('update')
  }, [num])
  return (
    <div>
      <div>
        {num}
        <button
          onClick={() => {
            setNum((pre: number) => pre + 1)
          }}
        >
          +1
        </button>
      </div>
    </div>
  )
}

function App() {
  console.log('App')
  const [title, setTitle] = useState('react')
  const onClick = () => {
    setTitle((pre: string) => pre + 1)
    console.log('click-App')
  }
  return (
    <div id="test">
      <div>
        {title}
        <button onClick={onClick}>改变title</button>
      </div>
      {/* <Counter></Counter> */}
      <UseStateDemo></UseStateDemo>
    </div>
  )
}

export default App
