import { combineReducers } from 'redux';

// reducers
import { movieReducer } from './modules/movie';

export default combineReducers({
  movie: movieReducer,
});
