import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../api/client";

const initialState = {
    item: {},
    status: "idle",
    error: null,
};

export const getGoalDetails = createAsyncThunk(
    "goalDetails/getGoalDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await client.get(`goals/${id}/`)
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        };
    });

export const updateGoalDetails = createAsyncThunk(
    "goalDetails/updateGoalDetails",
    async (data, { rejectWithValue, getState }) => {
        const state = getState()

        if (data.mutableFields.is_completed !== state.goalDetails.item.is_completed) {
            if (data.mutableFields.is_completed) {
                data.mutableFields.actual_completion_date = new Date().toISOString();
            } else {
                data.mutableFields.actual_completion_date = null;
            }
        };


        try {
            const csrf = await client.get("/auth/csrf_cookie");
            if (csrf) {
                const response = await client.patch(`goals/${data.id}/`, {
                    ...data.mutableFields
                });
                return response.data;
            };
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        };
    })

const goalDetailsSlice = createSlice({
    name: "goalDetails",
    initialState,
    reducers: {
        resetUserState: (state, action) => {
            state.item = {};
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(getGoalDetails.pending, (state, action) => {
            state.status = "loading";
        })
            .addCase(getGoalDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.item = action.payload;
                state.error = null;
            })
            .addCase(getGoalDetails.rejected, (state, action) => {
                state.status = "failed";
                state.item = {};
                state.error = action.error.message;
            })
            .addCase(updateGoalDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.item = action.payload;
                state.error = null;
            })
    }
});

export const { resetUserState } = goalDetailsSlice.actions;

export const selectGoalDetails = state => state.goalDetails.item;

export default goalDetailsSlice.reducer;
