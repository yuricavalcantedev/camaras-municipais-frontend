import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Control } from '../domain/control.model';
import { User } from '../domain/user.model';
import { ControlDTO } from '../dto/control-dto.model';
import { EControlType } from '../dto/control-type.enum';


@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private baseUrl = environment.apiUrl + '/control';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  create(controlDto: ControlDTO): Observable<Control> {
    console.log({controlDto})
    return this.http.post<Control>(this.baseUrl, controlDto);
  }

  findByTypeAndParlamentarIdAll(type: EControlType, parlamentarUsername: string): Observable<Control[]> {
    return this.http
      .get<Control[]>(`${this.baseUrl}/${type}/${parlamentarUsername}`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: number): Observable<any> {
    console.log({deleting: id})
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      this.messageService.add({ severity: 'error', summary: 'Ocorreu um erro', detail: errorMessage });
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.messageService.add({ severity: 'error', summary: 'Ocorreu um erro', detail: errorMessage });
    }
    console.log({errorMessage});
    return throwError(() => {
      return errorMessage;
    });
  }
}
