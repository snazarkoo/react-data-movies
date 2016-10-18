import React, {PropTypes} from 'react';

const CommentForm = ({onSave, saving, onChange}) => {
  return (
    <div className="row">
        <div className="column medium-12">
            <h3>Comments</h3>
            <form>
              <textarea onChange={onChange} />
              <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />
            </form>
        </div>
    </div>
  );
};

CommentForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
};

export default CommentForm;
