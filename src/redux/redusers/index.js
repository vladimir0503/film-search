import { combineReducers } from 'redux';

import films from './films'
import slider from './slider'

const rootReduser = combineReducers({
    films,
    slider
});

export default rootReduser;