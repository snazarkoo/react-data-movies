import React, {PropTypes} from 'react';
import * as movieActions from '../../actions/movieActions';
import * as authActions from '../../actions/authActions';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListEl from '../common/ListEl';
import AuthForm from './AuthForm';
import Logout from './Logout';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      video: {
        title: ''
      },
      cred: {
        username: '',
        password: ''
      },
      isShowDropdown: false
    };
    this.delayTimer;
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.updateCredState = this.updateCredState.bind(this);
  }
  onLoginClick(event) {
    event.preventDefault();
    const { cred } = this.state;
    this.props.authActions.loginUser(cred);
  }
  onSignUpClick(event) {
    event.preventDefault();
    const { cred } = this.state;
    this.props.authActions.signUpUser(cred);
  }
  onLogoutClick() {
    this.props.authActions.logoutUser()
  }
  updateCredState(event) {
    const field = event.target.name;
    let cred = this.state.cred;
    cred[field] = event.target.value;
    this.setState({cred});
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
        this.props.movieActions.loadMovies(this.state.video.title);
      }, delay);
    } else {
      this.props.movieActions.loadMoviesSuccess([]);
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
    const {isAuthenticated, errorMessage, authActions} = this.props;

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
               {!isAuthenticated &&
                 <AuthForm
                   onChange={this.updateCredState}
                   errorMessage={errorMessage}
                   onLoginClick={this.onLoginClick}
                   onSignUpClick={this.onSignUpClick} />
               }
               
               {isAuthenticated &&
                 <Logout onLogoutClick={this.onLogoutClick} />
               }
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
  movieActions: PropTypes.object,
  authActions: PropTypes.object,
  movies: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    movies: state.movies.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
