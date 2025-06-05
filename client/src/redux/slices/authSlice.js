import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../services/AuthServices";

// Async thunk: kullanıcı kayıt işlemi
export const submitAuthInfo = createAsyncThunk(
  "auth/submitAuthInfo",
  async (registerInfo, thunkAPI) => {
    try {
      const response = await register(registerInfo);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitAuthInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAuthInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(submitAuthInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
