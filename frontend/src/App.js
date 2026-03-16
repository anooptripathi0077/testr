import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import OpenPage from './components/OpenPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <OpenPage />
      </div>
    </BrowserRouter>
  );
}

export default App;