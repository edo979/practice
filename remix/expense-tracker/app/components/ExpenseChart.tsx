import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

type ExpenseChartPropsT = {
  labels: string[]
  data: number[]
}

const ExpenseChart = ({ labels, data }: ExpenseChartPropsT) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Initialize chart only once
    const chart = new Chart(canvasRef.current!, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Expenses',
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 205, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(201, 203, 207, 0.5)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })

    // Clean up function for when the chart needs to be destroyed
    return () => chart.destroy()
  }, [])

  return <canvas ref={canvasRef} id="chart"></canvas>
}

export default ExpenseChart
