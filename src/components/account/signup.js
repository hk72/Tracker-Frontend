import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import history from '../../history'


const Signup = (props) => {

  const handleSignup = (e) => {

  const username = e.target['username'].value.toString()
  const password = e.target['password'].value.toString()

  e.preventDefault()

  if(e.target['password'].value !== e.target['re-password'].value){
    // setErrors(['Make Sure Passwords Match'])
  }
  else{
    fetch('http://localhost:5000/api/user/signup',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })})
    .then(res => res.json())
    .then(res => {
      if(res.message === 'Internal Server Error'){
      }
      else if(res.message === 'Username Exists'){

      }
      else{
        fetch('http://localhost:5000/api/user/login',{
          method: 'POST',
          credentials: 'include',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })})
          .then(res => res.json())
          .then(res => {
            if(res.message === 'Auth Successful'){
              history.push('/account')
            }
            else{

            }
          })
        }
      })
    }
  }

  return(
    <div>
    <div className="height100vh flex flexAlignItemsCenter flexJustifyContentCenter backgroundColorGradiantGreen">
      <div className = "width400px textAlignCenter">
      <h1 className = "marginBottom100px colorWhite">Signup</h1>
        <form onSubmit = {handleSignup}>
          <div className = "marginTopBottom50px">
            <input className = "inputStyle colorWhite" type="text" placeholder="Username" required="required" name = "username" />
          </div>
          <div className = "marginTopBottom50px">
            <input className = "inputStyle colorWhite"  type="password" placeholder="Password" required="required"  name = "password"/>
          </div>
          <div className = "marginTopBottom50px">
            <input className = "inputStyle colorWhite"  type="password" placeholder="Password" required="required"  name = "re-password"/>
          </div>
          <div>
            <Button className = "width80percent marginBottom50px loginPageButtonColor colorWhite" animated>
              <Button.Content className = "slowerTransition" visible>Signup</Button.Content>
              <Button.Content className = "slowerTransition" hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </div>
          <div className = "colorWhite">
            <p className = "displayInline">Already have an Account? </p>
            <p className = "pointer displayInline" onClick = { () => {history.push('/login')}}>Login.</p>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup
