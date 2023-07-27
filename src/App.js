import { useState, useEffect } from 'react';
import axios from 'axios';
import TrustedPersons from './components/TrustedPersons';
import './App.css';

function App() {
  return (
    <div className="App">
      <TrustedPersons></TrustedPersons>
    </div>
  );
}

export default App;
