import { getPreparedPostsFromServer } from '../api/getPreparedPostsFromServer';
import { setIsLoading } from './IsLoadingReducer';
import { setIsLoadedPosts } from './IsLoadedPostsReducer';
import { setHasError } from './hasErrorReducer';

const SET_PREPARED_POSTS = 'SET_POSTS';
const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_POST = 'DELETE_POST';

export const setPosts = posts => ({
  type: SET_PREPARED_POSTS,
  posts,
});

export const removeComment = (commentId, postId) => ({
  type: DELETE_COMMENT,
  commentId,
  postId,
});

export const removePost = postId => ({
  type: DELETE_POST,
  postId,
});

export const getPreparedPosts = state => state.preparedPosts;

export const loadPosts = () => (dispatch) => {
  dispatch(setHasError(false));
  dispatch(setIsLoading(true));

  return getPreparedPostsFromServer()
    .then((posts) => {
      dispatch(setPosts(posts));
    })
    .catch(() => {
      dispatch(setHasError(true));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
      dispatch(setIsLoadedPosts(true));
    });
};

const postsReducer = (preparedPosts = [], action) => {
  switch (action.type) {
    case SET_PREPARED_POSTS:
      return action.posts;

    case DELETE_COMMENT: return preparedPosts
      .map(
        (post) => {
          if (post.id === action.postId) {
            return {
              ...post,
              comments: post.comments.filter(
                comment => comment.id !== action.commentId
              ),
            };
          }

          return post;
        }
      );

    case DELETE_POST: return preparedPosts
      .filter(
        post => post.id !== action.postId
      );

    default:
      return preparedPosts;
  }
};

export default postsReducer;
