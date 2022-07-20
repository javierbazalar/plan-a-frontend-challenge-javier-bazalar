import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MovieDbService } from '../../services/movie-db-service.service';
import { Token } from '../../models/token.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  isValidForm = true;
  tokenRequest=(sessionStorage.getItem("tokenRequest") && sessionStorage.getItem("tokenRequest")!=undefined)?sessionStorage.getItem("tokenRequest"):"";
  constructor(public formBuilder: FormBuilder, public movieService:MovieDbService, private router: Router) {
   
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]]
    })

    this.ionicForm.valueChanges.subscribe(change => {
      if(this.ionicForm.valid){
        this.isValidForm=false;
      }else{
        this.isValidForm=true;
      }

    });
    sessionStorage.setItem("validate","false")

    if(this.tokenRequest==""){
      this.movieService.getToken().subscribe(
        (data:Token) => {
          this.tokenRequest=data.request_token;
          sessionStorage.setItem("tokenRequest",this.tokenRequest=data.request_token);
        } 
      );
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      let dataForm={
        request_token:this.tokenRequest,
        username:this.ionicForm.value.username,
        password:this.ionicForm.value.password
      }
      this.movieService.getAccessMovie(dataForm).subscribe(
        (data:Token) => {
          if(data.success){
            this.router.navigate(['/home']);
            sessionStorage.setItem("validate",data.success.toString())
          }
        }
      )
    }
  }

  

}
