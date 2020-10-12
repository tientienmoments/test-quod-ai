import * as types from "../constants/highlight.constant";

const initialState = {
  highlightedIssues: [],
  currHighlightedIssue: null,
};

const highlightReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_HIGHLIGHT_LIST:
      return {
        ...state,
        highlightedIssues: [payload, ...state.highlightedIssues.slice(0, 4)],
      };
    case types.SET_CURRENT_HIGHLIGHTED_ISSUE:
      return { ...state, currHighlightedIssue: payload };

    default:
      return state;
  }
};

export default highlightReducer;
