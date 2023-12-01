import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'
import { pouchDB } from '../../pouchDB/pouch.js'

export const loadDataFromPouchDB = createAsyncThunk('cards/loadDataFromPouchDB', async () => {
	console.log("LoadDataFromPouchDB")
	try {
	  // Здійснюємо завантаження даних з PouchDB
	  const response = await pouchDB.get('pouchstate');
  
	  // Отримані дані з PouchDB
	  const pouchDBData = response.data; // Дані були збережені як поле "data" у об'єкті
	  console.log(pouchDBData);
  
	  // Повертаємо отримані дані з PouchDB
	  return pouchDBData;
	} catch (error) {
	  // Обробка помилок, якщо завантаження не вдалося
	  console.error('Помилка завантаження даних з PouchDB:', error);
	  throw error; // Ви можете кинути помилку, якщо необхідно
	}
  });
  
export const fetchCards = createAsyncThunk('cards/FetchCards', async () => {
	const { data } = await axios.get('/cards')	
	console.log("Данні з бекенда завантажуються в стейт")
	console.log(data)
	return data;
})

export const fetchRemoveCard = createAsyncThunk('cards/fetchRemoveCard', async(id) => {
	axios.delete(`/cards/${id}`);
})

const initialState = {
	cards: {
		items: [],
		status: 'loading',
	},
	total: 0,
}

export const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		updateCards: (state, action) => {
			state.cards.items = action.payload;
		},
		updateCard: (state, action) => {
			const updatedCard = action.payload; 
			// Знайдіть індекс картки, яку потрібно оновити в стані
			const cardIndex = state.cards.items.findIndex((card) => card._id === updatedCard._id);
			if (cardIndex !== -1) {
			  // Оновіть дані картки
			  state.cards.items[cardIndex] = updatedCard;
			}
		  },
		updateTotal(state, action) {
			state.total = action.payload;
		  },
	},
	extraReducers: {
		[loadDataFromPouchDB.fulfilled]: (state, action) => {
			// Оновлення поля pouchDBData з отриманими даними з PouchDB
			console.log(action.payload)
			state.cards.items = action.payload;
		  },
		// додавання карток
		[fetchCards.pending]: (state, action) => {
			state.cards.items = [];
			state.cards.status = 'loading';
		},
		[fetchCards.fulfilled]: (state, action) => {
			state.cards.items = action.payload;
			console.log(action.payload)
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