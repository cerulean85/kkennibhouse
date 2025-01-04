import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OpenedDetailViewState {
    value: boolean;
    title: string;
    contents: string;
    cover: string;
}

const initialState: OpenedDetailViewState = {
    value: false,
    title: '',
    contents: '',
    cover: ''
}

const openedDetailViewSlice = createSlice({
    name: 'openedDetailView',
    initialState,
    reducers: {
        open: (state, data: PayloadAction<{
            title: string, contents: string, cover: string
        }>) => {            
            state.value = true;
            state.title = data.payload['title'];
            state.contents = data.payload['contents'];
            state.cover = data.payload['cover'];
        },
        close: (state) => {
            state.value = false;
            state.title = '';
            state.contents = '';
            state.cover = '';
        },
    }
});

export const { open, close } = openedDetailViewSlice.actions;
export default openedDetailViewSlice.reducer;