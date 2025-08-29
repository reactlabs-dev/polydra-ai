import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'

import App from './app/app'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
