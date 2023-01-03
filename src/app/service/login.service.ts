import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dto/login-dto.model';
import { User } from '../domain/user.model';
import { UserLoggedDTO } from '../dto/user-logged-dto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:8080/signIn';

  constructor(private http: HttpClient) {}
  
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  signIn(loginDTO: LoginDTO): Observable<UserLoggedDTO>{

    return this.http.post<UserLoggedDTO>(this.baseUrl, loginDTO);

  }
  
}
