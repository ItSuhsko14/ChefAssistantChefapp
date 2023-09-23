
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCards = createAsyncThunk('cards/FetchCards', async () => {
	const { data } = await axios.get('/cards')	
	return data;
})

export const fetchRemoveCard = createAsyncThunk('cards/fetchRemoveCard', async(id) => {
	axios.delete(`/cards/${id}`);
})

const initialState = {
	cards: {
		items: [],
		status: 'loading',
	}
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducer: {
		// addItems: (state, action) => {
		// 	const items = 
		// }
	},
	extraReducers: {
		// додавання карток
		[fetchCards.pending]: (state, action) => {
			state.cards.items = [];
			state.cards.status = 'loading';
		},
		[fetchCards.fulfilled]: (state, action) => {
			state.cards.items = action.payload;
			state.cards.status = 'loaded';
		},
		[fetchCards]: (state) => {
			state.cards.items = [];
			state.cards.status = 'error';
		},
		// видалення карток
		[fetchRemoveCard.pending]: (state, action) => {
			state.cards.items = state.cards.items.filter(obj => obj._id !== action.meta.arg);
	
		},
		
	}
})

export const cardReducer = cardsSlice.reducer;