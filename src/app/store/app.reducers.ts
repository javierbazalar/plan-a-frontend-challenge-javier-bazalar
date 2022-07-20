import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
    // define state 
    movies:reducers.MoviesState
};

export const appReducers:ActionReducerMap<AppState> = {
    movies:reducers.movieReducer,
};

