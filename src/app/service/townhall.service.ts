import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TownHall } from '../domain/townhall.model';

@Injectable({
  providedIn: 'root'
})

export class TownHallService {

  baseUrl = environment.apiUrl + '/townhalls';
  updateTableurl = '/{id}/table';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':environment.apiUrl
    }),
  };


  getTownHallList(): Observable<TownHall[]> {
    return this.http
      .get<TownHall[]>(this.baseUrl)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getById(id: number): Observable<TownHall>{
    
    let townHall = null;

    return this.http.get<TownHall>(this.baseUrl+"/"+id);

  }

  createTownHall(townHall : TownHall) : Observable<TownHall>{
    return this.http.post<TownHall>(this.baseUrl, townHall);
  }

  updateTownHall(townHall : TownHall) : Observable<TownHall>{
    return this.http.put<TownHall>(this.baseUrl, townHall);
  }

  delete(id: number): Observable<number>{
    return this.http.delete<number>(this.baseUrl + "/" + id, this.httpOptions);
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
    return throwError(() => {
      return errorMessage;
    });
  }
}