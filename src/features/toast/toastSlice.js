import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: {
      reducer(state, action) {
        state.toasts.push(action.payload);
      },
      prepare({ message, type = "info", duration = 3000 }) {
        return {
          payload: {
            id: nanoid(),
            message,
            type, // 'success', 'error', 'info', 'warning'
            duration,
            timestamp: Date.now(),
          },
        };
      },
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
