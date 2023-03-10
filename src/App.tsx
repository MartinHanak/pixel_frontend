import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
