import { Injectable } from '@angular/core';
import { Actions,createEffect,ofType } from '@ngrx/effects';
import { getMovies } from '../actions/movies.actions';
import { tap, mergeMap, map } from 'rxjs/operators'
import { MovieDbService } from '../../services/movie-db-service.service';
import * as MoviesActions from '../actions/movies.actions' 
import { ListMovies } from '../../models/listMovies.model';

@Injectable()
export class MoviesEffects{

    constructor(
        private actions$:Actions,
        private moviesServices:MovieDbService
    ){

    }

    getMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getMovies),
            tap(
                data => console.log(data)
            ),
            mergeMap(
                ()=>this.moviesServices.getLatestMovies().pipe(
                    map(
                        (movies:ListMovies) => MoviesActions.getMoviesSuccess({movies:movies.results})
                    )
                )
            )
        )
    );
}