import axios from "../composables/axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useLocation} from "react-router-dom";
export const loadSiteContent = createAsyncThunk(
  'site/loadSiteContent',
  async ({page_name}, thunkAPI) => {
    try {
      const res = await axios.get(`api/v1/page/${page_name}`)
      return res.data
    } catch (e) {
      return thunkAPI.rejectWithValue({e: e.error.message})
    }
  }
)

export const uploadApplication = createAsyncThunk(
  'applications/upload',
  async ({phone, description, fio}, thunkAPI) => {
    try {
      const res = await axios.post(`api/v1/applications`, {phone, description, fio}, {})
      return res.data
    } catch (e) {
      return thunkAPI.rejectWithValue({e: e.error.message})
    }
  }
)

const siteSlice = createSlice({
    name: 'site',
    initialState: {
      lang: localStorage.getItem('lang'),
      siteData: {
        id: null,
        page: '',
        title: [],
        subtitle: [],
        toc: [],
        about: [],
        why_are_we: [],
        few_words: [],
        phone: '',
      },
      newSlides: [{
        title: [],
        subtitle: [],
        toc: []
      }],
      keys: {},
      status: null,
      error: null
    },
    reducers: {
      restructureData: (state, action) => {
        const titleKeys = Object.keys(state.siteData.title)
        state.keys = [...titleKeys]
        state.newSlides = []
        state.keys.forEach(index => {
          const slide = {}
          if (state.siteData.title[index]) {
            slide.title = state.siteData.title[index]
          }
          if (state.siteData.subtitle[index]) {
            slide.subtitle = state.siteData.subtitle[index]
          }
          if (state.siteData.toc[index]) {
            slide.toc = state.siteData.toc[index]
          }
          state.newSlides.push(slide)
        })
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadSiteContent.pending, (state) => {
          state.status = 'loading'
          state.error = null
        })
        .addCase(loadSiteContent.fulfilled, (state, action) => {
          state.status = 'fulfilled'
          state.siteData = action.payload
        })
        .addCase(loadSiteContent.rejected, (state, action) => {
          state.status = 'rejected'
        })
        .addCase(uploadApplication.pending, (state) => {
          state.status = 'loading'
          state.error = null
        })
        .addCase(uploadApplication.fulfilled, (state, action) => {
          state.status = 'fulfilled'
          state.error = null
        })
        .addCase(uploadApplication.rejected, (state) => {
          state.status = 'rejected'
        })
    }
  }
)

export default siteSlice.reducer

export const {restructureData} = siteSlice.actions