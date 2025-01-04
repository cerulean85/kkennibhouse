import { createSlice } from "@reduxjs/toolkit";

interface CurrentMenuState {
    value: string,
    menu: string
}

const initialState: CurrentMenuState = {
    value: "",
    menu: ""
}

const currentMenuSlice = createSlice({
    name: 'currentMenu',
    initialState,
    reducers: {
        setMenu: (state, action) => { state.menu = action.payload; }
    }
});

export const { setMenu } = currentMenuSlice.actions;
export default currentMenuSlice.reducer;