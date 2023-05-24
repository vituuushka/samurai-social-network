import { applyMiddleware, combineReducers, createStore } from "redux";
import dialogsPageReducer from "./dialogsPage-reducer";
import profilePageReducer from "./profilePage-reducer";
import sidebarPageReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";


let reducers = combineReducers ({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebarPage: sidebarPageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;