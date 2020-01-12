import getDataFromUrl from './getDataFromUrl';
import postsUrl from './postsUrl';
import usersUrl from './usersUrl';
import commentsUrl from './commentsUrl';

export const getPreparedPostsFromServer = async() => {
  const [posts, users, comments] = await Promise.all(
    [getDataFromUrl(postsUrl, []),
      getDataFromUrl(usersUrl, []),
      getDataFromUrl(commentsUrl, [])]
  );

  const postsFromServer = posts.map(
    post => ({
      ...post,
      author: users.find(
        user => user.id === post.userId
      ),
      comments: comments.filter(
        comment => comment.postId === post.id
      ),
    })
  );

  return postsFromServer;
};
