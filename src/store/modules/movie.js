import movies from '../../../db/movies.json';

export const REQUEST_PROCESS = 'REQUEST_PROCESS';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const getMovies = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_PROCESS });

    await dispatch({
      type: REQUEST_SUCCESS,
      payload: {
        movies: movies.sort((a, b) => a.rank - b.rank),
        genres: getGenres(movies),
      },
    });
  } catch (error) {
    dispatch({ type: REQUEST_ERROR, payload: error.response.data });
  }
};

const getGenres = moviesArr =>
  [
    'all',
    ...[...new Set(moviesArr.map(movie => movie.genre).flat())].sort(),
  ].map(item => ({
    value: item.toLowerCase(),
    label: item.replace(item[0], item[0].toUpperCase()),
  }));

export const DEFAULT_STATE = {
  movies: [],
  genres: [],
  isLoading: false,
  error: {},
};

export const movieReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        movies: payload.movies,
        genres: payload.genres,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
