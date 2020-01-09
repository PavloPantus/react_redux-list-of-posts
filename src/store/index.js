import { createStore, combineReducers } from 'redux';

// here needed import of reducers;
import postsReducer from './PostList';

// need to export needed selectors;

const rootReducer = combineReducers({
  preparedPosts: postsReducer,
});

const store = createStore(rootReducer);

export default store;
