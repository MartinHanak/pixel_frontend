import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginForm from './pages/LoginForm';
import Game from './pages/Game';
import GamesList from './pages/GamesList';
import Home from './pages/Home';

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/game" element={<Game />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
