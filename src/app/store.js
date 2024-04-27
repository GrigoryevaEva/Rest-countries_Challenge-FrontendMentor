import { configureStore } from '@reduxjs/toolkit'

import { countriesReducer } from '../entities/countries/index'
import { countryReducer } from '../entities/country/index'
import { themeReducer } from '../entities/theme/index'

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    country: countryReducer,
    theme: themeReducer,
  },
})