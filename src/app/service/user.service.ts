import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { TownHall } from '../domain/townhall.model';
import { User } from '../domain/user.model';
import { UserDTOUpdatePassword } from '../dto/user-dto-update-password.model';
import { UserDTO } from '../dto/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  create(userDTO : UserDTO) : Observable<User>{
    
    return this.http.post<User>(this.baseUrl, userDTO);
  }

  updatePassword(userDTO: UserDTOUpdatePassword): Observable<UserDTOUpdatePassword>{
    return this.http.put<UserDTOUpdatePassword>(this.baseUrl + "/" + userDTO.id + "/" + "updatepwd", userDTO);
  }

  findAll(): Observable<User[]>{

    return this.http
      .get<User[]>(this.baseUrl)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: number) : Observable<any> {

    return this.http
      .delete<User>(this.baseUrl + "/" + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
