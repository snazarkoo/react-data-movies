import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import * as videoActions from '../../actions/filmAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListEl from '../common/ListEl';
import Pagination from 'rc-pagination';
import '../../styles/rc-pagination.css';

class DiscoverPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    let query = this.props.location.query;

    this.state = {
      movie: {
        year: query.year ||'2016',
        sortBy: 'desc'
      },
      currentPage: Number(query.page) || 1
    };
    this.movieRow = this.movieRow.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.optionByStartEndYear = this.optionByStartEndYear.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onSortByChange = this.onSortByChange.bind(this);
  }
  componentWillMount() {
    let {page, year} = this.props.location.query;
    this.props.actions.loadDiscoveredMovies(year, page);
  }
  movieRow(movie) {
    return <ListEl key={movie.id} movie={movie} size="mediumImage" />;
  }
  optionByStartEndYear(startYear = 2008, endYear = 2016) {
    let optionArr = [];
    while (endYear >= startYear) {
      optionArr.push(<option key={endYear} value={endYear}>{endYear}</option>);
      endYear--;
    }
    return optionArr;
  }
  onYearChange(e) {
    let movie = this.state.movie;
    movie.year = e.target.value;
    this.setState({
      movie,
      currentPage: 1
    });
    browserHistory.push(`/?page=1&year=${this.state.movie.year}`);
    this.props.actions.loadDiscoveredMovies(this.state.movie.year, 1);
  }
  onSortByChange() {
    //TODO sort select
  }
  onChangePage(currentPage) {
    browserHistory.push(`/?page=${currentPage}&year=${this.state.movie.year}`);
    this.setState({
      currentPage
    });
    this.props.actions.loadDiscoveredMovies(this.state.movie.year, currentPage);
  }
  render() {
    let content;
    if (this.props.discoveredMovies && this.props.discoveredMovies.length > 0 && this.props.callEnd) {
      content = (
        <div>
          <div className="row">
            <ul className="medium-up-4">
              {this.props.discoveredMovies.map(this.movieRow)}
            </ul>
          </div>
          <div className="row">
            <div className="column medium-12">
              <Pagination defaultCurrent={1}
              total={this.props.totalItems}
              onChange={this.onChangePage}
              current={this.state.currentPage} 
              pageSize={20} />
            </div>
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
      <div className="discoverPage">
        <div className="wrap row">
          <div className="column medium-8">
            <h3>
              Discover New Movies
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="column medium-2">
            <label htmlFor="year">Year</label>
            <select value={this.state.movie.year} onChange={this.onYearChange}>
              {this.optionByStartEndYear()}
            </select>
          </div>
          <div className="column medium-4">
            <label htmlFor="sortBy">Sort By</label>
            <select value={this.state.movie.sortBy} onChange={this.onSortByChange}>
              <option key={1} value='desc'>Popularity Descending</option>
              <option key={2} value='asc'>Popularity Ascending</option>
            </select>
          </div>
        </div>
        {content}
      </div>
    );
  }
}

DiscoverPage.propTypes = {
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  discoveredMovies: PropTypes.array,
  totalItems: PropTypes.number,
  callEnd: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    discoveredMovies: state.discoveredMovies.results,
    totalItems: state.discoveredMovies.total_results,
    callEnd: state.ajaxCallsInProgress === 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(videoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);