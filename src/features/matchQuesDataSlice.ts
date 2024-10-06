import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MatchingDataState = {
  option: string;
  connections: { [key: string]: string };
};

interface OptionPayload {
  option?: string;
  connections?: { [key: string]: string };
  targetId: string;
}

const initialState: MatchingDataState = {
  option: "",
  connections: {},
};

const matchQuesDataSlice = createSlice({
  name: "matchQuesData",
  initialState,
  reducers: {
    clearConnections: (state: MatchingDataState) => {
      state.connections = {};
      state.option = "";
    },
    handleConnect: (state: MatchingDataState, action: PayloadAction<OptionPayload>) => {
      const targetId = action.payload.targetId;
      const updatedConnections = { ...state.connections };
      // const updatedAnsConnections = { ...state.answerConnections };
      if (state.option) {
        // if targetted answer already matched by other option
        if (Object.values(updatedConnections).indexOf(targetId) > -1) {
          // const previousOption = state.answerConnections[targetId];
          const optionToBeDeleted = Object.keys(updatedConnections).find(
            (key) => updatedConnections[key] === targetId
          );
          optionToBeDeleted && delete updatedConnections[optionToBeDeleted];
        }
        const newConnections = {
          ...updatedConnections,
          [state.option]: targetId,
        };
        state.connections = newConnections;
        state.option = ""; // Reset the selected option after connection
      }
    },
    updateOption: (state: MatchingDataState, action: PayloadAction<OptionPayload>) => {
      const { targetId } = action.payload;
      state.option = targetId;
    },
  },
});

export const { clearConnections, updateOption, handleConnect } = matchQuesDataSlice.actions;
export default matchQuesDataSlice.reducer;
