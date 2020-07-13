import React, {useState, useEffect} from 'react'
import history from '../../history'
import { Bar, Pie, Polar, Line } from 'react-chartjs-2';

const Lines = (props) => {

  return(
    <div id = 'line' className = "overflowX">
      <Line
        data={{labels: props.eventData.data.labels,
          datasets: [{
            label: 'Total Kills per Game',
            data: props.eventData.data.datasets,
            backgroundColor: '#00C8A1',
            borderWidth: 1,
            borderColor: 'white',
            hoverBorderWidth: 3,
            hoverBorderColor: 'black'

          }],
        }}
        width={1000}
        height={400}
        options={{
          legend: {
            labels: {
              fontColor: "white",

            }
          },
          scales:{
            yAxes: [{
              ticks:{
                fontColor:'white',
                beginAtZero: true
              }
            }],
            xAxes: [{
              ticks:{
                fontColor:'white',
                autoSkip: true,
                maxTicksLimit: 20
              }
            }]
          },

          maintainAspectRatio: false,
          responsive: true
        }
      }
      />
    </div>
  )
}

export default Lines
