import { getPastData } from '../api'
import { parseData } from '../functions'
import StateData from './StateData'

const Form = ({ search, setSearch, setData }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    getPastData(search)
      .then(data => parseData(data))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='state'
          value={search}
        />
        <button
          type='submit'
          onChange={e => setSearch(e.target.value)}
        >Search
        </button>
      </form>
    </div>
  )
}

export default Form
