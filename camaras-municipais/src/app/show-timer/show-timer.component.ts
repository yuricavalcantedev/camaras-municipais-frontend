import { Component, Inject, OnInit } from '@angular/core';
import { Console } from 'console';
import { Parlamentar } from '../domain/parlamentar.model';
import { TimerControlDTO } from '../domain/timer-control-dto.model';
import { POPOUT_MODAL_DATA, PopoutData } from '../service/popout.tokens';
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
  textMinutes: any;
  textSeconds: any;


  public timerInterval: any;

  public timerControlDTO : TimerControlDTO = new TimerControlDTO();


  constructor(private soundService: SoundService, private utilService: UtilService) {
    
    this.parlamentar = this.utilService.getParlamentarToTalk();
    this.timer(this.utilService.getTimeToSpeak());
  }

  ngOnInit(): void {    
  }

  timer(timeInSeconds: number) {
    
    let minutes: number = 0;
    let seconds: number = timeInSeconds;

    if(timeInSeconds > 60){
      minutes = Math.floor(timeInSeconds / 60);
      seconds = timeInSeconds / minutes;
      seconds--;
    }
    

    this.timerInterval = setInterval(() => {
      
      seconds = (seconds == 0) ? 59 : --seconds;
      minutes = seconds == 0 ? --minutes : minutes;

      this.textMinutes = minutes < 10 ? '0' + minutes : minutes;
      this.textSeconds = seconds < 10 ? '0' + seconds : seconds;


      if (minutes == -1 && seconds == 0) {
        this.textMinutes = '00';
        clearInterval(this.timerInterval);
        this.soundService.playSound();
      }
    }, 750);
  }

}
