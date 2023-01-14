import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private inFullScren: boolean = false;

  constructor() {
    
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