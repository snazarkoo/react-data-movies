import React, {PropTypes} from 'react';

const CommentForm = ({onSave, saving, onChange, text, isAuthenticated}) => {
  return (
    <div className="row">
        <div className="column medium-12">
            <h3>Comments</h3>
            <form>
              <textarea value={text} onChange={onChange} />
              {isAuthenticated &&
                <input
                  type="submit"
                  disabled={saving}
                  value={saving ? 'Saving...' : 'Save'}
                  className="btn btn-primary"
                  onClick={onSave} />
              }
              {!isAuthenticated && 
                <div>Only registered user can sent comments</div>
              }
            </form>
        </div>
    </div>
  );
};

CommentForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  text: React.PropTypes.string,
  isAuthenticated: React.PropTypes.bool
};

export default CommentForm;
