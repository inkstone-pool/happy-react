import React from './core/React'
import { update } from './core/wookloop'
let count = 100
function Counter() {
  const onClick = () => {
    //主动更新
    count++
    update()
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
function Counter2({ num }: { num: number }) {
  const onClick = () => {
    Counter2Props = {
      className: 'yes',
    }
    update()
    console.log('click-counterTwo')
  }
  return (
    <div {...Counter2Props}>
      counter1:
      {num}
      <button onClick={onClick}>remove</button>
    </div>
  )
}
function CounterContainer() {
  return <Counter></Counter>
}
function Counter2Container() {
  return <Counter2 num={20}></Counter2>
}
const App = (
  <div id="test">
    <div>happy-react</div>
    <CounterContainer></CounterContainer>
    <Counter2Container></Counter2Container>
  </div>
)

export default App
