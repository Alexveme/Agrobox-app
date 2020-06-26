import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface as User } from '../interfaces/user-interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLogged());

  private URL_API = environment.URL_API;

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  loginUser$(user: User): Observable<any> {
    return this.http
      .post<User>(
        this.URL_API + 'user/login',
        JSON.stringify(user),
        { headers: this.headers }
      )

      .pipe(tap(data => {
        localStorage.setItem('isLogged', 'true');
        this.isLogged.next(true);
        return data;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  getToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!(accessToken === undefined || accessToken === null)) {
      return accessToken;
    } else {
      return null;
    }
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLogged');
  }

  getLogged(): boolean {
    if (localStorage.getItem('isLogged') === 'true') {
      return true;
    } else { return false; }
  }
}