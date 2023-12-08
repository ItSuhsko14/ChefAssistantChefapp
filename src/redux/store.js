import { configureStore } from '@reduxjs/toolkit';
import { cardReducer } from './slices/cards.js';
import { authReducer } from './slices/auth.js';
import { saveStateToPouchDB } from './../pouchDB/pouch.js';
	
const store = configureStore({
	reducer: {
		cards: cardReducer,
		auth: authReducer,
	},
	// middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(saveStateToPouchDB),
})

export default store;