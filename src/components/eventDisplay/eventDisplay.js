import React, {useState, useEffect} from 'react'
import history from '../../history'
import Bars from './bar'
import Pies from './pie'
import Polars from './polar'
import Lines from './line'

const EventDisplay = (props) => {

  const [eventData, setEventData] = useState(null)
  const [color, setColor] = useState([])
  const [value, setValue] = useState(1)
  let colors = []

  const handleChart = () => {

    const select = document.getElementById('select')

    const bar = document.getElementById('bar')
    const pie = document.getElementById('pie')
    const polar = document.getElementById('polar')
    const line = document.getElementById('line')
    console.log(select.value)

    if(select.value == 1){
      // bar.style.display = 'block'
      // pie.style.display = 'none'
      // polar.style.display = 'none'
      // line.style.display = 'none'
      setValue(1)
    }
    else if(select.value == 2){
      // bar.style.display = 'none'
      // pie.style.display = 'block'
      // polar.style.display = 'none'
      // line.style.display = 'none'
      setValue(2)
    }
    else if(select.value == 3){
      // bar.style.display = 'none'
      // pie.style.display = 'none'
      // polar.style.display = 'block'
      // line.style.display = 'none'
      setValue(3)
    }
    else{
      // bar.style.display = 'none'
      // pie.style.display = 'none'
      // polar.style.display = 'none'
      // line.style.display = 'block'
      setValue(4)
    }

  }

  const dynamicColors = () => {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
         };

  useEffect(() => {
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
        history.push('/login')
      }
      else if(res.message === "Successful"){
        for(let i = 0; i<res.data.data.labels.length; i++){
          colors.push(dynamicColors())
        }
        setColor(colors)
        setEventData(res.data)
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
          <h2 className = 'cardTitle'>h</h2>
          {
            eventData === null
            ?
                null
            :
              <div className = 'chartMaxHeight'>
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
          <div >
            <select id = 'select' onChange = {() => handleChart()} className = "height40px width80percent loginPageButtonColor colorWhite">
              <option value = '1'>Bar</option>
              <option value = '2'>Pie</option>
              <option value = '3'>Polar</option>
              <option value = '4'>Line</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// Array(props.data.length).map((x) => x)

export default EventDisplay
