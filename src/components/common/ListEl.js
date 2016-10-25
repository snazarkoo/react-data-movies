import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import ImageEl from './ImageEl.js';

const ListEl = ({movie, size}) => {
  let changeState = () => {
    browserHistory.push(`/movie/${movie.id}`);
  };
  return (
    <li className="column" key={movie.id}>
      <a onMouseDown={changeState} href={`/movie/${movie.id}`}>
        <ImageEl movie={movie} size={size}/>
        <span>
          {movie.title}
        </span>
      </a>
    </li>
  );
};

ListEl.propTypes = {
  movie: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired
};

export default ListEl;
