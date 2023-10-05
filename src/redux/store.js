import { configureStore } from '@reduxjs/toolkit';
import { cardReducer } from './slices/cards.js';
import { authReducer } from './slices/auth.js';


const store = configureStore({
	reducer: {
		cards: cardReducer,
		auth: authReducer,
	}
})

export default store;