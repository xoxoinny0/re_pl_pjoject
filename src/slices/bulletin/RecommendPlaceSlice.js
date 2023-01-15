import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pending, fulfilled, rejected } from '../../helper/ReduxHelper';
import axios from 'axios';

export const getMyReview = createAsyncThunk('RecommendPlaceSlice/getMyReview', async (payload, { rejectWithValue }) => {
    let result = null;

    /**
     * To Do: 지금 여기 data.json의 map 전부 다 불러오는데,
     * 나중에 릴레이션 테이블 만들면 내가 쓴 리뷰 필드 생성해서 거기서 불러와야 함
     */
    try {
        const response = await axios.get(process.env.REACT_APP_MY_REVIEW_PLACE);

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
        
    return result;
});

const RecommendPlaceSlice = createSlice({
    name: 'RecommendPlaceSlice',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {
        getCurrentData: (state, action) => {
            return state;
        }
    },
    extraReducers: {
        /** 추천할 장소(내가 리뷰한) 불러오가 */
        [getMyReview.pending]: pending,
        [getMyReview.fulfilled]: fulfilled,
        [getMyReview.rejected]: rejected,
    }
});

export const { getCurrentData } = RecommendPlaceSlice.actions;
export default RecommendPlaceSlice.reducer;