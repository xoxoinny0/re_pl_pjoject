import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pending, fulfilled, rejected } from '../../helper/ReduxHelper';
import axios from 'axios';

export const getTags = createAsyncThunk('HashtagSlice/getTags', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(process.env.REACT_APP_WHOLE_TAGS);

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    
    return result;
});

const HashtagSlice = createSlice({
    name: 'HashtagSlice',
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
        /** 태그 가져오기 */
        [getTags.pending]: pending,
        [getTags.fulfilled]: fulfilled,
        [getTags.rejected]: rejected,
    }
});

export const { getCurrentData } = HashtagSlice.actions;
export default HashtagSlice.reducer;