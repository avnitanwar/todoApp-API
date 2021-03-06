import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
