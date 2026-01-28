/*!
 * PolydraIQ Assessment Platform
 * Copyright (C) 2024-2026 Inference-Stack.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 */

import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'
import { Analytics } from "@vercel/analytics/react"

import App from './app/app'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>
)
