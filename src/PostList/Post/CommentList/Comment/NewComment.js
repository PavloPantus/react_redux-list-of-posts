import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeComment } from '../../../../store/PostListReducer';

const NewComment = ({ singleComment, setCommentToRemove }) => (
  <li className="comment">
    <div className="comment__author-info">
      {singleComment.name}
      <br />
      {singleComment.email}
    </div>
    <div className="comment__body">
      {singleComment.body}
    </div>
    <button
      onClick={() => {
        setCommentToRemove(singleComment.id, singleComment.postId);
      }}
      type="button"
      className="button button_remove button_remove_comment"
    >
        Delete Comment
    </button>
  </li>

);

NewComment.propTypes = {
  singleComment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.number,
    postId: PropTypes.number,
  }).isRequired,
  setCommentToRemove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  setCommentToRemove: removeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
