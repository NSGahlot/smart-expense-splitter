import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  activeGroupId: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    // Create new group
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

    // Set active group
    setActiveGroup(state, action) {
      state.activeGroupId = action.payload;
    },

    // Add expense
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

    // Delete expense
    deleteExpense(state, action) {
      const { groupId, expenseId } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);

      if (group) {
        group.expenses = group.expenses.filter((e) => e.id !== expenseId);
      }
    },

    // Reset all data
    resetAll(state) {
      state.groups = [];
      state.activeGroupId = null;
    },
  },
});

export const {
  createGroup,
  setActiveGroup,
  addExpense,
  deleteExpense,
  resetAll,
} = groupsSlice.actions;

export default groupsSlice.reducer;
