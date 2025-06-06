import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "../../services/AuthServices";

// kullanıcı kayıt işlemi
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
// Kullanıcı Giriş İşlemi
export const submitLogin = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await login(data);
    return response;
  } catch (error) {
    return console.log(error);
  }
});

const initialState = {
  user: null,
  login: null,
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
      })
      .addCase(submitLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
      })
      .addCase(submitLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
