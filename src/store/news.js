import axios from "../composables/axios.js";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


export const loadNews = createAsyncThunk(
  'news/loadNews',
  async ({page, limit}, thunkAPI) => {
    try {
      const response = await axios.get(`api/v1/news?page=${page}&limit=8`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue({e: e.error.message})
    }
  }
)

export const loadNewsElem = createAsyncThunk(
  'news/loadNewsElem',
  async ({id}, thunkAPI) => {
    try {
      const response = await axios.get(`api/v1/news/${id}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue({e: e.error.message})
    }
  }
)


const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsData: [],
    newsDataElem: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNews.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadNews.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.newsData = action.payload
      })
      .addCase(loadNews.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload.error
      })
      .addCase(loadNewsElem.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadNewsElem.fulfilled, (state, action)=> {
        state.status = 'fulfilled'
        state.newsDataElem = action.payload
      })
      .addCase(loadNewsElem.rejected, (state, action)=> {
        state.status = 'rejected'
        state.error = action.payload.error
      })
  }
})

export default newsSlice.reducer
export const {} = newsSlice.actions