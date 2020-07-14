import React, {useEffect} from 'react'
import { Icon, Button } from 'semantic-ui-react'
import history from '../../history'

const AddEvent = (props) => {

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Internal Server Error"){
        alert('An Error has Occured. Please Try Again.')
      }
      else if(res.message === "Auth Failed"){
        history.push('/login')
      }
    })
    .catch(err => {
      alert('An Error Has Occured. Please Try Again.')
    })
  }, [])

  const handleEvent = (e) => {

    e.preventDefault()

    const name = e.target['name'].value

    fetch('http://localhost:5000/api/event/createEvent',{
      method: 'POST',
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: name
      })})
      .then(res => res.json())
      .then(res => {
        if(res.message === "Auth Failed"){
          history.push('/login')
        }
        else if(res.message === "Internal Server Error"){
          alert('An Error has Occured. Please Try Again.')
        }
        else if(res.message === "Event Created"){
          history.push('/user/dashboard')
        }
      })
    }

  return(
    <div className = "height100vh flex flexAlignItemsCenter flexJustifyContentCenter backgroundColorGradiantGreen">
      <div className = "contentDiv">
        <div className = "accountCard">
          <h2 className = "paddingLeft5percent colorWhite">Add Event</h2>
          <hr className = "margin0auto"></hr>
          <form className = "textAlignCenter" onSubmit = {handleEvent}>
            <div className = "marginTopBottom50px">
              <input className = "inputStyle colorWhite" type="text" placeholder="Event Name" required="required" name = "name" />
            </div>
            <div>
              <Button className = "width80percent marginBottom50px loginPageButtonColor colorWhite" animated='fade'>
                <Button.Content visible>Add Event</Button.Content>
                <Button.Content hidden><Icon name='line graph' /></Button.Content>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
