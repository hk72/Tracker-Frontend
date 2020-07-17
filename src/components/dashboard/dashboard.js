import React, {useState, useEffect} from 'react'
import history from '../../history'
import Cards from './card'
import { Icon, Image, Button, Grid } from 'semantic-ui-react'


const Dashboard = (props) => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('https://thetechiechart.herokuapp.com/api/event/getEvents', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Auth Failed"){
        history.replace('/login')
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
    <div className = "height100vh greenBackground">
      <div className = "contentDiv width80percent margin0auto">
        <div className = "textAlignCenter">
          <Button onClick = {() => history.push('/user/addEvent')} className = "width80percent marginBottom50px loginPageButtonColor colorWhite" animated='fade'>
            <Button.Content visible>Add Event To Track</Button.Content>
            <Button.Content hidden><Icon name='line graph' /></Button.Content>
          </Button>
        </div>
        <div>
        <Grid className = "flex dashboardCards" stretched doubling stackable columns={3} style={{ width: '100%', margin: '0' }}>
          {events.map(info => <Cards info = {info} key = {info._id} />)}
        </Grid>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
