import { Link, useLoaderData } from 'react-router-dom';

const CountryPage = () => {
  const notFindBorders = <p key={'notFound'}>Is not Border Countries</p>

  const [dataCountry, dataCountryBorders] = useLoaderData()

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
  
  return (
    <main>
      <div className="container">
      <Link to={`/`}>Back</Link>
        {dataCountry.map((item) => (
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
                {dataCountryBorders.map((b) => {
                  if (typeof b === 'string') {
                    return notFindBorders
                  } else {
                    return <Link to={`/${b.cca3}`} key={b.cca3}>{b.name.common} </Link>
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default CountryPage;