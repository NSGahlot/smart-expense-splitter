import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "../features/groups/groupsSlice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
});
