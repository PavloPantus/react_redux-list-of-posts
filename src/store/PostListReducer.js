const ACTION_TYPE_SET_PREPARED_POSTS = 'SET_POSTS';
const ACTION_TYPE_IS_LOADED_POSTS = 'IS_LOADED_POSTS';
const ACTION_TYPE_COMMENT_TO_DELETE = 'COMMENT_TO_DELETE';
const ACTION_TYPE_POST_TO_DELETE = 'POST_TO_DELETE';

// actions

export const setPosts = posts => ({
  type: ACTION_TYPE_SET_PREPARED_POSTS,
  posts,
});

export const setIsLoaded = value => ({
  type: ACTION_TYPE_IS_LOADED_POSTS,
  status: value,
});

export const setCommentIdToRemove = (commentId, postId) => ({
  type: ACTION_TYPE_COMMENT_TO_DELETE,
  commentId,
  postId,
});

export const removePost = (postId) => ({
  type: ACTION_TYPE_POST_TO_DELETE,
  postId,
});

// selectors
export const getPreparedPosts = state => state.preparedPosts.preparedPosts;
export const getIsLoadedPosts = state => state.preparedPosts.isLoadedPosts;


const initialState = {
  preparedPosts: [],
  isLoadedPosts: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_PREPARED_POSTS:
      return {
        ...state, preparedPosts: action.posts,
      };

    case ACTION_TYPE_IS_LOADED_POSTS:
      return {
        ...state, isLoadedPosts: action.status,
      };

    case ACTION_TYPE_COMMENT_TO_DELETE:
      return {
        ...state,
        preparedPosts: state.preparedPosts.map(
          post=>{
            if(post.id===action.postId){
              return {
                ...post,
                comments: post.comments.filter(
                  comment=>comment.id!==action.commentId
                )
              }
            }
            return post;
          }
        )
      };

    case ACTION_TYPE_POST_TO_DELETE: return {
      ...state,
      preparedPosts: state.preparedPosts.filter(
        (post)=> post.id !== action.postId
      )
    };

    default:
      return state;
  }
};

export default postsReducer;
