import axios from "../composables/axios.js";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const loadTeams = createAsyncThunk(
  'teams/loadTeams',
  async ({page, limit}, thunkAPI) => {
    try{
      const response = await axios.get(`api/v1/team?page=${page}&limit=8`)
      return response.data
    } catch (e){
      return thunkAPI.rejectWithValue({e: e.message})
    }
  }
)
const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    teamData: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers:(builder)=> {
    builder
    .addCase(loadTeams.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
      .addCase(loadTeams.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.teamData = action.payload;
      })
      .addCase(loadTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  }
})

export default teamSlice.reducer
export const {} = teamSlice.actions