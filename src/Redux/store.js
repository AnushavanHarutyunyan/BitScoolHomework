import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers/todoReducer';
import globalReducer from './reducers/globalReducer';
import singleTaskReducer from './reducers/singleTaskReducer';
import contactReducer from './reducers/contactReducer';
const reducer = combineReducers({
    todoState: todoReducer,
    globalState: globalReducer,
    singleTaskState: singleTaskReducer,
    contactState: contactReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));
window.store = store;

export default store;
