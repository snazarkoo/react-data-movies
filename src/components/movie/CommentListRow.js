import React, {PropTypes} from 'react';

const CommentListRow = ({comment}) => {
  const dateDiff = (date) => {
    const dateObj = new Date(date);
    return parseInt((Date.now() - dateObj.getTime())/(24*3600*1000));
  };
  return (
    <li>
      <div>
        {comment.user.username} - <span>{dateDiff(comment.updatedAt)} days ago</span>
      </div>
      <div>
        {comment.text}
      </div>
    </li>
  );
};

CommentListRow.propTypes = {
  comment: PropTypes.object.isRequired
};

export default CommentListRow;
