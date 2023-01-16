import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private inFullScren: boolean = false;

  constructor(private cookieService: CookieService) {    
  }

  fullScreen() {
    if (this.inFullScren) {
      document.exitFullscreen();
      this.inFullScren = false
    } else {
      document.body.requestFullscreen()
      this.inFullScren = true
    }
  }
}