import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Parlamentar } from '../domain/parlamentar.model';
import { TownHall } from '../domain/townhall.model';

@Injectable({
  providedIn: 'root'
})

export class TownHallService {

  baseUrl = 'http://localhost:8080/townhalls';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'http://localhost:4200'
    }),
  };


  getTownHallList(): Observable<TownHall[]> {
    return this.http
      .get<TownHall[]>(this.baseUrl)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getById(id: number): TownHall{
    
    let townHall = null;

    this.http.get(this.baseUrl+"/"+id).subscribe({
      next: data => {
        townHall = data;
      },
      error: error => {
        this.messageService.add({severity:'error', summary:'Erro!', detail:'Aconteceu algum erro inesperado!'});
      }
    });

    return townHall;
  }

  createTownHall(townHall : TownHall) : TownHall{
    
    let result : TownHall;

    this.http.post<TownHall>(this.baseUrl, townHall).subscribe({
      
      next: data => {
        result = data;
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Câmara criada com sucesso!'});
      },

      error: error => {
        console.log(error);
        this.messageService.add({severity:'error', summary:'Ocorreu um erro', detail:'Sistema'});
        return;
      }

    });

    return result;
  }

  updateTownHall(townHall : TownHall) : TownHall{
    
    let result : TownHall;

    this.http.post<TownHall>(this.baseUrl, townHall).subscribe({
      
      next: data => {
        result = data;
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Câmara atualizada com sucesso!'});
      },

      error: error => {
        console.log(error);
        this.messageService.add({severity:'error', summary:'Ocorreu um erro', detail:'Sistema'});
        return;
      }

    });

    return result;
  }

  delete(id: number){
    this.http.delete(this.baseUrl + "/" + id, this.httpOptions).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Câmara deletada com sucesso!'});
      },
      error: error => {
        this.messageService.add({severity:'error', summary:'Ocorreu um erro', detail:'Sistema'});
      }
    });

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