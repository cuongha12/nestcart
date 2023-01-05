import { combineReducers } from "redux";
import UserReducer from "./user";

const allReducer = combineReducers({
    user: UserReducer,
})

export default allReducer;