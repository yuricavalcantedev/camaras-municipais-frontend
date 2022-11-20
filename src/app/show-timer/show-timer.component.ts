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

  name:string = "";
  parlamentar: Parlamentar = new Parlamentar();
  townHall: TownHall = new TownHall();
  parlamentarAParte: Parlamentar = new Parlamentar();
  timeDescription: string = "";
  
  isMainTimerRunning: boolean = false;
  
  mainTextMinutes: any;
  mainTextSeconds: any;

  subTextMinutes: any;
  subTextSeconds: any;
  showAParteTime: Observable<boolean>;


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
      
      this.parlamentar = this.utilTimer.getParlamentar();
      if(!this.isMainTimerRunning){

        this.isMainTimerRunning = true;
        this.mainTimer(this.utilTimer.getTime());
      }

      if(this.utilTimer.getParlamentarAParte() != null){

        this.parlamentarAParte = this.utilTimer.getParlamentarAParte();
        this.showAParteTime = of (true);
        this.subTimer(120);
      }else{
        this.showAParteTime = of (false);
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

    this.mainTimerInterval = setInterval(() => {
      
      seconds = (seconds == 0) ? 59 : --seconds;
      minutes = seconds == 0 ? --minutes : minutes;

      this.mainTextMinutes = minutes < 10 ? '0' + minutes : minutes;
      this.mainTextSeconds = seconds < 10 ? '0' + seconds : seconds;

      console.log("Main timer");
      if (minutes == -1 && seconds == 0) {
        
        this.isMainTimerRunning = false;
        this.mainTextMinutes = '00';
        clearInterval(this.mainTimerInterval);
        this.soundService.playSound();
      }
    }, 750);
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
        this.subTextMinutes = '00';
        clearInterval(this.subTimerInterval);
        this.showAParteTime = of (false);
      }
    }, 750);
  }

}