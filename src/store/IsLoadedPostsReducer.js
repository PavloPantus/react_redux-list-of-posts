const IS_LOADED_POSTS = 'IS_LOADED_POSTS';

export const setIsLoadedPosts = value => ({
  type: IS_LOADED_POSTS,
  status: value,
});

export const getIsLoadedPosts = state => state.isLoadedPosts;

const isLoadedPostsReducer = (isLoadedPosts = false, action) => {
  switch (action.type) {
    case IS_LOADED_POSTS: return action.status;

    default: return isLoadedPosts;
  }
};

export default isLoadedPostsReducer;
