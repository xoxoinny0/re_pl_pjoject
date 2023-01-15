import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from "lodash";

/** 모든 장소 데이터를 불러오는 비동기 함수 */
export const getMapData = createAsyncThunk("MapSlice/getMapData", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get("/map");
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

/** 장소 저장을 위한 비동기 함수 */
export const postLoc = createAsyncThunk("MapSlice/postLoc", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.post("/map", {
      address_name: payload.location.address_name,
      category_group_code: payload.location.category_group_code,
      category_name: payload.location.category_name,
      category_group_name: payload.location.category_group_name,
      category_item_name: payload.location.category_name.split(">").reverse()[0].trim(),
      phone: payload.location.phone,
      place_name: payload.location.place_name,
      place_url: payload.location.place_url,
      place_id: payload.location.id,
      road_address_name: payload.location.road_address_name,
      lat: +payload.location.y,
      lng: +payload.location.x,
      theme: [payload.theme],
      review: [],
      place_img: [],
      like: 0,
      rating: [],
    });
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

/** 한 장소의 리뷰 또는 테마 수정을 위한 비동기 함수 */
export const putLoc = createAsyncThunk("MapSlice/putLoc", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    // 기존 데이터를 불러온후 데이터를 추가함
    const response1 = await axios.get("/map/" + payload.index);
    result = response1.data;
    console.log(result);
    console.log(result.theme);
    console.log(payload.theme);
    result.theme.push(+payload.theme);
    console.log(result);

    // 데이터 수정
    const response = await axios.put("/map/" + payload.index, result);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  console.log(result);
  return result;
});

/** 장소 데이터 삭제를 위한 비동기 함수 */
export const deleteLoc = createAsyncThunk("MapSlice/deleteLoc", async (payload, { rejectWithValue }) => {
  let result = null;

  const URL = "/map/" + payload.index;

  try {
    console.log(URL);
    const response = await axios.delete(URL);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const MapSlice = createSlice({
  name: "MapSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    /** 모든 장소 데이터를 불러오는 액션 함수 */
    [getMapData.pending]: pending,
    [getMapData.fulfilled]: fulfilled,
    [getMapData.rejected]: rejected,

    /** 장소 저장을 위한 액션 함수 */
    [postLoc.pending]: pending,
    [postLoc.fulfilled]: (state, { meta, payload }) => {
      // 기존의 상태값을 복사한다. (원본이 JSON이므로 깊은 복사를 수행해야 한다.)
      const data = cloneDeep(state.data);
      // console.log(data);

      // 새로 저장된 결과를 기존 상태값 배열의 맨 뒤에 추가한다.
      data.push(payload);

      return {
        data: data,
        loading: false,
        error: null,
      };
    },
    [postLoc.rejected]: rejected,

    /** 한 장소의 리뷰 또는 테마 수정을 위한 액션 함수 */
    [putLoc.pending]: pending,
    [putLoc.fulfilled]: (state, { meta, payload }) => {
      console.log(state);
      const data = cloneDeep(state.data);

      const targetId = data.findIndex((v, i) => v.id == meta.arg.id);
      console.log(targetId);

      data.splice(targetId, 1, payload);

      return {
        data: data,
        loading: false,
        error: null,
      };
    },
    [putLoc.rejected]: rejected,
    /** 데이터 삭제를 위한 액션 함수 */
    [deleteLoc.pending]: pending,
    [deleteLoc.fulfilled]: (state, { meta, payload }) => {
      // 기존의 상태값을 복사한다. (원본이 JSON 이므로 깊은 복사를 수행해야 한다.)
      const data = cloneDeep(state.data);

      // id값이 일치하는 항목의 배열 인덱스를 찾는다.
      const targetId = data.findIndex((v, i) => v.id == meta.arg.id);
      console.log(targetId);

      // 해당 인덱스의 원소를 삭제한다.
      data.splice(targetId, 1);

      return {
        data: data,
        loading: false,
        error: null,
      };
    },
    [deleteLoc.rejected]: rejected,
  },
});

export default MapSlice.reducer;
