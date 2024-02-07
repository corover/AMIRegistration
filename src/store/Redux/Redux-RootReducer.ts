import { combineReducers } from "redux";
import apiReducer from "../Redux-Reducer/ApiReducer";
import userProfileReducer from "../Redux-Reducer/UserReducer";
import reducer_ from "../Redux-Reducer/Reducer";
import flowReducer from "../Redux-Reducer/FlowReducer";

const rootReducer = combineReducers({
  apiReducer: apiReducer,
  userProfileReducer: userProfileReducer,
  reducer: reducer_,
  flowReducer: flowReducer,
});

export default rootReducer;
