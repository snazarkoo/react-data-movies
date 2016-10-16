import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as filmsActions from '../../actions/filmAction';
import * as commentActions from '../../actions/commentActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ImageEl from '../common/ImageEl.js';
import CommentList from './CommentList.js';

class MoviePage extends React.Component {
  componentWillMount() {
    this.getData();
  }
  componentWillUpdate(nextProps) {
    if (nextProps.routeParams.id !== this.props.routeParams.id) {
      this.getData();
    }
  }
  getData() {
    const movieId = this.props.routeParams.id;
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
  comments: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    movie: state.movie,
    callEnd: state.ajaxCallsInProgress === 0,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(filmsActions, dispatch),
    commentActions: bindActionCreators(commentActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
