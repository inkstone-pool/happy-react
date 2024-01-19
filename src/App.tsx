import React from './core/React'
import { update } from './core/wookloop'
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
function CounterContainer() {
  return <Counter></Counter>
}
function Counter2Container() {
  return <Counter2></Counter2>
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
      <CounterContainer></CounterContainer>
      <Counter2Container></Counter2Container>
    </div>
  )
}

export default App
