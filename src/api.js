import axios from 'axios'

const url = axios.create({
  baseUrl: 'https://api.covidtracking.com/'
})

export const getCurrentData = () => {
  return url
    .get('https://api.covidtracking.com/v1/us/current.json/')
    .then(res => {
      console.log('res.data', res.data)
      return res.data
    })
}

export const getNationalData = () => {
  return url
    .get('https://api.covidtracking.com/v1/us/daily.json/')
    .then(res => res.data)
}
