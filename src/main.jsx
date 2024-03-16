import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom'
import { CountProvider } from './CountProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <CountProvider> */}
    <BrowserRouter>
      <Home />
    </BrowserRouter>
    {/* </CountProvider> */}
  </React.StrictMode>,
)
