import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getData, fetchCountry, fetchCountryBorders, resetStore } from '../entities/country/index';

import iconDt from '../shared/ui/shape-dt.svg'
import iconLt from '../shared/ui/shape-lt.svg'

const CountryPage = () => {
  const dispatch = useDispatch()

  const data = useSelector(getData)
  const countryBorders = useSelector(state => state.country.countryBorders)
  const countryStatus = useSelector(state => state.country.status)
  const error = useSelector(state => state.country.error)

  const theme = useSelector((state) => state.theme)

  const { countryCode } = useParams()

  useEffect(() => {
    dispatch(resetStore())
  }, [])
  
  useEffect(() => {
    if (countryStatus === 'idle') {
      dispatch(fetchCountry(countryCode))
    }
  }, [countryStatus, dispatch])

  useEffect(() => {
    if (data != []) {
      dispatch(fetchCountryBorders(data))
    }
  }, [data])

  const handleResetStore = () => {
    dispatch(resetStore())
  }

  const convertPopulation = (num) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(num)
  }

  const getNestingObj = (obj) => {
    let result = '';
    for (let key in obj) {
      for (let k in obj[key]) {
        result = obj[key][k]
        break
      }
      break
    }
    return result
  }

  let content

  if (countryStatus === 'loading') {

    content = <p>Loading...</p>

  } else if (countryStatus === 'succeeded') {

    content = data.map((item) => (
      <div className="country" key={item.cca3}>

        <div className='country__container-flag'>
          <img src={item.flags.svg} alt=""></img>
        </div>
        
        <div className='country__container-info'>
          <h2>{item.name.common}</h2>
          <div className='one-five'>
            <p><span>Native Name:</span> {getNestingObj(item.name.nativeName)}</p>
            <p><span>Population:</span> {convertPopulation(item.population)}</p>
            <p><span>Region:</span> {item.region}</p>
            <p><span>Sub Region:</span> {item.subregion}</p>
            <p><span>Capital:</span> {item.capital}</p>
          </div>

          <div className='six-eight'>
            <p><span>Top Level Domain:</span> {item.tld}</p>
            <p><span>Currencies:</span> {getNestingObj(item.currencies)}</p>
            <p>
              <span>Languages:</span> {Object.values(item.languages).join(', ')}
            </p>
          </div>

          <div className='container-border-countries'>
            <p><span>Border Countries:</span></p>
            <div>
            {
              countryBorders.map((b) => {
                if (typeof b === 'string') {
                  return <p key={'notFound'}>Is not Border Countries</p>
                } else {
                  return <Link to={`/${b.cca3}`} key={b.cca3} onClick={handleResetStore}>
                    <button>
                    {b.name.common}
                    </button>
                  </Link>
                }
              })
            }
            </div>
          </div>
        </div>
      </div>
    ))

  } else if (countryStatus === 'failed') {

    content = <p>{error}</p>

  }
  
  return (
    <main className='country-page'>
      <div className="container">
      <Link to={`/`} >
        <button className='back-btn'>
        {theme === 'dark' ? 
          <img src={iconDt} alt=""></img> : 
          <img src={iconLt} alt=""></img>
          }
        Back
        </button>
      </Link>
        {content}
      </div>
    </main>
  );
}

export default CountryPage;