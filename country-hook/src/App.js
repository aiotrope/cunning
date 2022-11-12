import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clearInput = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clearInput,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`

  useEffect(() => {
    const getCountry = async () => {
      try {
        if (name) {
          const response = await axios.get(url)
          setCountry(response.data[0])
        }
      } catch (error) {
        console.error(error.response.data)
      }
    }
    getCountry()
  }, [name, url])

  return country
}

const Country = ({ country }) => {
  return country ? (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  ) : null
}

const App = () => {
  //const nameInput = useField("text");
  const { clearInput: clearNameInput, ...nameInput } = useField('text')
  const [name, setName] = useState('')
  const [notFound, setNotFound] = useState('')

  const notFoundRef = useRef(null)
  const country = useCountry(name)

  const url = `https://restcountries.com/v3.1/name/${nameInput.value}?fullText=true`

  const handleClearInput = () => {
    clearNameInput()
  }

  const fetch = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get(url)
      if (response.data[0]) {
        setName(nameInput.value)
        notFoundRef.current = 'founded!'
      } else {
        notFoundRef.current = 'not found'
        setNotFound(notFoundRef.current)

        let timer
        clearTimeout(timer)
        timer = setTimeout(() => {
          handleClearInput()
          window.location.reload()
        }, 5000)
      }
    } catch (error) {
      //console.error(error.response.data);
      if (error.response.data) {
        notFoundRef.current = 'not found'
        setNotFound(notFoundRef.current)

        let timer
        clearTimeout(timer)
        timer = setTimeout(() => {
          handleClearInput()
          window.location.reload()
        }, 5000)
      }
    }
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
      {notFound && <div>{notFound}</div>}
    </div>
  )
}

export default App
