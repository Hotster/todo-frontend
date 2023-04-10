import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../api/client";

const initialState = {
    items: [],
    status: "idle",
    error: null,
}

export const getGoals = createAsyncThunk("goals/getGoals", async (_, { rejectWithValue }) => {
    try {
        const response = await client.get("/goals");
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

export const changeGoalStatus = createAsyncThunk("goals/changeStatus", async (data, { rejectWithValue }) => {
    try {
        const csrf = await client.get("/auth/csrf_cookie");
        if (csrf) {
            const response = await client.patch(`goals/${data.id}/`, {
                is_completed: !data.is_completed,
                actual_completion_date: data.is_completed ? null : new Date().toISOString(),
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

export const changeGoalImportance = createAsyncThunk("goals/changeGoalImportance", async (data, { rejectWithValue }) => {
    try {
        const csrf = await client.get("/auth/csrf_cookie");
        if (csrf) {
            const response = await client.patch(`goals/${data.id}/`, {
                is_important: !data.is_important
            });
            return response.data;
        };
    } catch (error) {
        if (!error.response) {
            throw error;
        };
        return rejectWithValue(error.response.data);
    }
})

export const createGoal = createAsyncThunk("goals/createGoal", async (data, { rejectWithValue }) => {
    try {
        const csrf = await client.get("/auth/csrf_cookie");
        if (csrf) {
            const response = await client.post("goals/", {
                title: data.title,
                description: data.description ? data.description : null,
                target_completion_date: data.targetCompletionDate ? data.targetCompletionDate : null,
                planned_progress: data.plannedProgress ? data.plannedProgress : null,
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

const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getGoals.pending, (state, action) => {
            state.status = "loading";
        })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                state.error = null;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.status = "failed";
                state.items = [];
                state.error = action.error.message;
            })
            .addCase(changeGoalStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                const goal = state.items.find(item => item.id === action.payload.id);
                goal.is_completed = action.payload.is_completed;
                goal.actual_completion_date = action.payload.actual_completion_date;
            })
            .addCase(changeGoalImportance.fulfilled, (state, action) => {
                state.status = "succeeded";
                const goal = state.items.find(item => item.id === action.payload.id);
                goal.is_important = action.payload.is_important;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = [action.payload, ...state.items]
            })
    }
})


export const selectGoals = state => state.goals.items;

export const selectGoalsStatus = state => state.goals.status;

export const selectGoalsErrors = state => state.goals.error;

export default goalsSlice.reducer;
