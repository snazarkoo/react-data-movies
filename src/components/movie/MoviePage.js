import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as filmsActions from '../../actions/filmAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ImageEl from '../common/ImageEl.js'

class MoviePage extends React.Component {
  componentWillMount() {
    this.props.actions.loadMovie(this.props.routeParams.id);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.routeParams.id !== this.props.routeParams.id) {
      this.props.actions.loadMovie(nextProps.routeParams.id);
    }
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
      )
    }
    return (
      <div className="movie-page">
        <div className="wrap row">
          {content}
        </div>
      </div>
    );
  }
}

MoviePage.propTypes = {
  actions: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  callEnd: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    movie: state.movie,
    callEnd: state.ajaxCallsInProgress === 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(filmsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
