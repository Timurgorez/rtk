import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType, AppThunkType } from '../../app/store';

export enum StatusEnum {
  idle = 'idle', 
  loading = 'loading',
  failed = 'failed',
}

type StatusType = keyof typeof StatusEnum;

export interface CounterState {
  value: number;
  status: StatusType;
}

const initialState: CounterState = {
  value: 0,
  status: StatusEnum.idle,
};

function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 1000)
  );
}

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const incrementIfOdd =
  (amount: number): AppThunkType =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }else{
      alert('Not Odd');
    }
  };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = StatusEnum.loading;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = StatusEnum.idle;
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = StatusEnum.failed;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootStateType) => state.counter.value;
export const selectStatus = (state: RootStateType) => state.counter.status;

export default counterSlice.reducer;
