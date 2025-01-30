import { createSlice } from "@reduxjs/toolkit";

interface ConfigSliceState {
    remoteUrl: string
}

const initialState: ConfigSliceState = {
    remoteUrl: "https://happ.kkennib.net"
    // remoteUrl: "http://localhost:8080"
}

const configSlice = createSlice({
    name: 'configSlice',
    initialState,
    reducers: {}
});

// export const { } = configSlice.actions;
export default configSlice.reducer;