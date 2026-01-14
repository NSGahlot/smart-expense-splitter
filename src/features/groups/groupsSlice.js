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
  },
});

export const { createGroup, setActiveGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
