import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: true
}

const burgerSlice = createSlice({
    name: "burger",
    initialState,
    reducers: {
        changeState: (state) => {
            state.active = !state.active;
        },
    }
})

export const { changeState } = burgerSlice.actions;

export const selectBurger = state => state.burger.active;

export default burgerSlice.reducer;
