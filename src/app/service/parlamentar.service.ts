import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Parlamentar } from '../domain/parlamentar.model';
import { DumbService } from './dumb.service';

@Injectable({
  providedIn: 'root'
})
export class ParlamentarService {

  baseUrl = 'http://192.168.1.20:8080/parlamentares';
  constructor(private http: HttpClient, private dumService: DumbService) {}
  
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  getParlamentarList(townHallId: number): Parlamentar[] {
    switch(townHallId){
      case 1: return this.dumService.getParlamentaresMaracanau();
      case 2: return this.dumService.getParlamentaresBeberibe();
      case 3: return this.dumService.getParlamentaresEusebio();
      case 4: return this.dumService.getParlamentarAquiraz();
      case 5: return this.dumService.getParlamentaresHorizonte();
      case 6: return this.dumService.getParlamentarCaninde();
      case 7: return this.dumService.getParlamentaresIraucuba();
      case 8: return this.dumService.getParlamentaresSaoGoncalo();
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
