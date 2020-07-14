import React, {useEffect} from 'react';
import { Router } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import { connect } from 'react-redux'
import Navbar from './components/navbar/navbar'
import Account from './components/account/account'
import Login from './components/account/login'
import Signup from './components/account/signup'
import Dashboard from './components/dashboard/dashboard'
import AddEvent from './components/addingData/addEvent'
import UpdateData from './components/addingData/updateData'
import AddData from './components/addingData/addData'
import EventDisplay from './components/eventDisplay/eventDisplay'

import './App.css';

const App = (props) => {

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Successful"){
        props.setLoggedIn('true')
      }
      else{
        props.setLoggedIn('false')
      }
    })
    .catch(err => {
      alert('An Error Has Occured. Please Try Again.')
    })
  }, [])

  return (
    <div>
      <Router history = {history} >
        <Route exact path = '/login' component = {Login}/>
        <Route exact path = '/signup' component = {Signup}/>
        <Route path ='/user'>
          <Navbar/>
          <Route exact path = '/user' component = {Account}/>
          <Route exact path = '/user/dashboard' component = {Dashboard}/>
          <Route exact path = '/user/addEvent' component = {AddEvent}/>
          <Route path = '/user/:id/updateData/:dataID' component = {UpdateData}/>
          <Route path = '/user/:id/addData' component = {AddData}/>
          <Route path = '/user/event/:id' component = {EventDisplay}/>
        </Route>
      </Router>
    </div>
  );
}

const mapDispatchToProps = {
  setLoggedIn: data => {
    return { payload: data, type: 'SET_LOGGED_IN',}
  }
}

export default connect(null, mapDispatchToProps)(App);
