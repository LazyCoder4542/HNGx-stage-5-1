import React from 'react'
import ReactDOM from 'react-dom/client'
import { PopupProvider } from './components/popupContext';
import Popup from './components/popup';
import App from './App.tsx'
import './index.sass'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupProvider>
      <Popup />
      <App />
    </PopupProvider>
  </React.StrictMode>,
)
