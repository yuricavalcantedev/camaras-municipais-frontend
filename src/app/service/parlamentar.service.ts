import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Parlamentar } from '../domain/parlamentar.model';
import { DumbService } from './dumb.service';

@Injectable({
  providedIn: 'root'
})
export class ParlamentarService {

  baseUrl = 'http://localhost:8080/parlamentares';

  constructor(private http: HttpClient, private dumbService : DumbService) {}
  
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  getParlamentarList(townHallId: number): Observable<Parlamentar[]> {
    return this.http.get<Parlamentar[]>(this.baseUrl+"/townhalls/" + townHallId)
    .pipe(retry(), catchError(this.errorHandl));

  }

  getParlamentarListDumb(townHallId: number): Parlamentar[] {
    switch(townHallId){
      case 1: return this.dumbService.getParlamentaresMaracanau();
      case 2: return this.dumbService.getParlamentaresBeberibe();
      case 3: return this.dumbService.getParlamentaresEusebio();
      case 4: return this.dumbService.getParlamentarAquiraz();
      case 5: return this.dumbService.getParlamentaresHorizonte();
      case 6: return this.dumbService.getParlamentarCaninde();
      case 7: return this.dumbService.getParlamentaresIraucuba();
      case 8: return this.dumbService.getParlamentaresSaoGoncalo();
      default: return [];

    }
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
