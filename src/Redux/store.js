import { createStore } from 'redux';
const initialState = {
    counter: 0,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'plus': {
            return {
                ...state,
                counter: state.counter + 1,
            };
        }
        default:
            return state;
    }
};

const store = createStore(reducer);
window.store = store;

export default store;
