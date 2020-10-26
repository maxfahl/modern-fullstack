import './bootstrap'

import React from 'react'
import {render} from 'react-dom'
import {App} from './components'

import './assets/styles/index.css'

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
