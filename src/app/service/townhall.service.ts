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

  townHallList : any []= [
    {
        "id": 4,
        "name": "Câmara Municipal de Aquiraz",
        "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/casa/logotipo/Brasao_Cam_2020_Alpha.png",
        "city": "Aquiraz",
        "legislature": null,
        "apiURL": "https://sapl.aquiraz.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 2,
        "name": "Câmara Municipal de Beberibe",
        "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/casa/logotipo/logo_casa.png",
        "city": "Beberibe",
        "legislature": null,
        "apiURL": "https://sapl.beberibe.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 6,
        "name": "Câmara Municipal de Canindé",
        "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/casa/logotipo/Brasão.png",
        "city": "Canindé",
        "legislature": null,
        "apiURL": "https://sapl.caninde.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 3,
        "name": "Câmara Municipal de Eusébio",
        "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/casa/logotipo/LOGO_2022.jpg",
        "city": "Eusébio",
        "legislature": null,
        "apiURL": "https://sapl.eusebio.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 5,
        "name": "Câmara Municipal de Horizonte",
        "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/casa/logotipo/logo3.png",
        "city": "Horizonte",
        "legislature": null,
        "apiURL": "https://sapl.horizonte.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 7,
        "name": "Câmara Municipal de Irauçuba",
        "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/casa/logotipo/logo.png",
        "city": "Irauçuba",
        "legislature": null,
        "apiURL": "https://sapl.iraucuba.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 1,
        "name": "Câmara Municipal de Maracanaú",
        "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/casa/logotipo/Logo.jfif",
        "city": "Maracanaú",
        "legislature": null,
        "apiURL": "https://sapl.maracanau.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 8,
        "name": "Câmara Municipal de São Gonçalo do Amarante",
        "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/casa/logotipo/Logo_2021.png",
        "city": "São Gonçalo do Amarante",
        "legislature": null,
        "apiURL": "https://sapl.saogoncalodoamarante.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    }
];

  // Http Headers

  getTownHallListDumb(): TownHall[] {
    return this.townHallList;
  }

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