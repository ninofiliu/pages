import React from 'react'
import ReactDOM from 'react-dom'

const App = ({n}: {n: number}) => <div>{2*n}</div>;

ReactDOM.render(
  <App n={10}/>,
  document.getElementById('root')
)
