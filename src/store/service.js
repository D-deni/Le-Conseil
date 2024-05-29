import axios from "../composables/axios.js";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const loadService = createAsyncThunk(
  'service/loadService',
  async ({page, limit}, thunkAPI) => {
    try {
      const res = await axios.get(`api/v1/service?page=${page}&limit=10`)
      return res.data
    } catch (e) {
      return thunkAPI.rejectWithValue({e: e.error.message})
    }
  }
)

export const loadServiceElem = createAsyncThunk(
  'service/loadServiceElem',
  async ({id, page, limit}, thunkAPI) => {
    try {
      const res = await axios.get(`api/v1/service/${id}`)
      return res.data
    } catch (e) {
      return thunkAPI.rejectWithValue({e: e.error.message})
    }
  }
)

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    serviceData: [],
    serviceDataElem: [],
    typeService: 'physical',
    status: null,
    error: null,
  },
  reducers: {
    setTypeService: (state, action) => {
      state.typeService = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadService.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadService.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.serviceData = action.payload
      })
      .addCase(loadService.rejected, (state) => {
        state.status = 'rejected'
      })

      .addCase(loadServiceElem.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadServiceElem.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.serviceDataElem = action.payload
      })
      .addCase(loadServiceElem.rejected, (state) => {
        state.status = 'rejected'
      })
  }
})

export default serviceSlice.reducer
export const {setTypeService} = serviceSlice.actions