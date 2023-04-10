import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import goalsReducer from "./goalsSlice";
import goalDetailsReducer from "./goalDetailsSlice";
import foldersReducer from "./foldersSlice";
import burgerReducer from "./burgerSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        goals: goalsReducer,
        goalDetails: goalDetailsReducer,
        burger: burgerReducer,
        folders: foldersReducer,
    }
});
