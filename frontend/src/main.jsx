import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DemoProvider } from './context/demo-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DemoProvider>
      <App />
    </DemoProvider>
  </React.StrictMode>,
)
