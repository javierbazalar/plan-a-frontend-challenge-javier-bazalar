import { Action, createReducer, on } from '@ngrx/store';
import { getMovies, getMoviesSuccess, getMoviesError} from '../actions';

export interface MoviesState {
    // define state 
    movies:[],
    loaded:boolean,
    loading:boolean,
    error:any
};

export const moviesInitialState:MoviesState = {
    //set initial state
    movies:[],
    loaded:false,
    loading:false,
    error:null
};

const _movieReducer = createReducer(
    moviesInitialState,
    on(getMovies, state => ({ ...state, loading: true })),
    on(getMoviesSuccess, (state,{ movies }) => (
        { 
            ...state, 
            loading: false ,
            loaded: true,
            movies:[...movies]
        }
    )),
    on(getMoviesError, (state,{ payload }) => (
        { 
            ...state, 
            loading: false ,
            loaded: false,
            error:payload
        }
    )),
);
export function movieReducer(state: MoviesState, action: Action) {
    return _movieReducer(state, action);
}