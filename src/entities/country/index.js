export { 
  default as countryReducer, 
  resetStore, 
  fetchCountry, 
  fetchCountryBorders
 } from './model/countrySlice'

 export { 
  selectData,
  selectStatus,
  selectError,
  selectCountryBorders
 } from './model/selectors'