import NationalChart from './components/NationalChart'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Divider from './components/Divider'

function App () {
  return (
    <div className='mb-24'>
      <Header />
      <Welcome />
      <Divider />
      <NationalChart />
      <Divider />
    </div>
  )
}

export default App
