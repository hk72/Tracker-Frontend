import React, {useState, useEffect} from 'react'
import history from '../../history'
import Cards from './card'
import { Card, Icon, Image, Button } from 'semantic-ui-react'


const Dashboard = (props) => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/event/getEvents', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Auth Failed"){
        history.push('/login')
      }
      else if(res.message === "Internal Server Error"){
        alert('An Error Has Occured. Please Try Again.')
      }
      else if(res.message === "Successful"){
        setEvents(res.events)
      }
    })
    .catch(err => {
      alert('An Error Has Occured. Please Try Again.')
    })
  }, [])

  return (
    <div className = "height100vh backgroundColorGradiantGreen">
      <div className = "contentDiv width80percent margin0auto">
        <div className = "textAlignCenter">
          <Button className = "width80percent marginBottom50px loginPageButtonColor colorWhite" animated='fade'>
            <Button.Content visible>Add Event To Track</Button.Content>
            <Button.Content hidden><Icon name='line graph' /></Button.Content>
          </Button>
        </div>
        <div className = "flex flexJustifyContentCenter">
          <Card.Group className = 'margin0' itemsPerRow = "3" doubling stackable>
            {events.map(info => <Cards info = {info} />)}
          </Card.Group>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
