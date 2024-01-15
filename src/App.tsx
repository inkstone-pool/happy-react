import * as React from './core/React'
function Counter({ num }: { num: number }) {
  return <div id="counter1">counter1:{num}</div>
}
function Counter2({ num }: { num: number }) {
  return (
    <div id="counter2">
      counter1:
      {num}
    </div>
  )
}
function CounterContainer() {
  return <Counter num={10}></Counter>
}
function Counter2Container() {
  return <Counter2 num={20}></Counter2>
}
const App = (
  <div id="test">
    <div>hahaha</div>
    <CounterContainer></CounterContainer>
    <Counter2Container></Counter2Container>
  </div>
)

export default App
