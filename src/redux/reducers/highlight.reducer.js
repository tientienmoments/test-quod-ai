import * as types from "../constants/highlight.constant";

const initialState = {
  issues: [],
  selectedIssue: null,
};

const highlightReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default highlightReducer;
