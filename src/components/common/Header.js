import React, {PropTypes} from 'react';
import * as videoActios from '../../actions/movieActions';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListEl from '../common/ListEl';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      video: {
        title: ''
      },
      isShowDropdown: false
    };
    this.delayTimer;
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  onSearchChange(event) {
    let video = this.state.video;
    video.title = event.target.value;
    this.setState({
      video: video
    });
      let delay = 1000;
      clearTimeout(this.delayTimer);
    if (video.title) {
      this.delayTimer = setTimeout(() => {
        this.props.actions.loadMovies(this.state.video.title);
      }, delay);
    } else {
      this.props.actions.loadMoviesSuccess([]);
    }
  }
  onFocus() {
    this.setState({
      isShowDropdown: true
    });
  }
  onBlur() {
    setTimeout(() => {
      this.setState({
        isShowDropdown: false
      });
    });
  }
  render() {
    let dropDownList;
    if (this.props.movies && this.props.movies.length > 0) {
      dropDownList = this.props.movies.map((movie) => {
          return (
              <ListEl movie={movie} key={movie.id} size="smallImage" />
          );
        });
    }
    return (
      <div className="header">
        <div className="top-bar">
          <div className="wrap">
            <div className="top-bar-left">
              <ul className="menu">
                <li>
                  <Link to={'/'}>
                    Discover
                  </Link>
                </li>
                <li>
                  <Link to={'/movies'}>
                    Movies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                <li><a href="#">Login In</a></li>
                <li><a href="#">Sign Up</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="medium-12">
            <div className="dropDownList">
              <input 
                type="text"
                placeholder="Search for a movie or TV show"
                onChange={this.onSearchChange}
                value={this.state.video.value} 
                onFocus={this.onFocus}
                onBlur={this.onBlur} />
              <ul className={this.state.isShowDropdown ? 'show' : ''}>
                {dropDownList}
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  movies: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    movies: state.movies.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(videoActios, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
