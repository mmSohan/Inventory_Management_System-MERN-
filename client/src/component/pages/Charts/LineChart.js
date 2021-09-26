import React from 'react'
import { Line } from 'react-chartjs-2';

const data = {

    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],

    datasets: [

        {
            label: 'Number Of Order',
            data: [20, 30, 70, 45, 60, 80, 50],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};

const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const LineChart = ()=> (
      <>
      <Line data={data} options={options} />
      </>
  );

  export default LineChart;