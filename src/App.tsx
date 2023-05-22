import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginForm from './pages/LoginForm';
import Game from './pages/Game';
import GamesList from './pages/GamesList';
import Home from './pages/Home';

import backgroundImage from '../src/assets/images/background.jpg'

function App() {
  return (
    <div className='h-full min-h-screen w-full bg-no-repeat bg-cover' >
      <header className='mb-0'>
        <Navbar />
      </header>

      <main style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(0deg, black 0%, rgba(0,0,0,0.5) 50%, transparent 60%, transparent 100%), url('${backgroundImage}')`,
      }}
        className={`w-full pb-32 pt-4 mt-0 `}>
        <div className='max-w-screen-lg mx-auto w-full '>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/game" element={<Game />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
