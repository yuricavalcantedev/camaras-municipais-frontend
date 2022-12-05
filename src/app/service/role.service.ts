import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Role } from '../domain/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

baseUrl: string = "http://localhost:8080/roles";

  constructor(private http: HttpClient, private messageService: MessageService) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'http://localhost:4200'
    }),
  };

  getAll(): Observable<Role[]>{

    return this.http
      .get<Role[]>(this.baseUrl)
      .pipe(retry(), catchError(this.errorHandl));
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
