import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Parlamentar } from '../domain/parlamentar.model';
import { TimerControlDTO } from '../domain/timer-control-dto.model';
import { TownHall } from '../domain/townhall.model';
import { UtilShowTimer } from '../domain/utilsShowTimer.model';
import { SoundService } from '../service/sound.service';
import { UtilService } from '../service/util.service';


@Component({
  selector: 'app-show-timer',
  templateUrl: './show-timer.component.html',
  styleUrls: ['./show-timer.component.css']
})
export class ShowTimerComponent implements OnInit {

  parlamentarNameSubTimer:string = "";
  parlamentar: Parlamentar = new Parlamentar();
  townHall: TownHall = new TownHall();
  parlamentarAParte: Parlamentar = new Parlamentar();
  timeDescription: string = "";

  isMainTimerRunning: boolean = false;

  mainTextMinutes: any;
  mainTextSeconds: any;

  subTextMinutes: any;
  subTextSeconds: any;
  showAParteTime: boolean;


  private mainTimerInterval: any;
  private subTimerInterval: any;
  public utilTimer: UtilShowTimer;
  public timerControlDTO : TimerControlDTO = new TimerControlDTO();


  constructor(private soundService: SoundService, private utilService: UtilService) {
  }


  ngOnInit(): void {

    this.utilService.updateTransmitir.subscribe(value => {

      this.utilTimer = this.utilService.getUtilShowTimer();
      this.timeDescription = this.utilTimer.getTimeDescription();
      this.townHall = this.utilTimer.getTownHall();

      console.log(this.utilTimer);
      this.clearSubTimer();
      this.parlamentar = this.utilTimer.getParlamentar();

      if(this.utilTimer.getFinishMainTimer()){
        console.log(1);
        this.clearMainTimer();
      }else if(this.utilTimer.getFinishAParteTimer()){
        console.log(2);
        this.clearSubTimer();
      }else if(!this.utilTimer.getFinishAParteTimer() && this.utilTimer.getParlamentarAParte() != null){
        console.log(3);
        this.parlamentarAParte = this.utilTimer.getParlamentarAParte();
        this.parlamentarNameSubTimer = this.parlamentarAParte.name.split(" ")[0];
        this.showAParteTime = true;
        this.subTimer(120);
      }else{
        console.log(4);
        this.clearMainTimer();
        this.isMainTimerRunning = true;
        this.mainTimer(this.utilTimer.getTime());
        this.showAParteTime = false;
      }

      if(this.utilTimer.getFinishMainTimer()){
        this.utilService.getUtilShowTimer().setFinishMainTimer(false)
      };

      if(this.utilTimer.getFinishAParteTimer()){
        this.utilService.getUtilShowTimer().setFinishAParteTimer(false);
      }
    });
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

    console.log('main timer', minutes, timeInSeconds);

    this.mainTimerInterval = setInterval(() => {

      seconds = (seconds == 0) ? 59 : --seconds;
      minutes = seconds == 0 ? --minutes : minutes;

      this.mainTextMinutes = minutes < 10 ? '0' + minutes : minutes;
      this.mainTextSeconds = seconds < 10 ? '0' + seconds : seconds;

      if (minutes == -1 && seconds == 0) {
        this.clearMainTimer();
        this.soundService.playSound();
      }
    }, 750);
  }

  clearMainTimer(){

    this.isMainTimerRunning = false;
    this.mainTextMinutes = '00';
    this.mainTextSeconds = '00';
    clearInterval(this.mainTimerInterval);
  }

  clearSubTimer(){

      this.showAParteTime = false;
      this.subTextMinutes = '00';
      this.subTextSeconds = '00';
      clearInterval(this.subTimerInterval);

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
    }, 750);
  }

  fullScreen() {
    this.utilService.fullScreen();
  }


}
