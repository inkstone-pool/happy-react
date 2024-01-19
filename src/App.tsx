import React from './core/React'
import { update, useState } from './core/wookloop'
let count = 100
let showNum = false
function Counter() {
  console.log('render:Counter')
  const updateFn = update()
  const onClick = () => {
    //主动更新
    count++
    updateFn()
    console.log('click-counterOne')
  }
  return (
    <div id="counter1">
      counter1:{count}
      <button onClick={onClick}>+1</button>
    </div>
  )
}
let Counter2Props: any = {
  className: '12312',
  id: 'counter2',
}
function Counter2() {
  console.log('render:Counter2')
  const updateFn = update()
  const onClick = () => {
    Counter2Props = {
      className: 'yes',
    }
    showNum = !showNum
    updateFn()
    console.log('click-counterTwo')
  }
  return (
    <div {...Counter2Props}>
      counter1:
      {showNum ? <div>num</div> : <p>不展示num</p>}
      <button onClick={onClick}>showNum</button>
    </div>
  )
}
function UseStateDemo() {
  console.log('usestatedemo')
  const [num, setNum] = useState(10)
  // const [title, setTitle] = useState('title')
  return (
    <div>
      {/* <div>{title}</div> */}
      <div>{num}</div>
      <button
        onClick={() => {
          setNum(10)
          // setTitle((preString: string) => preString + preString)
        }}
      >
        +1
      </button>
    </div>
  )
}
let appCount = 100
function App() {
  console.log('App')
  const updateFn = update()
  const onClick = () => {
    appCount++
    updateFn()
    console.log('click-App')
  }
  return (
    <div id="test">
      <div>
        happy-react{appCount}
        <button onClick={onClick}>+1{appCount}</button>
      </div>
      <Counter></Counter>
      <Counter2></Counter2>
      <UseStateDemo></UseStateDemo>
    </div>
  )
}

export default App
