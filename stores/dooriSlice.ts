import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DooriState {
    value: string;
}

const initialState: DooriState = {
    value: "",
}

const dooriSlice = createSlice({
    name: 'doori',
    initialState,
    reducers: {
        setOne: (state) => {
            state.value = "One";
        },
        setTwo: (state) => {
            state.value = "Two";
        }
    }
});

export const { setOne, setTwo } = dooriSlice.actions;
export default dooriSlice.reducer;