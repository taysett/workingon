import { createStore, combineReducers } from 'redux';
import todoReducer from "./reducers/todoList";
import storeLib from 'store';
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    todo: todoReducer
});

const persistedState = storeLib.get('todoState') ? { todo: storeLib.get('todoState') } : undefined;

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools()
);

store.subscribe(() => {
    const state = store.getState().todo;
    storeLib.set('todoState', state);
});

export default store;