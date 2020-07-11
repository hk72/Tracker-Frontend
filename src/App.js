import React from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import Account from './components/account/account'
import Login from './components/account/login'
import Signup from './components/account/signup'

import './App.css';

function App() {
  return (
    <div>
      <Router history = {history} >
        <Route exact path = '/account' component = {Account}/>
        <Route exact path = '/login' component = {Login}/>
        <Route exact path = '/signup' component = {Signup}/>
      </Router>
    </div>
  );
}

export default App;
