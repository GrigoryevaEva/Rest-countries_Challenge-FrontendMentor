import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { 
  fetchCountry, 
  fetchCountryBorders, 
  resetStore,
  selectData,
  selectStatus,
  selectError,
  selectCountryBorders
} from '../../../entities/country/index';

import { selectCurrentTheme } from "../../../entities/theme/index";

import { convertPopulation, getNestingObj } from "../../../shared/model/functions/index";

import iconDt from '../../../shared/ui/shape-dt.svg'
import iconLt from '../../../shared/ui/shape-lt.svg'

export const CountryPage = () => {
  const dispatch = useDispatch()

  const data = useSelector(selectData)
  const countryBorders = useSelector(selectCountryBorders)
  const countryStatus = useSelector(selectStatus)
  const error = useSelector(selectError)

  const theme = useSelector(selectCurrentTheme)

  const { countryCode } = useParams()

  useEffect(() => {
    if (countryStatus != 'idle') dispatch(resetStore())
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