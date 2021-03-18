import { useEffect, useState } from 'react'
import { getNationalData } from '../api'
import { Line } from 'react-chartjs-2'
import Form from './Form'

const NationalChart = () => {
  const [nationalData, setNationalData] = useState({})
  const [search, setSearch] = useState('')

  // const addComma = (num) => {
  //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // }

  const chartData = (xLabels, searchVariable) => {
    setNationalData({
      labels: xLabels,
      datasets: [{
        label: search,
        data: searchVariable,
        backgroundColor: [
          'rgba(75, 100, 192, 0.6)'
        ],
        borderWidth: 4
      }]
    })
  }

  useEffect(() => {
    const xLabels = []
    const searchVariable = []
    getNationalData()
      .then(data => {
        console.log('data', data)
        const dates = data.map(datum => datum.date)

        const regex = /(\d{4})(\d{1,2})(\d{1,2})/
        const subst = '$2/$3/$1'

        const newDates = []
        dates.forEach(date => newDates.push(date.toString().replace(regex, subst)))

        newDates.forEach(newDate => xLabels.push(newDate))

        const datasets = data.map(datum => {
          const newSearch = search
          return datum[newSearch]
        })
        datasets.forEach(dataset => searchVariable.push(dataset))
      })
      .then(data => chartData(xLabels, searchVariable)
      )
  }, [search])

  return (
    <div className='bg-gray-50'>
      <div className='max-w-5xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex flex-col items-center justify-center h-screen'>
          <div className='mb-6'>
            <Form setSearch={setSearch} search={search} />
          </div>
          {nationalData &&

            <Line
              data={nationalData}
              options={{
                responsive: true,
                title: { text: 'National Data', display: true },
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
      </div>
    </div>
  )
}

export default NationalChart
