// store/reducers.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  // 定义您的应用状态
  // counter: number;
}

const initialState: AppState = {
  // 初始化您的应用状态
  counter: 0,
  user: {}
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // 在这里定义您的 Reducer
    increment: (state: any, action: PayloadAction<number>) => { 
      state.counter += action.payload;
    },
    setUser: (state: any, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  },
});

export const { increment, setUser } = appSlice.actions;

export default appSlice.reducer;
