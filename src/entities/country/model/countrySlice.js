import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Api from "../../../shared/api/CountryApi";

const api = new Api('https://restcountries.com/v3.1')

export const fetchCountry = createAsyncThunk('country/FetchCountry', async (countryCode) => {
  const resp = await api.getById(countryCode)
  return resp
});

export const fetchCountryBorders = createAsyncThunk('country/FetchCountryBorders', async (country) => {
  const listBorderCountryCode = country[0].borders
  const resp = await api.getListByBorder(listBorderCountryCode)
  return resp
});

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    country: [],
    countryBorders: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetStore(state, action) {
      state.country = []
      state.countryBorders = []
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchCountry.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchCountry.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.country = action.payload
    })
    .addCase(fetchCountry.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    .addCase(fetchCountryBorders.fulfilled, (state, action) => {
      state.countryBorders = action.payload
    })
  },
})

export const { actions, reducer } = countrySlice

export const { resetStore } = actions

export default countrySlice.reducer