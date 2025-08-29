// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import React from 'react';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        Component={Home}
      />
    </Routes>
  );
}

export default App;
