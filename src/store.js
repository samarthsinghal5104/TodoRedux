import { createStore, combineReducers, applyMiddleware } from "redux";
import { tasks } from "./todos/reducers";

//import for persistent store
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

//import redux thunk
import thunk from "redux-thunk";

//import devtools extension
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = {
  todos: tasks,
};

//persistent state config
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

//before using persistent store
//export const configureStore = () => createStore(rootReducer);

export const configureStore = () =>
  createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
