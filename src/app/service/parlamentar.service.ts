import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Parlamentar } from '../domain/parlamentar.model';

@Injectable({
  providedIn: 'root'
})
export class ParlamentarService {

  baseUrl = 'http://localhost:8080/parlamentares';
  constructor(private http: HttpClient) {}
  
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  getParlamentarList(townHallId: number): Observable<Parlamentar[]> {
    return this.http
      .get<Parlamentar[]>(this.baseUrl + '/townhalls/' + townHallId)
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
