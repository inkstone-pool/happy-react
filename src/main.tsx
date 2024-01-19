import React from './core/React'
import App from './App'
import ReactDom from './core/ReactDom'

ReactDom.createRoot(document.querySelector('#app')!).render(<App></App>)
