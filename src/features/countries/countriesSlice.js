import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Api from "../../api/CountryApi";

const api = new Api('https://restcountries.com/v3.1')

export const fetchCountries = createAsyncThunk('countries/FetchCountries', async () => {
  const resp = await api.getList()
  return resp
});

export const fetchRegion = createAsyncThunk('countries/FetchRegion', async (region) => {
  const resp = await api.getListByRegion(region)
  return resp
});

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    resultSearchFilter: null,
    inputBy: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    inputBy(state, action) {
      state.inputBy = action.payload
    },
    searchFilter(state, action) {
      if (action.payload) {
        state.resultSearchFilter = state.countries.filter((c) => {
          let countryName = c.name.common
          return countryName.includes(state.inputBy)
        })
      } else state.resultSearchFilter = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.countries = action.payload
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchRegion.fulfilled, (state, action) => {
        state.countries = action.payload
      })
  },
})

export const getData = state => state.countries.countries

export const { actions, reducer } = countriesSlice

export const { inputBy, searchFilter } = actions

export default countriesSlice.reducer