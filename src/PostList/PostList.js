/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from './Post/Post';
import { getPreparedPosts,
  loadPosts } from '../store/PostListReducer';
import { getIsLoading } from '../store/IsLoadingReducer';
import { getIsLoadedPosts } from '../store/IsLoadedPostsReducer';

import { hasError } from '../store/hasErrorReducer';

function PostList(
  {
    preparedPosts,
    isLoadingPosts,
    isLoadedPosts,
    loadPosts,
    hasError,
  }
) {
  const [searchQuery, setSearchQuery] = useState('');

  const loadPostsFromServer = async() => {
    await loadPosts();
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

  const visiblePosts = preparedPosts
    .filter(
      post => (
        (post.title + post.body).replace(/[\n\r]/g, ' ')
          .toLowerCase().includes(searchQuery)
      )
    );

  if (hasError) {
    return (
      <section>
        <p>Something went wrong, try to reload page</p>
        <button
          type="button"
          onClick={
            () => {
              loadPostsFromServer();
            }

          }
        >
          {isLoadingPosts ? 'Loading' : 'Load the List of Posts'}
        </button>
      </section>
    );
  }

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

          {
            visiblePosts.length === 0
              ? (
                <section className="nothing-was-found">
                Nothing was found...
                </section>
              )
              : (
                <ul className="posts-list">
                  {visiblePosts
                    .map(
                      post => (
                        <li key={post.id} className="post-list__item">
                          <Post searchQuery={searchQuery} singlePost={post} />
                        </li>
                      )
                    )
                  }
                </ul>
              )
          }

        </section>
      )
      : (
        <button
          type="button"
          onClick={
            loadPostsFromServer
          }
        >
          {isLoadingPosts ? 'Loading' : 'Load the List of Posts'}
        </button>
      )

  );
}

const mapStateToProps = state => ({
  preparedPosts: getPreparedPosts(state),
  isLoadingPosts: getIsLoading(state),
  isLoadedPosts: getIsLoadedPosts(state),
  hasError: hasError(state),
});

const mapDispatchToProps = {
  loadPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);

PostList.propTypes = {
  preparedPosts: PropTypes.arrayOf(
    PropTypes.object
  ),
  isLoadingPosts: PropTypes.bool.isRequired,
  isLoadedPosts: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  preparedPosts: [],
};
