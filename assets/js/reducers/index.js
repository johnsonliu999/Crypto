import { createStore, combineReducers, applyMiddleware } from 'redux';
import deepFreeze from 'deep-freeze';
import reduxThunk from 'redux-thunk';

import authReducer from './authReducer';

function root_reducer(state0, action) {
  let reducer = combineReducers({authReducer});
  let state1 = reducer(state0, action);
  return deepFreeze(state1);
};

let store = createStore(root_reducer, {}, applyMiddleware(reduxThunk));
export default store;
