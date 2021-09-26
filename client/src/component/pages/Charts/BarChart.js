import React from 'react'
import { Bar } from 'react-chartjs-2';

const data = {

    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],

    datasets: [

        {
            label: 'Amount Of Sales',
            data: [10000, 15000, 8000, 20000, 16000, 18000, 12000],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
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

const BarChart = ()=>(
    <>
    <Bar data={data} options={options} />
    </>
)

export default BarChart;