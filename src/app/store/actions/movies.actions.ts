import { createAction, props } from "@ngrx/store";
import { ListMovies } from '../../models/listMovies.model';

export const getMovies= createAction('[Movies] getMovies')

export const getMoviesSuccess= createAction('[Movies] getMoviesSuccess',
    props<{movies:[]}>()
)

export const getMoviesError= createAction('[Movies] getMoviesError',
    props<{payload:any}>()
)