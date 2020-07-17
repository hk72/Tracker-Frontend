import React, {useEffect} from 'react';
import { Router, Switch } from 'react-router-dom'
import { Route } from 'react-router'
import history from './history'
import { connect } from 'react-redux'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Account from './components/account/account'
import Login from './components/account/login'
import Signup from './components/account/signup'
import Dashboard from './components/dashboard/dashboard'
import AddEvent from './components/addingData/addEvent'
import UpdateData from './components/addingData/updateData'
import AddData from './components/addingData/addData'
import EventDisplay from './components/eventDisplay/eventDisplay'
import NoMatch from './components/noMatch/noMatch'
import Main from './components/main/main'

import './App.css';

const App = (props) => {

  useEffect(() => {
    fetch('https://thetechiechart.herokuapp.com/api/user/profile', {
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
    {console.log(props)}
      <Router history = {history} >
        <Switch>
          <Route exact path = '/login' component = {Login}/>
          <Route exact path = '/signup' component = {Signup}/>
          <Route exact path='/' render={props =>
            <div>
              <Navbar />
              <Main {...props}/>
              <Footer />
            </div>
          } />
          <Route exact path='/user' render={props =>
            <div>
              <Navbar />
              <Account {...props}/>
              <Footer />
            </div>
          } />
          <Route exact path='/user/dashboard' render={props =>
            <div>
              <Navbar />
              <Dashboard {...props}/>
              <Footer />
            </div>
          } />
          <Route exact path='/user/addEvent' render={props =>
            <div>
              <Navbar />
              <AddEvent {...props}/>
              <Footer />
            </div>
          } />
          <Route exact path='/user/:id/updateData/:dataID' render={props =>
            <div>
              <Navbar />
              <UpdateData {...props}/>
              <Footer />
            </div>
          } />
          <Route exact path='/user/:id/addData' render={props =>
            <div>
              <Navbar />
              <AddData {...props}/>
              <Footer />
            </div>
          } />
          <Route path='/user/event/:id' render={props =>
            <div>
              <Navbar />
              <EventDisplay {...props}/>
              <Footer />
            </div>
          } />
          <Route path="*" component={NoMatch} />
        </Switch>
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
