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

import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import { AssessmentProvider } from './context/AssessmentContext';

export function App() {
  return (
    <AssessmentProvider>
      <Routes>
        <Route
          path="/"
          Component={Home}
        />
      </Routes>
    </AssessmentProvider>
  );
}

export default App;
