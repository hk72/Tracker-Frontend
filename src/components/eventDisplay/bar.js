import React, {useState, useEffect} from 'react'
import history from '../../history'
import { Bar, Pie, Polar, Line } from 'react-chartjs-2';

const Bars = (props) => {

  return(
    <div>
      <div id = 'bar' className = "overflowX">
        <Bar
          data={{labels: props.eventData.data.labels,
            datasets: [{
              label: 'Total Kills per Game',
              data: props.eventData.data.datasets,
              backgroundColor: props.colors,
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
  </div>
  )
}

export default Bars
