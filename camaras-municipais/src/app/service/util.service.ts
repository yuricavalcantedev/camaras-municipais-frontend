import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Parlamentar } from '../domain/parlamentar.model';
import { UtilShowTimer } from '../domain/utilsShowTimer.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private utilShowTimer: UtilShowTimer;
  updateTransmitir = new BehaviorSubject<boolean>(false);
  updateParte = new BehaviorSubject<boolean>(false);

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

}
