import React, {useState, useEffect} from 'react'
import history from '../../history'
import { Bar, Pie, Polar, Line } from 'react-chartjs-2';

const Polars = (props) => {

  return(
    <div id = 'polar'>
      <Polar
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
          maintainAspectRatio: false,
          responsive: true
        }
      }
      />
    </div>
  )
}

export default Polars
