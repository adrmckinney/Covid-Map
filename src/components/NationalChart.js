import { useEffect, useState } from 'react'
import { getNationalData } from '../api'
import { Line } from 'react-chartjs-2'

const Chart = ({ currentData, setCurrentData, pastData, setPastData, data }) => {
//   const [chartData, setChartData] = useState({})

  const addComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const chartData = (xLabels, hospitalized) => {
    console.log('hospitalized in Chart', hospitalized)
    console.log('xLabels in Chart', xLabels)
    setChartData({
      labels: xLabels,
      datasets: [{
        label: 'Hospitalized',
        data: hospitalized,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)'
        ],
        borderWidth: 4
      }]
    })
  }

  useEffect(() => {
    const xLabels = []
    const hospitalized = []
    getNationalData(search)
      .then(data => {
        // const smallerData = data.slice(1, 20)
        const labels = data.map(datum => datum.date)
        labels.forEach(label => xLabels.push(parseInt(label)))
        console.log('xLabels', xLabels)
        const datasets = data.map(datum => datum.hospitalized)

        datasets.forEach(hosp => hospitalized.push(parseInt(hosp)))
      })
      .then(data => chartData(xLabels, hospitalized)
      )
  }, [])

  return (
    <div className=''>
      {chartData &&

        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: 'Hospitalizations', display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridlines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    reverse: true
                  }
                }
              ]
            }
          }}
        />}
    </div>
  )
}

export default Chart
