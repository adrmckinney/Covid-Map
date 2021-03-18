import { useEffect, useState } from 'react'
import { getNationalData } from '../api'
import { Transition } from '@headlessui/react'

const Form = ({ search, setSearch, getData }) => {
  const [searchOption, setSearchOption] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    getNationalData()
      .then(data => {
        data.forEach(datum => setSearchList(Object.keys(datum)))
      })
  }, [])

  const selectSearch = () => {
    return (
      <div className='mt-1 relative'>
        <button
          type='button' aria-haspopup='listbox' aria-expanded='true' aria-labelledby='listbox-label' className='bg-indigo-100 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          onClick={() => setShowSearch(showSearch => !showSearch)}
        >
          <span className='block truncate text-indigo-700 text-center text-sm font-medium sm:text-md'>
            {searchOption || '–– Select Category ––'}

          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
              <path fillRule='evenodd' d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </span>
        </button>
        <Transition
          show={showSearch}
          enter=''
          enterFrom=''
          enterTo=''
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='absolute mt-1 w-full rounded-md bg-gray-50 shadow-lg z-50'>
            <ul tabIndex='-1' role='listbox' aria-labelledby='listbox-label' aria-activedescendant='listbox-item-3' className='max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
              {searchList.map((item, idx) => (
                <li
                  key={`item-${idx}`}
                  id={`item-${item}`}
                  data-idx={idx}
                  value={searchOption}
                  className='hover:text-white hover:bg-green-400 text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9'
                  onClick={() => {
                    setSearchOption(item)
                    setShowSearch(false)
                  }}
                >
                  {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                  <span
                    className='font-normal block truncate'
                  >
                    {item}
                  </span>
                </li>
              ))}

            </ul>
          </div>
        </Transition>
      </div>
    )
  }

  return (
    <div className='mt-10 mx-10 flex justify-center items-end'>
      <label
        htmlFor='about'
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mr-4 w-60'
      >
        {selectSearch()}
      </label>
      <button
        type='button'
        className='mb-1 inline-flex items-center px-2.5 py-1.5 h-1/2 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        onClick={() => {
        //   setSearch(searchOption)
          getData(searchOption)
        }}
      >
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='ml-0.5 mr-2 h-4 w-4'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
        </svg>
        <span>Search</span>
      </button>

    </div>
  )
}

export default Form
