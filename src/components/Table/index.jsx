/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getMovies } from '../../store/modules/movie';
import { formatTimeToString } from '../../utils/helpers';
import Sidebar from '../Sidebar';
import './index.scss';

const Table = ({
  getMovies: getMoviesFunction,
  movies,
  genres,
  isLoading,
  error,
}) => {
  const [moviesArray, setMoviesArray] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [genresArray, setGenresArray] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarMovie, setSidebarMovie] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      await getMoviesFunction();
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    setMoviesArray(movies);
    setGenresArray(genres);
  }, [movies]);

  const handleFilter = ({ target: { value } }) => {
    setFilterValue(value);
    setMoviesArray(
      movies.filter(movie =>
        movie.title.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleClick = movie => {
    if (showSidebar && sidebarMovie.title === movie.title) {
      setShowSidebar(false);
      setSidebarMovie({});
      return;
    }
    setShowSidebar(true);
    setSidebarMovie(movie);
    return;
  };

  const handleSelect = ({ label }) => {
    setFilterValue('');
    setMoviesArray(
      label === 'All'
        ? movies
        : movies.filter(movie => movie.genre.includes(label)),
    );
  };

  return (
    <>
      {showSidebar && (
        <Sidebar handleClick={handleClick} movie={sidebarMovie} />
      )}
      <div className="card movie-card">
        {isLoading && <p>Loading...</p>}
        <div className="title-section">
          <h2 className="title">Movies List</h2>
        </div>
        <section className="list-section">
          <table>
            <thead>
              <tr>
                <th scope="col" className="rank">
                  Rank
                </th>
                <th scope="col" className="title">
                  Title
                </th>
                <th scope="col" className="year">
                  Year
                </th>
                <th scope="col" className="director">
                  Director
                </th>
                <th scope="col" className="runtime">
                  Runtime
                </th>
                <th scope="col" className="revenue">
                  Revenue
                </th>
                <th scope="col" className="rating">
                  Rating
                </th>
                <th scope="col" className="genres">
                  Genres
                </th>
                <th scope="col" className="votes">
                  Votes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7">
                  <input
                    type="text"
                    value={filterValue}
                    placeholder="Filter by title"
                    onChange={handleFilter}
                    className="form-control"
                  />
                </td>
                <td>
                  {genresArray.length > 0 && (
                    <Select onChange={handleSelect} options={genresArray} />
                  )}
                </td>
              </tr>
              {moviesArray.length > 0 &&
                moviesArray.map((movie, index) => (
                  <tr
                    key={index}
                    role="button"
                    onClick={() => handleClick(movie)}
                  >
                    <td data-label="rank" className="rank">
                      {movie.rank}
                    </td>
                    <td data-label="title" className="title">
                      {movie.title}
                    </td>
                    <td data-label="year" className="year">
                      {movie.year}
                    </td>
                    <td data-label="director" className="director">
                      {movie.director}
                    </td>
                    <td data-label="runtime" className="runtime">
                      {formatTimeToString(movie.runtime)}
                    </td>
                    <td data-label="revenue" className="revenue">
                      &#36;{movie.revenue || 0} M
                    </td>
                    <td data-label="rating" className="rating">
                      {movie.rating || 0}
                    </td>
                    <td data-label="genres" className="genres">
                      {movie.genre.map((item, count) => (
                        <p key={count}>
                          {item}
                          {count !== movie.genre.length - 1 ? `,` : ''}&nbsp;
                        </p>
                      ))}
                    </td>
                    <td data-label="votes" className="votes">
                      {movie.votes}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <div className="row-counter">
          <p className="row-counter_text">{moviesArray.length} Rows</p>
        </div>
        {Object.keys(error).length > 1 && (
          <p>An error occured please try again</p>
        )}
      </div>
    </>
  );
};

export const mapStateToProps = ({
  movie: { movies, genres, isLoading, error },
}) => ({
  movies,
  genres,
  isLoading,
  error,
});

export default connect(mapStateToProps, { getMovies })(Table);
