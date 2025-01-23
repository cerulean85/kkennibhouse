import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice';
import dooriReducer from './dooriSlice';
import openedDetailViewReducer from './openedDetailView'
import currentMenuReducer from './currentMenuSlice'
import configReducer from './configSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        doori: dooriReducer,
        openedDetailView: openedDetailViewReducer,
        currentMenu: currentMenuReducer,
        config: configReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;