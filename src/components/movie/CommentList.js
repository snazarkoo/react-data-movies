import React, {PropTypes} from 'react';
import CommentListRow from './CommentListRow';

const CommentList = ({comments}) => {
  return (
    <div className="row">
        <div className="column medium-12">
            <ul>
              {comments.map((comment, index) =>
                <CommentListRow comment={comment} key={index} />
              )}
            </ul>
        </div>
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array
};

export default CommentList;
