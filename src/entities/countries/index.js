export { 
  default as countriesReducer, 
  inputBy, 
  searchFilter, 
  fetchCountries, 
  fetchRegion
 } from './model/countriesSlice'

 export { 
  selectData,
  selectStatus,
  selectError,
  selectResultSearchFilter,
  selectInputBy
 } from './model/selectors'