import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import postsReducer from './PostListReducer';
import isLoadingReducer from './IsLoadingReducer';
import isLoadedPostsReducer from './IsLoadedPostsReducer';
import hasErrorReducer from './hasErrorReducer';

const rootReducer = combineReducers({
  preparedPosts: postsReducer,
  isLoading: isLoadingReducer,
  isLoadedPosts: isLoadedPostsReducer,
  hasError: hasErrorReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
