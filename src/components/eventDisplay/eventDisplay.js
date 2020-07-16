import React, {useState, useEffect} from 'react'
import history from '../../history'
import { Button, Icon } from 'semantic-ui-react'
import Bars from './bar'
import Pies from './pie'
import Polars from './polar'
import Lines from './line'
import Data from './data'
import UpdateEvent from '../addingData/updateEvent'

const EventDisplay = (props) => {

  const [eventData, setEventData] = useState(null)
  const [parsedData, setParsedData] = useState(null)
  const [color, setColor] = useState([])
  const [value, setValue] = useState(1)
  let colors = []
  let parsed = []

  const handleChart = () => {

    const select = document.getElementById('select')

    const bar = document.getElementById('bar')
    const pie = document.getElementById('pie')
    const polar = document.getElementById('polar')
    const line = document.getElementById('line')

    if(select.value == 1){
      setValue(1)
    }
    else if(select.value == 2){
      setValue(2)
    }
    else if(select.value == 3){
      setValue(3)
    }
    else{
      setValue(4)
    }
  }

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/event/deleteEvent/${props.match.params.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === 'Event Deleted'){
        history.replace('/user/dashboard')
      }
      else if(res.message === "Internal Server Error"){
        alert('An Error has Occured. Please Try Again.')
      }
      else if(res.message === "Auth Failed"){
        history.replace('/login')
      }
    })
  }

  const dynamicColors = () => {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
         };

  useEffect(() => {
    console.log(history)
    fetch(`http://localhost:5000/api/event/getEventsData/${props.match.params.id}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.message === "Internal Server Error"){
        alert('An Error has Occured. Please Try Again.')
      }
      else if(res.message === "Auth Failed"){
        history.replace('/login')
      }
      else if(res.message === "Successful"){
        for(let i = 0; i<res.data.data.labels.length; i++){
          colors.push(dynamicColors())
          parsed.push({label: res.data.data.labels[i], dataset: res.data.data.datasets[i], key: i})
        }
        setColor(colors)
        setEventData(res.data)
        setParsedData(parsed)
      }
    })
    .catch(err => {
      alert('An Error Has Occured. Please Try Again.')
    })
  }, [])

  return(
    <div className = "height100vh backgroundColorGradiantGreen">
      <div className = "contentDiv width80percent margin0auto">
        <div className = "textAlignCenter">
          {
            eventData === null
            ?
                null
            :
              <div className = 'chartMaxHeight'>
                <h2 className = "colorWhite">{eventData.name}</h2>
              {
                value === 1
                ?
                  <div>
                    <Bars eventData = {eventData} colors = {color}/>
                  </div>
                :
                  null
              }
              {
                value === 2
                ?
                  <div>
                    <Pies eventData = {eventData} colors = {color}/>
                  </div>
                :
                  null
              }
              {
                value === 3
                ?
                  <div>
                    <Polars eventData = {eventData} colors = {color}/>
                  </div>
                :
                  null
              }
              {
                value === 4
                ?
                  <div>
                    <Lines eventData = {eventData} colors = {color}/>
                  </div>
                :
                  null
              }
              </div>
          }
        </div>
        <div className = "paddingTopBottom20px">
        {
          parsedData === null
          ?
            null
          :
          <div>
            <div className = " textAlignCenter marginTopBottom50px">
              <select id = 'select' onChange = {() => handleChart()} className = "height40px width80percent loginPageButtonColor colorWhite">
                <option value = '1'>Bar</option>
                <option value = '2'>Pie</option>
                <option value = '3'>Polar</option>
                <option value = '4'>Line</option>
              </select>
            </div>
            <div className = 'contentCard'>
              <div className = "paddingBottom20px">
                <h2 className = "paddingLeft5percent colorWhite displayInline">Data</h2>
                <div className = "displayInline floatRight margin0 paddingRight40px fontSize25px colorWhite">
                  <Icon onClick = {() => history.push(`/user/${props.match.params.id}/addData`)} className = "rotate90 margin0 width1emheight8em" name='add circle' />
                </div>
                <hr className = "margin0auto"></hr>
              </div>
              <div>
                {parsedData.map(info => <Data key = {info.key} info = {info} id = {props.match.params.id}/>)}
              </div>
            </div>
            <UpdateEvent event = {eventData}/>
            <div className = "textAlignCenter paddingBottom20px">
              <Button onClick = {() => handleDelete()} className = "width80percent colorRed colorWhite" animated='fade'>
                <Button.Content visible>Delete Event</Button.Content>
                <Button.Content hidden><Icon name='trash alternate' /></Button.Content>
              </Button>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default EventDisplay
