const ACTION_TYPE_SET_PREPARED_POSTS = 'SET_POSTS';
const ACTION_TYPE_IS_LOADING_POSTS = 'IS_LOADING_POSTS';
const ACTION_TYPE_IS_LOADED_POSTS = 'IS_LOADED_POSTS';

// actions

export const setPosts = posts => ({
  type: ACTION_TYPE_SET_PREPARED_POSTS,
  posts,
});

export const setIsLoading = value => ({
  type: ACTION_TYPE_IS_LOADING_POSTS,
  status: value,
});

export const setIsLoaded = value => ({
  type: ACTION_TYPE_IS_LOADED_POSTS,
  status: value,
});

// selectors
export const getPreparedPosts = state => state.preparedPosts.preparedPosts;
export const getIsLoadingPosts = state => state.preparedPosts.isLoadingPosts;
export const getIsLoadedPosts = state => state.preparedPosts.isLoadedPosts;

const initialState = {
  preparedPosts: [],
  isLoadingPosts: false,
  isLoadedPosts: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_PREPARED_POSTS:
      return {
        ...state, preparedPosts: action.posts,
      };

    case ACTION_TYPE_IS_LOADING_POSTS:
      return {
        ...state, isLoadingPosts: action.status,
      };

    case ACTION_TYPE_IS_LOADED_POSTS:
      return {
        ...state, isLoadedPosts: action.status,
      };

    default:
      return { state };
  }
};

export default postsReducer;
