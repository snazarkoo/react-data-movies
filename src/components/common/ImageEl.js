import React, {PropTypes} from 'react';
import img from '../../assets/noavailable.png';

const ImageEl = ({movie, size}) => {
  const imgUrl = {
    base: 'http://api.themoviedb.org/3',
    hyperImage: 'http://image.tmdb.org/t/p/w780/',
    largeImage: 'http://image.tmdb.org/t/p/w300/',
    mediumImage: 'http://image.tmdb.org/t/p/w185/',
    smallImage: 'http://image.tmdb.org/t/p/w92/'
  };
  let getImage = (movie) => {
    if (movie.poster_path) {
      return `${imgUrl[size]}${movie.poster_path}`;
    }
    return img;
  };
  return <img src={getImage(movie)} />;
};

ImageEl.propTypes = {
  movie: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired
};

export default ImageEl;
