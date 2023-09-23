import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js'

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
	const { data } = await axios.post('auth/register', params);
	return data;
});

const initialState = {
	data: 'null',
	status: 'loading',
}

const regSlice = createSlice({
	name: 'reg',
	initialState,
	extraReducers: {
		[fetchRegister.pending]: (state, action) => {
			state.status= 'loading';
			state.data = null;
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status= 'loaded';
			state.data = action.payload;
		},
		[fetchRegister.rejected]: (state) => {
			state.status= 'error';
			state.data = null;
		},
		[fetchRegister.pending]: (state, action) => {
			state.status= 'loading';
			state.data = null;
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status= 'loaded';
			state.data = action.payload;
		},
		[fetchRegister.rejected]: (state) => {
			state.status= 'error';
			state.data = null;
		}
	}
})

