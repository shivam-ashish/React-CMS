import { createStore, combineReducers } from 'redux';
import reducer from './reducers/reducer';
import newsReducer from './reducers/newsReducer';
import blogReducer from './reducers/blogReducer';

const rootReducer = combineReducers({
  reducer,
  newsReducer,
  blogReducer,
});

const store = createStore(rootReducer);

export default store;
