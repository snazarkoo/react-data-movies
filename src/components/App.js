// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
// require('font-awesome/css/font-awesome.css');

class App extends React.Component {
  componentDidMount() {
    $(document).foundation();
  }
  render() {
    const { isAuthenticated, errorMessage } = this.props;

    return (
      <div>
        <Header isAuthenticated={isAuthenticated} errorMessage={errorMessage} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  const { isAuthenticated, errorMessage } = state.auth;

  return {
    isAuthenticated,
    errorMessage
  };
}

export default connect(mapStateToProps)(App);
