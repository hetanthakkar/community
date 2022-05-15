import { createStore } from "redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import themeReducer from "../reducers/theme";
import userReducer from "../reducers/addUserInfo";
const mainReducer = combineReducers({
  form: formReducer,
  themeReducer,
  userReducer,
});

const store = createStore(mainReducer);
export default store;
