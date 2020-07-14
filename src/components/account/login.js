import React, {useState} from 'react'
import { Button, Icon } from 'semantic-ui-react'
import history from '../../history'
import { connect } from 'react-redux'

const Login = (props) => {

  const [errors, setErrors] = useState([])

  const handleLogin = (e) => {

    const username = e.target['username'].value
    const password = e.target['password'].value

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
          history.push('/user')
          props.setLoggedIn('true')
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
    <div className="height100vhNoNav flex flexAlignItemsCenter flexJustifyContentCenter backgroundColorGradiantGreen">
      <div className = "width400px textAlignCenter">
      <h1 className = "marginBottom100px colorWhite">Login</h1>
        <form onSubmit = {handleLogin}>
          {
            errors.length !== 0
            ?
              <div className = "paddingTopBottom20px">
                <div className = "errorBox textAlignCenter">
                  <h3>Errors</h3>
                    <ul className = "popUpUL">
                      {errors.map((err, index) => {
                        return <li key = {index} className = "errorText">{err}</li>
                      })}
                    </ul>
                </div>
              </div>
            :
            null
          }
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

const mapDispatchToProps = {
  setLoggedIn: data => {
    return { payload: data, type: 'SET_LOGGED_IN',}
  }
}

export default connect(null, mapDispatchToProps)(Login)

// import React from 'react'

// const Login = (props) => {
//   return(
//     <div>
//     </div>
//   )
// }
//
// export default Login
