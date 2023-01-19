import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TimerControlDTO } from '../domain/timer-control-dto.model';
import { UtilShowTimer } from '../domain/utilsShowTimer.model';
import { ParlamentarTimer } from '../dto/parlamentar-timer.model';
import { SoundService } from '../service/sound.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-show-timer',
  templateUrl: './show-timer.component.html',
  styleUrls: ['./show-timer.component.css']
})

export class ShowTimerComponent implements OnInit {

  parlamentarNameSubTimer:string = "";
  parlamentar: ParlamentarTimer = new ParlamentarTimer();
  parlamentarAParte: ParlamentarTimer = new ParlamentarTimer();
  timeDescription: string = "";
  townHallName: string = '';
  townHallUrlImage: string = '';

  isMainTimerRunning: boolean = false;
  isSubTimerRunning: boolean = false;

  mainTextMinutes: any = '00';
  mainTextSeconds: any = '00';

  subTextMinutes: any;
  subTextSeconds: any;
  showAParteTime: boolean;

  triggeredSound: boolean = false;

  mainTimerInterval: any;
  subTimerInterval: any;
  public utilTimer: UtilShowTimer;
  public timerControlDTO : TimerControlDTO = new TimerControlDTO();

  endMainTimer: boolean = false;
  endSubTimer: boolean = false;

  ONE_SECOND: number = 1000;


  constructor(private soundService: SoundService, private utilService: UtilService, private cookieService: CookieService) {
  }

  ngOnInit(): void {    

    setInterval(() => {      
      
      if(this.cookieService.get('parlamentarObject').length > 0){
        this.parlamentar = JSON.parse(this.cookieService.get('parlamentarObject'));
      }

      if(this.cookieService.get('parlamentarAParteObject')){
        this.parlamentarAParte = JSON.parse(this.cookieService.get('parlamentarAParteObject'));
      }

      if(this.cookieService.get('townHallCityName').length > 0){
        this.townHallName = this.cookieService.get('townHallCityName');
      }

      if(this.cookieService.get('townHallUrlImage').length > 0){
        this.townHallUrlImage = this.cookieService.get('townHallUrlImage');
      }
      
      this.endMainTimer = this.cookieService.get('endMainTimer') == 'true';
      this.endSubTimer = this.cookieService.get('endSubTimer') == 'true';

      if(this.endMainTimer){

        this.clearMainTimer();
        this.endMainTimer= false;
        this.cookieService.set('endMainTimer', 'false');

      }else if(this.endSubTimer){

        this.clearSubTimer();
        this.endSubTimer = false;
        this.cookieService.set('endSubTimer', 'false');

      }else if(this.parlamentar.id != null && !this.isMainTimerRunning){

        this.isMainTimerRunning = true;
        this.mainTimer(this.parlamentar.timeToSpeak);
        this.showAParteTime = false;

      }else if(this.parlamentarAParte.id != null && !this.isSubTimerRunning){

        this.isSubTimerRunning = true;
        this.parlamentarNameSubTimer = this.parlamentarAParte.name.split(" ")[0];
        this.showAParteTime = true;
        this.subTimer(120);
      }

    }, this.ONE_SECOND);

  }

  clearMainTimer(){

    this.cookieService.set('parlamentarObject', '');
    this.parlamentar = new ParlamentarTimer();
    this.isMainTimerRunning = false;
    this.mainTextMinutes = '00';
    this.mainTextSeconds = '00';
    
    clearInterval(this.mainTimerInterval);
  }

  clearSubTimer(){

    this.cookieService.set('parlamentarAParteObject', '');
    this.parlamentarAParte = new ParlamentarTimer();
    this.isSubTimerRunning = false;

    this.showAParteTime = false;
    this.subTextMinutes = '00';
    this.subTextSeconds = '00';
    clearInterval(this.subTimerInterval);

  }

  mainTimer(timeInSeconds: number) {

    let minutes: number = 0;
    let seconds: number = timeInSeconds;

    if(timeInSeconds >= 60){
      minutes = Math.floor(timeInSeconds / 60);
      seconds = timeInSeconds / minutes;
      minutes --;
    }else{
      seconds = timeInSeconds;
    }

    this.triggeredSound = false;
    this.mainTimerInterval = setInterval(() => {

      seconds = (seconds == 0) ? 59 : --seconds;
      minutes = seconds == 0 ? --minutes : minutes;

      this.mainTextMinutes = minutes < 10 ? '0' + minutes : minutes;
      this.mainTextSeconds = seconds < 10 ? '0' + seconds : seconds;

      if(minutes == 0 && seconds == 59){
        this.soundService.playWarningSound();
      }

      if (minutes == -1 && seconds == 0) {
        this.clearMainTimer();
        this.soundService.playSound();
      }
    }, this.ONE_SECOND);
  }
  

  subTimer(timeInSeconds: number){

    let minutes: number = 0;
    let seconds: number = timeInSeconds;

    if(timeInSeconds >= 60){
      minutes = Math.floor(timeInSeconds / 60);
      seconds = timeInSeconds / minutes;
      minutes --;
    }else{
      seconds = timeInSeconds;
    }

    this.subTimerInterval = setInterval(() => {

      seconds = (seconds == 0) ? 59 : --seconds;
      minutes = seconds == 0 ? --minutes : minutes;

      this.subTextMinutes = minutes < 10 ? '0' + minutes : minutes;
      this.subTextSeconds = seconds < 10 ? '0' + seconds : seconds;

      if (minutes == -1 && seconds == 0) {
        this.clearSubTimer();
      }
    }, this.ONE_SECOND);
  }

  fullScreen() {
    this.utilService.fullScreen();
  }


}
