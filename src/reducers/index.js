import { combineReducers } from 'redux';
import dogs from './dogs';

export default combineReducers({
  gameInfo: dogs
});