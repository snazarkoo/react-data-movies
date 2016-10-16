import React, {PropTypes} from 'react';

const CommentListRow = ({comment}) => {
  return (
    <li>{comment.text}</li>
  );
};

CommentListRow.propTypes = {
  comment: PropTypes.object.isRequired
};

export default CommentListRow;
