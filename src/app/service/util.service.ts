import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilShowTimer } from '../domain/utilsShowTimer.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private utilShowTimer: UtilShowTimer;
  updateTransmitir = new BehaviorSubject<boolean>(false);
  updateParte = new BehaviorSubject<boolean>(false);
  private isFullScren = false;

  constructor() {
    this.utilShowTimer = new UtilShowTimer();
  }

  setUtilShowTimer(utilShowTimer: UtilShowTimer){

    if(utilShowTimer != null && utilShowTimer != undefined){
      this.utilShowTimer = utilShowTimer;
    }
  }

  getUtilShowTimer(){ return this.utilShowTimer; }

  changeTransmitirData(flag:boolean){ this.updateTransmitir.next(flag); }

  changeParteData(flag:boolean){ this.updateParte.next(flag); }

  toggleFullScreen(elem: HTMLElement) {
    console.log("FullScreen Called On Util")
    this.isFullScren = !this.isFullScren;
    if (
      (document.fullscreenElement !== undefined &&
        document.fullscreenElement === null) ||
      (document.fullscreenElement !== undefined &&
        document.fullscreenElement === null) ||
      (document.fullscreen !== undefined && !document.fullscreen) ||
      (document.exitFullscreen !== undefined &&
        !document.exitFullscreen)
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

}
