import { useState } from 'react'
import StateData from './components/StateData'
import NationalChart from './components/NationalChart'
import Form from './components/Form'
import Welcome from './components/Welcome'

function App () {
  const [currentData, setCurrentData] = useState([])
  const [pastData, setPastData] = useState([])
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])

  console.log('search', search)

  return (
    <div className='m-6 p-4'>
      <Welcome />
      <Form setSearch={setSearch} search={search} setData={setData} />
      <NationalChart setCurrentData={setCurrentData} currentData={currentData} setPastData={setPastData} pastData={pastData} search={search} data={data} />
      {/* <StateData setCurrentData={setCurrentData} currentData={currentData} setPastData={setPastData} pastData={pastData} /> */}
    </div>
  )
}

export default App
