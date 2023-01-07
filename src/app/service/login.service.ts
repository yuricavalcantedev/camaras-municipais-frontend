import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dto/login-dto.model';
import { User } from '../domain/user.model';
import { UserLoggedDTO } from '../dto/user-logged-dto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.apiUrl + '/signIn';

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
