import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProject } from "../../services/ProjectServices";

// kullanıcı kayıt işlemi
export const submitAddProject = createAsyncThunk(
  "project/submitAddProject",
  async (projectInfo, thunkAPI) => {
    try {
      const response = await addProject(projectInfo);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  project: [],
  loading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitAddProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAddProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(submitAddProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
