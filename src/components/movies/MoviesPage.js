import React, {PropTypes} from 'react';
import * as videoActions from '../../actions/filmAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListEl from '../common/ListEl';

class MoviesPage extends React.Component {
  componentWillMount() {
    this.props.actions.loadBestMovies();
  }
  courseRow(movie, index) {
    return <ListEl movie={movie} key={movie.id} size="mediumImage" />;
  }
  render() {
    return (
      <div className="moviesPage">
        <div className="wrap row">
          <div className="column medium-8">
            <h3>
              Popular Movies
            </h3>
          </div>
        </div>
        <div className="row">
          <ul className="medium-up-4">
            {this.props.bestMovies.map(this.courseRow)}
          </ul>
        </div>
      </div>
    );
  }
}

MoviesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  bestMovies: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    bestMovies: state.bestMovies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(videoActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);
