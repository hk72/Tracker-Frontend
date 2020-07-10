import React from 'react';
import logo from './logo.svg';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router history = {history} >
      </Router>
    </div>
  );
}

export default App;
