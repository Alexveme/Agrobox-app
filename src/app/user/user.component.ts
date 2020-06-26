import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInterface } from '../shared/interfaces/user-interface';
import { AuthService } from '../shared/services/auth.service'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  login: FormGroup;

  public user: UserInterface;
  public token$: Observable<any>;

  constructor(private authService: AuthService, private router: Router) { 
    this.login = new FormGroup({
      inputEmail: new FormControl('', [
        Validators.email,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      inputPassword: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(event) {

    event.preventDefault();

    this.user = {
      user: this.login.value.inputEmail,
      password: this.login.value.inputPassword
    }

    this.login.reset();
    this.token$ = this.authService.loginUser$(this.user);

    return this.token$.subscribe(
      data => {
        const token = data.token;
        this.authService.setToken(token);
        this.router.navigate(['/home']);
      },
      error => console.log(error)
    )
  }

}
