import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

const Main = lazy(() => import('./pages/MainPage'));
const List = lazy(() => import('./pages/ListPage'));

function App() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', color: 'black' }}>loading...</div>}>
      <div className="App">
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<List />} path="/list/:type/" />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
