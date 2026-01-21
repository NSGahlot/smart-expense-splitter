import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "../features/groups/groupsSlice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    groups: store.getState().groups,
  });
});
