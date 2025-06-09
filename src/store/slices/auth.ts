import { api } from '@/configs';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface Data {
  id: string;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  data?: Data | null;
}

// Initial State
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  data: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true,
      });
      const user = response.data.data.user;
      localStorage.setItem('cc_token', response.data.data.token); // Store token
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'An error occured, please try again');
    }
  }
);

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (credentials: { email: string; name: string; password: string; confirm_password: string }, thunkAPI) => {
    try {
      const response = await api.post('/auth/signup', credentials, {
        withCredentials: true,
      });
      const user = response.data.data.user;
      localStorage.setItem('cc_token', response.data.data.token); // Store token
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'An error occured, please try again');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (credentials: { email: string; }, thunkAPI) => {
    try {
      const response = await api.post('/auth/forgot-password', credentials, {
        withCredentials: true,
      });
      const data = response.data.data;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'An error occured, please try again');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (credentials: { password: string; confirm_password: string; token: string }, thunkAPI) => {
    try {
      const response = await api.post('/auth/reset-password', credentials, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      });
      const data = response.data.data;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'An error occured, please try again');
    }
  }
);



// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('cc_token'); // remove token

      // 
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occured, please try again';
      })

      //Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occured, please try again';
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occured, please try again';
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occured, please try again';
      })


  },
});

// Exports
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
