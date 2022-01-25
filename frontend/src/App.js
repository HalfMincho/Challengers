import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

const Main = lazy(() => import('./pages/MainPage'));
const List = lazy(() => import('./pages/ListPage'));
const Detail = lazy(() => import('./pages/DetailPage'));

function App() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', color: 'black' }}>loading...</div>}>
      <div className="App">
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<List />} path="/list/:type" />
          <Route element={<Detail />} path="/detail/:id" />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
