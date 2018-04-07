import { createStore, combineReducers } from 'redux';

const reducer = (state = {
  search: '',
  error: null
}, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      state = {
        ...state,
        search: action.payload
      };
      break;
    case 'SHOW_ERROR':
      state = {
        ...state,
        error: action.payload
      }
  }
  return state
};

const store = createStore(
  combineReducers({ reducer: reducer }),
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
