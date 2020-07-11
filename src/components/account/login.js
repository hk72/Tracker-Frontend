import React, {useState} from 'react'
import { Button, Icon } from 'semantic-ui-react'
import history from '../../history'

const Login = (props) => {

  const [errors, setErrors] = useState([])

  const handleLogin = (e) => {

    const username = e.target['username'].value.toString()
    const password = e.target['password'].value.toString()

    e.preventDefault()

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
          setErrors(['Username or Password Incorrect.'])
        }
      })
      .catch(err => {
        alert('An Error Has Occured. Please Try Again.')
      })
  }

  return(
    <div className="height100vh flex flexAlignItemsCenter flexJustifyContentCenter backgroundColorGradiantGreen">
      <div className = "width400px textAlignCenter">
      <h1 className = "marginBottom100px colorWhite">Login</h1>
        <form onSubmit = {handleLogin}>
          <div className = "marginTopBottom50px">
            <input className = "inputStyle colorWhite" type="text" placeholder="Username" required="required" name = "username" />
          </div>
          <div className = "marginTopBottom50px">
            <input className = "inputStyle colorWhite"  type="password" placeholder="Password" required="required"  name = "password"/>
          </div>
          <div>
            <Button className = "width80percent marginBottom50px loginPageButtonColor colorWhite" animated>
              <Button.Content className = "slowerTransition" visible>Login</Button.Content>
              <Button.Content className = "slowerTransition" hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </div>
          <div className = "colorWhite">
            <p className = "displayInline">Do not have an Account? </p>
            <p className = "pointer displayInline" onClick = { () => {history.push('/signup')}}>Signup.</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

// import React from 'react'

// const Login = (props) => {
//   return(
//     <div>
//     </div>
//   )
// }
//
// export default Login
