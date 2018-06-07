import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'


console.log('NODE_ENV', process.env.NODE_ENV)

ReactDOM.render(<App />, document.getElementById('root'))
