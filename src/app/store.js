import { configureStore } from '@reduxjs/toolkit'
import countriesReducer from '../features/countries/countriesSlice'
import countryReducer from '../features/country/countrySlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    country: countryReducer,
    theme: themeReducer,
  },
})