import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

const Main = lazy(() => import('@pages/Main'));
const List = lazy(() => import('@pages/List'));
const Detail = lazy(() => import('@pages/Detail'));
const Create = lazy(() => import('@pages/Create'));
const SignUp = lazy(() => import('@pages/SignUp'));

function App() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', color: 'black' }}>loading...</div>}>
      <div className="App">
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<List />} path="/list/:type" />
          <Route element={<Detail />} path="/detail/:id" />
          <Route element={<Create />} path="/create" />
          <Route element={<SignUp />} path="/signup" />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
