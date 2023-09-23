import { configureStore } from '@reduxjs/toolkit';
import { cardReducer } from './slices/cards.js';
import { authReducer } from './slices/auth.js';
import todoReducer from '../pages/todo/todoSlicer.js';

const store = configureStore({
	reducer: {
		todo: todoReducer,
		cards: cardReducer,
		auth: authReducer,
	}
})

export default store;