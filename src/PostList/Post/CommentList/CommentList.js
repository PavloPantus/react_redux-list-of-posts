import React from 'react';
import PropTypes from 'prop-types';
import OneComment from './Comment/NewComment';

const CommentList = ({ comments }) => (
  <ul className="post__comments">
    {comments.map(
      comment => <OneComment key={comment.id} singleComment={comment} />
    )}
  </ul>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default CommentList;
