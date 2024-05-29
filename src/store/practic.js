import axios from "../composables/axios.js";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const loadPractic = createAsyncThunk(
  'practic/loadPractic',
  async ({page, limit}, thunkAPI) => {
    try{
      const response = await axios.get(`api/v1/practic?page=${page}&limit=8`,{})
      return response.data
    } catch (e){
      return thunkAPI.rejectWithValue({e: e.error.message})
    }
  }
)
export const loadPracticElem = createAsyncThunk(
  'practic/loadPracticElem',
  async({id}, thunkAPI)=>{
    try {
      const res = await axios.get(`api/v1/practic/${id}`,{})
      return res.data
    } catch (e){
      return thunkAPI.rejectWithValue({e: e.error.message})
    }
  }
)

const practicSlice = createSlice({
  name: 'practic',
  initialState: {
    practicData: [],
    practicDataElem: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPractic.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadPractic.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.practicData = action.payload
      })
      .addCase(loadPractic.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload.error
      })
      .addCase(loadPracticElem.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadPracticElem.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.practicDataElem = action.payload
      })
      .addCase(loadPracticElem.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload.error
      })
  }
})

export default practicSlice.reducer
export const {} = practicSlice.actions