import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../api/client";

const initialState = {
    items: [],
    status: "idle",
    error: null,
}

export const getFolders = createAsyncThunk("folders/getFolders", async (_, { rejectWithValue }) => {
    try {
        const response = await client.get("/folders");
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

export const createFolder = createAsyncThunk("folders/createFolder", async (data, { rejectWithValue }) => {
    try {
        const csrf = await client.get("/auth/csrf_cookie");
        if (csrf) {
            const response = await client.post("/folders/", {
                name: data.name
            });
            return response.data;
        };
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

const foldersSlice = createSlice({
    name: "folders",
    initialState,
    reducers: {
        sortFolders: (state, action) => {
            state.items = state.items.sort
        }
    },
    extraReducers: builder => {
        builder.addCase(getFolders.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
            state.error = null;
        })
        .addCase(createFolder.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = [action.payload, ...state.items]
            state.error = null;
        })
    }
})

export const selectFolders = state => state.folders.items;

export default foldersSlice.reducer;
