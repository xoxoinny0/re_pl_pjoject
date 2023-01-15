import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from "lodash";

/** 모든 테마 데이터를 불러오는 비동기 함수 */
export const getThemeData = createAsyncThunk("ThemeSlice/getThemeData", async (payload, { rejectWithValue }) => {
  let result = null;
  
  try {
    const response = await axios.get("/theme");
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
 
  return result;
});

const ThemeSlice = createSlice({
  name: "ThemeSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    /** 모든 장소 데이터를 불러오는 액션 함수 */
    [getThemeData.pending]: pending,
    [getThemeData.fulfilled]: fulfilled,
    [getThemeData.rejected]: rejected,
  },
});

export default ThemeSlice.reducer;
