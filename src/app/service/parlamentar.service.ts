import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parlamentar } from '../domain/parlamentar.model';
import { UpdateUserRoleDTO } from '../dto/update-user-role-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ParlamentarService {

  private baseUrl = environment.apiUrl + '/parlamentares';
  private updateRoleURL = '/update-role'

  constructor(private http: HttpClient) {}
  
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

  updateRole(updateUserRoleDTO: UpdateUserRoleDTO) : Observable<Parlamentar>{
    return this.http.put<Parlamentar>(this.baseUrl + this.updateRoleURL, updateUserRoleDTO);
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
