/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getDataFromUrl from '../api/getDataFromUrl';
import postsUrl from '../api/postsUrl';
import usersUrl from '../api/usersUrl';
import commentsUrl from '../api/commentsUrl';
import Post from './Post/Post';
import { getPreparedPosts,
  setPosts,
  getIsLoadingPosts,
  setIsLoading,
  getIsLoadedPosts,
  setIsLoaded } from '../store/PostList';

function PostList(
  {
    preparedPosts,
    setPreparedPosts,
    isLoadingPosts,
    setIsLoadingPosts,
    isLoadedPosts,
    setIsLoadedPosts,
  }
) {
  const [searchQuery, setSearchQuery] = useState('');

  const getPreparedPostsFromServer = async() => {
    const [posts, users, comments] = await Promise.all(
      [getDataFromUrl(postsUrl, []),
        getDataFromUrl(usersUrl, []),
        getDataFromUrl(commentsUrl, [])]
    );

    return posts.map(
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
  };

  const handleInputChange = (text) => {
    setSearchQuery(text.trim().toLowerCase());
  };

  const debounce = (func, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(func, delay, ...args);
    };
  };

  const debouncedHandleInputChange = debounce(handleInputChange, 1000);

  return (
    isLoadedPosts
      ? (
        <section className="posts">
          <input
            type="text"
            name="searchInPosts"
            className="input input_search-in-posts"
            onChange={event => debouncedHandleInputChange(event.target.value)}
            placeholder="type for searching"
          />

          <ul className="posts-list">

            {preparedPosts
              .filter(
                post => (
                  (post.title + post.body).replace(/[\n\r]/g, ' ')
                    .toLowerCase().includes(searchQuery)
                )
              )
              .map(
                post => (
                  <li key={post.id} className="post-list__item">
                    <Post searchQuery={searchQuery} singlePost={post} />
                  </li>
                )
              )
            }
          </ul>
        </section>
      )
      : (
        <button
          type="button"
          onClick={
            async() => {
              setIsLoadingPosts(true);
              setPreparedPosts(await getPreparedPostsFromServer());
              setIsLoadedPosts(true);
            }
          }
        >
          {isLoadingPosts ? 'Loading' : 'Load the List of Posts'}
        </button>
      )

  );
}

const mapStateToProps = state => ({
  preparedPosts: getPreparedPosts(state),
  isLoadingPosts: getIsLoadingPosts(state),
  isLoadedPosts: getIsLoadedPosts(state),
});

const mapDispatchToProps = {
  setPreparedPosts: setPosts,
  setIsLoadingPosts: setIsLoading,
  setIsLoadedPosts: setIsLoaded,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);

PostList.propTypes = {
  preparedPosts: PropTypes.arrayOf(
    PropTypes.object
  ),
  setPreparedPosts: PropTypes.func.isRequired,
  isLoadingPosts: PropTypes.bool.isRequired,
  setIsLoadingPosts: PropTypes.func.isRequired,
  isLoadedPosts: PropTypes.bool.isRequired,
  setIsLoadedPosts: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  preparedPosts: [],
};
