import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Parlamentar } from '../domain/parlamentar.model';
import { TownHall } from '../domain/townhall.model';

@Injectable({
  providedIn: 'root'
})
export class TownHallService {

  baseUrl = 'http://192.168.1.20:8080/townhalls';
  townHallList : TownHall []= [
    {
        "id": 4,
        "name": "Câmara Municipal de Aquiraz",
        "urlImage": "https://sapl.aquiraz.ce.leg.br/media/sapl/public/casa/logotipo/Brasao_Cam_2020_Alpha.png",
        "city": "Aquiraz",
        "legislature": null,
        "apiUrl": "https://sapl.aquiraz.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 2,
        "name": "Câmara Municipal de Beberibe",
        "urlImage": "https://sapl.beberibe.ce.leg.br/media/sapl/public/casa/logotipo/logo_casa.png",
        "city": "Beberibe",
        "legislature": null,
        "apiUrl": "https://sapl.beberibe.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 6,
        "name": "Câmara Municipal de Canindé",
        "urlImage": "https://sapl.caninde.ce.leg.br/media/sapl/public/casa/logotipo/Brasão.png",
        "city": "Canindé",
        "legislature": null,
        "apiUrl": "https://sapl.caninde.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 3,
        "name": "Câmara Municipal de Eusébio",
        "urlImage": "https://sapl.eusebio.ce.leg.br/media/sapl/public/casa/logotipo/LOGO_2022.jpg",
        "city": "Eusébio",
        "legislature": null,
        "apiUrl": "https://sapl.eusebio.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 5,
        "name": "Câmara Municipal de Horizonte",
        "urlImage": "https://sapl.horizonte.ce.leg.br/media/sapl/public/casa/logotipo/logo3.png",
        "city": "Horizonte",
        "legislature": null,
        "apiUrl": "https://sapl.horizonte.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 7,
        "name": "Câmara Municipal de Irauçuba",
        "urlImage": "https://sapl.iraucuba.ce.leg.br/media/sapl/public/casa/logotipo/logo.png",
        "city": "Irauçuba",
        "legislature": null,
        "apiUrl": "https://sapl.iraucuba.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 1,
        "name": "Câmara Municipal de Maracanaú",
        "urlImage": "https://sapl.maracanau.ce.leg.br/media/sapl/public/casa/logotipo/Logo.jfif",
        "city": "Maracanaú",
        "legislature": null,
        "apiUrl": "https://sapl.maracanau.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    },
    {
        "id": 8,
        "name": "Câmara Municipal de São Gonçalo do Amarante",
        "urlImage": "https://sapl.saogoncalodoamarante.ce.leg.br/media/sapl/public/casa/logotipo/Logo_2021.png",
        "city": "São Gonçalo do Amarante",
        "legislature": null,
        "apiUrl": "https://sapl.saogoncalodoamarante.ce.leg.br/api/parlamentares/parlamentar/search_parlamentares/"
    }
];

  constructor(private http: HttpClient) {}
  
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  getTownHallList(): TownHall[] {
    return this.townHallList;
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
