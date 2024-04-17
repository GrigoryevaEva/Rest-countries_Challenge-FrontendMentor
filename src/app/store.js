import { configureStore } from '@reduxjs/toolkit'
import countriesReducer from '../features/countries/countriesSlice'
import countryReducer from '../features/country/countrySlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    country: countryReducer,
  },
})