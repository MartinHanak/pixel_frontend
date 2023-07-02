import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import LoginForm from './pages/LoginForm';
import Game from './pages/Game';
import Home from './pages/Home';

import backgroundImage from '../src/assets/images/background.jpg'
import { Modal } from './components/Modal';
import { useAppDispatch, useAppSelector } from './hooks/typedStoreHooks';
import { resetErrors } from './reducers/loginSlice';

function App() {

  const [showLogin, setShowLogin] = useState(false)

  const dispatch = useAppDispatch()

  const handleLoginClose = () => {
    dispatch(resetErrors())
    setShowLogin(false)
  }

  return (
    <div className='h-full min-h-screen w-full bg-no-repeat bg-cover' >
      <header className='mb-0'>
        <Navbar showLogin={() => setShowLogin(true)} />
      </header>

      <main style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(0deg, black 0%, rgba(0,0,0,0.5) 50%, transparent 60%, transparent 100%),linear-gradient(180deg, black 0%, rgba(0,0,0,0.5) 10%, transparent 20%, transparent 100%), url('${backgroundImage}')`,
      }}
        className={`w-full pb-32 pt-0 mt-0 min-h-[320px] sm:min-h-[640px]`}>
        <div className='max-w-screen-lg mx-auto w-full h-full'>
          <Routes>
            <Route path="/" element={<Home showLogin={() => setShowLogin(true)} />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </main>

      {showLogin && <Modal showModal={showLogin} onCloseModal={handleLoginClose}><LoginForm close={handleLoginClose} /></Modal>}

      <footer className='flex align-middle justify-center text-white bg-black'>
        Made by <span className='font-bold ml-2'> <a href="https://www.martinhanak.com/" className='underline underline-offset-4'>Martin Hanák</a></span>
      </footer>
    </div>
  );
}

export default App;
