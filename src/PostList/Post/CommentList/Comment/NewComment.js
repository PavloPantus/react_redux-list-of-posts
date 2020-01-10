import React from 'react';
import PropTypes from 'prop-types';
import {setCommentIdToRemove} from "../../../../store/PostListReducer";
import {connect} from "react-redux";

const NewComment = ({ singleComment, setCommentToRemove}) => {

  return (
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
        onClick={()=>{
          setCommentToRemove(singleComment.id,singleComment.postId)
        }}
        type={'button'}
        className={'button button_remove button_remove_comment'}>
        Delete Comment
      </button>
    </li>

  );
}

NewComment.propTypes = {
  singleComment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  setCommentToRemove: setCommentIdToRemove
};

export default connect(mapStateToProps,mapDispatchToProps)(NewComment);
