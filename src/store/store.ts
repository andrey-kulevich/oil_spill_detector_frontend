import { configureStore } from '@reduxjs/toolkit';
import incidentsReducer from './incidents';
import { useDispatch } from 'react-redux';

const store = configureStore({
	reducer: {
		incidents: incidentsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
	return useDispatch<AppDispatch>();
}

export type RootState = ReturnType<typeof store.getState>;
export default store;
