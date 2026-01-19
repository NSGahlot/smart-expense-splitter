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

    addExpense(state, action) {
      const { groupId, expense } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.expenses.push({ id: nanoid(), ...expense });
      }
    },

    deleteExpense(state, action) {
      const { groupId, expenseId } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) {
        group.expenses = group.expenses.filter((e) => e.id !== expenseId);
      }
    },

    renameGroup(state, action) {
      const { groupId, newName } = action.payload;
      const group = state.groups.find((g) => g.id === groupId);
      if (group) group.name = newName;
    },

    deleteGroup(state, action) {
      const groupId = action.payload;
      state.groups = state.groups.filter((g) => g.id !== groupId);
      if (state.activeGroupId === groupId) {
        state.activeGroupId = null;
      }
    },

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
  renameGroup,
  deleteGroup,
  resetAll,
} = groupsSlice.actions;

export default groupsSlice.reducer;
