import React, {PropTypes} from 'react';
import * as movieActions from '../../actions/movieActions';
import * as commentActions from '../../actions/commentActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ImageEl from '../common/ImageEl.js';
import CommentList from './CommentList.js';
import CommentForm from './CommentForm.js';

class MoviePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      saving: false,
      comment: {
        text: ''
      }
    };
    this.updateCommentState = this.updateCommentState.bind(this);
    this.createComment = this.createComment.bind(this);
  }
  componentWillMount() {
    this.getData();
  }
  componentWillUpdate(nextProps) {
    if (nextProps.routeParams.id !== this.props.routeParams.id) {
      this.getData(nextProps.routeParams.id);
    }
  }
  updateCommentState(event) {
    let comment = this.state.comment;
    comment.text = event.target.value;
    return this.setState({comment});
  }
  createComment(event) {
    event.preventDefault();

    if (!this.commentFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.commentActions.createComment(this.props.routeParams.id, this.state.comment)
      .done(() => {
        let comment = this.state.comment;
        comment.text = '';
        this.setState({
          saving: false,
          comment
        });
      })
      .fail(error => {
        // toastr.error(error);
        this.setState({saving: false});
      });
  }
  commentFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (!this.state.comment.text.length) {
      // errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    // this.setState({errors: errors});
    return formIsValid;
  }

  getData(id) {
    const movieId = id || this.props.routeParams.id;
    this.props.movieActions.loadMovie(movieId);
    this.props.commentActions.loadComments(movieId);
  }
  render() {
    let content;
    if (this.props.callEnd) {
      content = (
        <div>
          <div className="column medium-4">
            <ImageEl movie={this.props.movie} size="largeImage" />
          </div>
          <div className="column medium-8">
            <h3>{this.props.movie.title}</h3>
            <h4>Overview</h4>
            <p>{this.props.movie.overview}</p>
          </div>
        </div>
        );
    } else {
      content = (
        <div className="column medium-12">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      );
    }
    return (
      <div className="movie-page">
        <div className="wrap row">
          {content}
          <CommentForm
            text={this.state.comment.text}
            onSave={this.createComment}
            saving={this.state.saving}
            onChange={this.updateCommentState} 
            isAuthenticated={this.props.isAuthenticated} />
          <CommentList comments={this.props.comments} />
        </div>
      </div>
    );
  }
}

MoviePage.propTypes = {
  movieActions: PropTypes.object.isRequired,
  commentActions: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  callEnd: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    movie: state.movie,
    callEnd: state.ajaxCallsInProgress === 0,
    comments: state.comments,
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
    commentActions: bindActionCreators(commentActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);