import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import todoReducer from './reducers/todoReducer';
import globalReducer from './reducers/globalReducer';
import singleTaskReducer from './reducers/singleTaskReducer';
import contactReducer from './reducers/contactReducer';
import searchReducer from './reducers/searchReducer';

const reducer = combineReducers({
    todoState: todoReducer,
    globalState: globalReducer,
    singleTaskState: singleTaskReducer,
    contactState: contactReducer,
    searchState: searchReducer,
});
const middlewares = [thunk, logger];
const store = createStore(reducer, applyMiddleware(...middlewares));
window.store = store;

export default store;
