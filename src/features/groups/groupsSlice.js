import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  activeGroupId: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    createGroup: {
      reducer(state, action) {
        state.groups.push(action.payload);
        state.activeGroupId = action.payload.id;
      },
      prepare({ name, members }) {
        return {
          payload: {
            id: nanoid(),
            name,
            members,
            expenses: [],
          },
        };
      },
    },

    setActiveGroup(state, action) {
      state.activeGroupId = action.payload;
    },

    // 🔥 NEW REDUCER
    addExpense(state, action) {
      const { groupId, expense } = action.payload;

      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.expenses.push({
          id: nanoid(),
          ...expense,
        });
      }
    },
  },
});

export const { createGroup, setActiveGroup, addExpense } = groupsSlice.actions;

export default groupsSlice.reducer;
