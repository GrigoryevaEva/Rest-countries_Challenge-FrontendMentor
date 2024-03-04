import { useState, useEffect } from "react";
import { Link, useLoaderData } from 'react-router-dom';

const MainPage = () => {
  const [api, data] = useLoaderData()

  const [dataPage, setDataPage] = useState(data);
  const [currentDataRegion, setCurrentDataRegion] = useState(dataPage);

  const [region, setRegion] = useState('Filter by Region');
  const [tmpValueInput, setTmpValueInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  useEffect(() => {
    if (region != 'Filter by Region') {
      const initData = async () => {
        let resp = await api.getListByRegion(region)
        setDataPage(resp)
        setCurrentDataRegion(resp)
      };
      initData();
    } else {
      setDataPage(data)
      setCurrentDataRegion(dataPage)
    }
  }, [region])

  useEffect(() => {
    if (valueInput) {
      let countries = dataPage.filter((country) => {
        let countryName = country.name.common
        return countryName.includes(valueInput)
      })
      setDataPage(countries)
    }
  }, [valueInput])

  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  }

  const handleInputChange = (event) => {
    setTmpValueInput(event.target.value);
  }

  const handelSubmit = (event) => {
    event.preventDefault();

    setDataPage(currentDataRegion)
    setValueInput(ucFirst(tmpValueInput))
  }

  const handelKeyDown = (event) => {
    if (event.key === 'Enter') {
      return true
    }
  }

  const convertPopulation = (num) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(num)
  }

  function ucFirst(str) {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <main>
      <div className="container">
        <form className="navigation-country" onSubmit={handelSubmit}>

          <input key={region} onChange={handleInputChange} onKeyDown={handelKeyDown} className="navigation-country__search" type="text" placeholder="Search for a country..."></input>
          <button>Yes</button>

          <select onChange={handleChangeRegion} className="navigation-country__filter" name="regions" id="filter-by-region">
            <option value="Filter by Region">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </form>
        
        <div className="country-list">
          {dataPage.map((item) => (
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
          ))}
        </div>
      </div>
    </main>
  );
}

export default MainPage;