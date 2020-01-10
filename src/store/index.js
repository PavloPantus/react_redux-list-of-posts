import { createStore, combineReducers } from 'redux';

// here needed import of reducers;
import postsReducer from './PostListReducer';
import isLoadingReducer from "./IsLoadingReducer";

const rootReducer = combineReducers({
  preparedPosts: postsReducer,
  isLoading: isLoadingReducer,
});

const store = createStore(rootReducer);

export default store;
