import Api from "../api/CountryApi";

export const loaderCountryPage = ({ params }) => {
  const api = new Api('https://restcountries.com/v3.1')

  const init = async () => {
    let dataCountry = await api.getById(params.countryCode)
    let dataCountryBorders = await api.getListByBorder(dataCountry[0].borders)
    return [dataCountry, dataCountryBorders]
  };

  return init();
}

export const loaderMainPage = () => {

  const init = async () => {
    const api = new Api('https://restcountries.com/v3.1')
    const data = await api.getList()

    return [api, data]
  };
  
  return init();
}
