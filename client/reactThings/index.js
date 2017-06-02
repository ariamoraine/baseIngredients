import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../../public/index.scss'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <div>Starting point</div>
  </Provider>,
  document.getElementById('app')
)
