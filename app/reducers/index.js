import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import api from './api';

import game from './game';
import settings from './settings';

export default combineReducers({
    game, settings, api, routing, form
});