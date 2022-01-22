import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

const Main = lazy(() => import('./pages/MainPage'));
const ChallengeList = lazy(() => import('./pages/ChallengeListPage'));
const ChallengeDetail = lazy(() => import('./pages/ChallengeDetailPage'));

function App() {
  return (
    <Suspense
      fallback={
        <div style={{ height: '100vh', color: 'white', background: '#1c2137' }}>loading...</div>
      }
    >
      <div className="App">
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<ChallengeList />} path="/popular" />
          <Route element={<ChallengeList />} path="/recent" />
          <Route element={<ChallengeDetail />} path="/challenge/detail/:id" />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
