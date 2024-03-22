import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchCountries, fetchRegion, getData, searchFilter, inputBy } from "../features/countries/countriesSlice";
import { useUpdateEffect } from "../hooks/useUpdateEffect";
import { resetStore } from "../features/country/countrySlice";

const MainPage = () => {
  const dispatch = useDispatch()

  const data = useSelector(getData)
  const searchData = useSelector(state => state.countries.resultSearchFilter)
  const countriesStatus = useSelector(state => state.countries.status)
  const inputValue = useSelector(state => state.countries.inputBy)
  const error = useSelector(state => state.countries.error)
  
  const [region, setRegion] = useState('all');
  const [tmpInputValue, setTmpValueInput] = useState('');

  useEffect(() => {
    dispatch(resetStore())
  }, [])

  useEffect(() => {
    if (countriesStatus === 'idle') {
      dispatch(fetchCountries())
    }
  }, [countriesStatus, dispatch])

  useUpdateEffect(() => {
    if (region !== 'all') {
      dispatch(fetchRegion(region))
    } else {
      dispatch(fetchCountries())
    }
    if (inputValue) dispatch(inputBy(''))
  }, [region])

  useUpdateEffect(() => {
    if (inputValue) {
      dispatch(searchFilter(true))
    } else {
      dispatch(searchFilter(false))
    }
  }, [inputValue])

  const showData = () => {
    if (searchData) {
      return searchData
    } else {
      return data
    }
  }

  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  }

  const handleInputChange = (event) => {
    setTmpValueInput(event.target.value);
  }

  const handelSubmit = (event) => {
    event.preventDefault();

    dispatch(inputBy(ucFirst(tmpInputValue)))
  }

  const handelKeyDown = (event) => {
    if (event.key === 'Enter') {
      return true
    }
  }

  const convertPopulation = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  function ucFirst(str) {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }

  let content

  if (countriesStatus === 'loading') {

    content = <p>Loading...</p>

  } else if (countriesStatus === 'succeeded') {

    content = showData().map((item) => (
      <Link 
      className="country-list__country" 
      key={item.cca3}
      to={`/${item.cca3}`}>
      
        <div>
          <img src={item.flags.png} alt=""></img>
        </div>

        <div>
          <h2>{item.name.common}</h2>
          <p>Population: {convertPopulation(item.population)}</p>
          <p>Region: {item.region}</p>
          <p>Capital: {item.capital}</p>
        </div>
      </Link>
    ))

  } else if (countriesStatus === 'failed') {

    content = <p>{error}</p>

  }

  return (
    <main>
      <div className="container">
        <form className="navigation-country" onSubmit={handelSubmit}>

          <input key={region} onChange={handleInputChange} onKeyDown={handelKeyDown} className="navigation-country__search" type="text" placeholder="Search for a country..."></input>

          <select onChange={handleChangeRegion} className="navigation-country__filter" name="regions" id="filter-by-region">
            <option value="all">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </form>
        
        <div className="country-list">
          {content}
        </div>
      </div>
    </main>
  );
}

export default MainPage;