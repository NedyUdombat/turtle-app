/* eslint-disable jsx-a11y/scope */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
// actions
import { getMovies } from '../../store/modules/movie';
import { formatTimeToString } from '../../utils/helpers';
import Sidebar from '../Sidebar';
// styles
import './index.scss';

class Table extends React.Component {
  state = {
    movies: [],
    filterValue: '',
    genres: [],
    showSidebar: false,
    sidebarMovie: {},
  };

  componentDidMount = async () => {
    await this.props.getMovies();
    const {
      props: { movies, genres },
    } = this;
    this.setState({ movies, genres });
  };

  handleChange = ({ target: { value } }) => {
    const {
      props: { movies },
    } = this;

    this.setState({
      filterValue: value,
      movies: movies.filter(movie =>
        movie.title.toLowerCase().includes(value.toLowerCase()),
      ),
    });
  };

  handleSelect = ({ label }) => {
    const {
      props: { movies },
    } = this;

    this.setState({
      movies:
        label === 'All'
          ? movies
          : movies.filter(movie => movie.genre.includes(label)),
    });
  };

  handleClick = movie => {
    const {
      state: { showSidebar, sidebarMovie },
    } = this;
    if (showSidebar && sidebarMovie.title === movie.title) {
      return this.setState({
        showSidebar: false,
        sidebarMovie: {},
      });
    }
    this.setState({
      showSidebar: true,
      sidebarMovie: movie,
    });
  };

  render() {
    const {
      props: { isLoading, error },
      state: { movies, filterValue, genres, showSidebar, sidebarMovie },
    } = this;

    return (
      <>
        {showSidebar && (
          <Sidebar handleClick={this.handleClick} movie={sidebarMovie} />
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
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    {genres.length > 0 && (
                      <Select onChange={this.handleSelect} options={genres} />
                    )}
                  </td>
                </tr>
                {movies.length > 0 &&
                  movies.map((movie, index) => (
                    <tr
                      key={index}
                      role="button"
                      onClick={() => this.handleClick(movie)}
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
            <p className="row-counter_text">{movies.length} Rows</p>
          </div>
          {Object.keys(error).length > 1 && (
            <p>An error occured please try again</p>
          )}
        </div>
      </>
    );
  }
}

export const mapStateToProps = ({
  movie: { movies, genres, isLoading, error },
}) => ({
  movies,
  genres,
  isLoading,
  error,
});

export default connect(mapStateToProps, { getMovies })(Table);
