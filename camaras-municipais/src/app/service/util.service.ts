import { Injectable } from '@angular/core';
import { Parlamentar } from '../domain/parlamentar.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private parlamentarToTalk: Parlamentar;
  private timeToSpeak: number;

  constructor() { }

  setParlamentarToTalk(parlamentar: Parlamentar){

    if(parlamentar != null && parlamentar != undefined){
      this.parlamentarToTalk = parlamentar;
    }
  }

  getParlamentarToTalk(){
    return this.parlamentarToTalk;
  }

  setTimeToSpeak(time: number){
    
    if(time != 0 && time != null && time != undefined){
      this.timeToSpeak = time;
    }
  }

  getTimeToSpeak(){
    return this.timeToSpeak;
  }
  
}
