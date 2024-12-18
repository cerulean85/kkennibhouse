import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice';
import dooriReducer from './dooriSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        doori: dooriReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;