import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../../services/movie-db-service.service';
import { ListMovies } from '../../models/listMovies.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { getMovies } from '../../store/actions/movies.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  listMovies:[];
  constructor(
    public movieService:MovieDbService,
    private store:Store<AppState>,
    private router:Router
    ) { 
      
    }

  ngOnInit() {
    if(sessionStorage.getItem("validate")=="false"){
      this.router.navigate(['/login']);
    }
    this.store.select("movies").subscribe(({movies})=>{
      this.listMovies=movies
    })
    this.store.dispatch(getMovies())
  }

}
