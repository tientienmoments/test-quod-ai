import { combineReducers } from "redux";
import highlightReducer from "./highlight.reducer";

export default combineReducers({
  highlight: highlightReducer,
});
