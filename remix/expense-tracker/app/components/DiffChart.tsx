import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

type DiffChartPropsT = {
  labels: string[]
  data: number[]
}

const DiffChart = ({ labels, data }: DiffChartPropsT) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Initialize chart only once
    const chart = new Chart(canvasRef.current!, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Savings',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.35)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Income - Expense',
            font: {
              size: 20,
              weight: 'bold',
            },
          },
        },
      },
    })

    // Clean up function for when the chart needs to be destroyed
    return () => chart.destroy()
  }, [])

  return <canvas ref={canvasRef} id="chart"></canvas>
}

export default DiffChart
