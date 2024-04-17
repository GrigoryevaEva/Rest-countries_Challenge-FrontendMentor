import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getData, fetchCountry, fetchCountryBorders, resetStore } from '../features/country/countrySlice';

const CountryPage = () => {
  const dispatch = useDispatch()

  const data = useSelector(getData)
  const countryBorders = useSelector(state => state.country.countryBorders)
  const countryStatus = useSelector(state => state.country.status)
  const error = useSelector(state => state.country.error)

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
        <div>
          <img className="country__flag" src={item.flags.svg} alt=""></img>
        </div>
        <div>
          <div>
            <h2>{item.name.common}</h2>
            <p>Native Name: {getNestingObj(item.name.nativeName)}</p>
            <p>Population: {convertPopulation(item.population)}</p>
            <p>Region: {item.region}</p>
            <p>Sub Region: {item.subregion}</p>
            <p>Capital: {item.capital}</p>
            <p>Top Level Domain: {item.tld}</p>
            <p>Currencies: {getNestingObj(item.currencies)}</p>
            <p>
              Languages: {Object.values(item.languages).join(', ')}
            </p>
          </div>
          <div>
            <p>Border Countries:</p>
            {
              countryBorders.map((b) => {
                if (typeof b === 'string') {
                  return <p key={'notFound'}>Is not Border Countries</p>
                } else {
                  return <Link to={`/${b.cca3}`} key={b.cca3} onClick={handleResetStore}>{b.name.common} </Link>
                }
              })
            }
          </div>
        </div>
      </div>
    ))

  } else if (countryStatus === 'failed') {

    content = <p>{error}</p>

  }
  
  return (
    <main>
      <div className="container">
      <Link to={`/`} >Back</Link>
        {content}
      </div>
    </main>
  );
}

export default CountryPage;