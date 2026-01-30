import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "../features/groups/groupsSlice";
import toastReducer from "../features/toast/toastSlice";
import themeReducer from "../features/theme/themeSlice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    toast: toastReducer,
    theme: themeReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    groups: store.getState().groups,
  });
});
