import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostAuthorInfo from './PostAuthorInfo';
import CommentList from './CommentList/CommentList';
import {
  removePost,
} from '../../store/PostListReducer';

const Post = ({ singlePost, searchQuery, removePostId }) => {
  const getHighlightedText = (text, textToHighLight) => {
    const formatedText = text.replace(/[\n\r]/g, ' ');

    if (textToHighLight.length === 0) {
      return <span>{formatedText}</span>;
    }

    const regular = new RegExp(`(${textToHighLight})`, 'gi');

    return (
      <span>
        {formatedText.split(regular).map(
          (part, index) => (part === textToHighLight
            ? (
              <span
                key={part + index.toString()}
                className="highlighted"
              >
                {part}
              </span>
            )
            : part)
        )}
      </span>
    );
  };

  return (
    <>
      <article className="post">
        <h1 className="post__title">
          {getHighlightedText(singlePost.title, searchQuery)}
        </h1>
        <button
          onClick={() => {
            removePostId(singlePost.id);
          }}
          className="button button_remove button_remove_post"
          type="button"
        >
          Delete Post
        </button>
        <h2 className="post__body">
          {getHighlightedText(singlePost.body, searchQuery)}
        </h2>
        <PostAuthorInfo postAuthor={singlePost.author} />
        <CommentList comments={singlePost.comments} />
      </article>
    </>
  );
};

Post.propTypes = {
  singlePost: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.object,
    comments: PropTypes.array,
    id: PropTypes.number,
  }).isRequired,
  searchQuery: PropTypes.string,
  removePostId: PropTypes.func.isRequired,
};

Post.defaultProps = {
  searchQuery: '',
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  removePostId: removePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
