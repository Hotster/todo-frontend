import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const initialState = {
    item: null,
    error: null,
    status: "idle",
};

export const authenticatedUser = createAsyncThunk("user/authenticatedUser", async () => {
    const response = await client.get("/auth/is_authenticated");
    return response.data;
})

export const loginUser = createAsyncThunk("user/loginUser", async (data, { rejectWithValue }) => {
    const { username, password } = data;

    try {
        const csrf = await client.get("/auth/csrf_cookie")
        if (csrf) {
            const response = await client.post("/auth/login",
                { username: username, password: password });
            return response.data;
        };
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    };
});

export const registerUser = createAsyncThunk("user/registerUser", async (data, { rejectWithValue, dispatch }) => {
    const { username, password, rePassword } = data;

    try {
        const csrf = await client.get("/auth/csrf_cookie");
        if (csrf) {
            const response = await client.post("auth/register",
                { username: username, password: password, re_password: rePassword });
            if (response.data.user) {
                await dispatch(loginUser({ username: username, password: password }));
            };
        };
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data)
    };
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authenticatedUser.pending, (state, action) => {
            state.status = "loading";
        })
            .addCase(authenticatedUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.item = action.payload.user;
                state.error = null;
            })
            .addCase(authenticatedUser.rejected, (state, action) => {
                state.status = "failed";
                state.item = null;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.item = action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.item = null;
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            // .addCase(registerUser.pending, (state, action) => {
            //     state.status = "loading";
            // })
            // .addCase(registerUser.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.error = null;
            // })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.item = null;
                state.error = action.payload ? action.payload : action.error;
            })
    }
});

export const selectUser = state => state.user.item;

export const selectUserStatus = state => state.user.status;

export const selectUserError = state => state.user.error;

export default userSlice.reducer;
