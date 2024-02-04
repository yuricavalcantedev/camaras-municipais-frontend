import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TimerControlDTO } from '../../domain/timer-control-dto.model';
import { UtilShowTimer } from '../../domain/utilsShowTimer.model';
import { ParlamentarTimer } from '../../dto/parlamentar-timer.model';
import { SoundService } from '../../service/sound.service';
import { UtilService } from '../../service/util.service';
import { ControlService } from 'src/app/service/control.service';
import { EControlType } from 'src/app/dto/control-type.enum';
import { Control } from 'src/app/domain/control.model';

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
  expedientType: string = '';
  otherExpedient: string = '';

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
  GET_CONTROL_TIME: number = 3000;
  keepTimerRunning: boolean = false;
  controllList: Control[] = null;
  townHallId: number = 0;

  constructor(private soundService: SoundService, private utilService: UtilService, private cookieService: CookieService, private controlService: ControlService) {
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    this.cookieService.set('isShowTimerTabOpened', 'false');
  }

  ngOnInit(): void {
    this.cookieService.set('timeChanged', '')

    setInterval(() => {

      if(this.cookieService.get('parlamentarObject').length > 0){

        //check if user is sending a new user than the one is already speaking
        this.keepTimerRunning = this.parlamentar.name != JSON.parse(this.cookieService.get('parlamentarObject')).name;
        this.parlamentar = JSON.parse(this.cookieService.get('parlamentarObject'));
      }

      if(this.cookieService.get('parlamentarAParteObject')){
        this.parlamentarAParte = JSON.parse(this.cookieService.get('parlamentarAParteObject'));
      }

      if(this.cookieService.get('townHallCityName').length > 0){
        this.townHallName = this.cookieService.get('townHallCityName');
      }

      if (this.cookieService.get('user-townhall-id').length > 0) {
        this.townHallId = Number.parseInt(this.cookieService.get('user-townhall-id'));
      }

      if(this.cookieService.get('townHallUrlImage').length > 0){
        this.townHallUrlImage = this.cookieService.get('townHallUrlImage');
      }

      if(this.cookieService.get('expedientType').length > 0){
        this.expedientType = this.cookieService.get('expedientType');
      }

      if(this.cookieService.get('otherExpedient').length > 0){
        this.otherExpedient = this.cookieService.get('otherExpedient');
      }

      if(this.otherExpedient == 'Expediente diversos'){
        this.timeDescription = this.otherExpedient;
      }

      this.endMainTimer = this.cookieService.get('endMainTimer') == 'true';
      this.endSubTimer = this.cookieService.get('endSubTimer') == 'true';

      if(this.endMainTimer){

        this.clearMainTimer(true);
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

      }else if(this.parlamentar.id != null && this.keepTimerRunning){
        this.clearMainTimer(false);
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

    setInterval(() => {
      this.getControlTime();
      if (!this.isMainTimerRunning && this.controllList.length) {
        console.log("RESTARTING TIMER");
        this.mainTimer(1);
        this.isMainTimerRunning = true;
      }
    }, this.GET_CONTROL_TIME);
  }

  clearMainTimer(clearAll: boolean){

    if(clearAll){
      let urlImage = this.parlamentar.urlImage;
      this.parlamentar = new ParlamentarTimer();
      this.parlamentar.urlImage = urlImage;
      this.cookieService.set('parlamentarObject', '');
    }

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

      minutes = this.handleControlList(minutes);
      seconds = (seconds == 0) ? 59 : --seconds;

      this.mainTextMinutes = minutes < 10 ? '0' + minutes : minutes;
      this.mainTextSeconds = seconds < 10 ? '0' + seconds : seconds;

      minutes = (seconds == 0) ? --minutes : minutes;

      if (minutes == 0 && (seconds == 30 || seconds == 59 || seconds == 120)) {
        this.soundService.playSound("assets/sounds/warning_sound.mp3");
      }

      if (minutes == -1 && seconds == 0) {
        this.clearMainTimer(true);
        this.soundService.playSound("assets/sounds/main_sound.mp3");
      }
    }, this.ONE_SECOND);
  }


  private handleControlList(minutes: number) {
    console.log("handleControlList", minutes)
    this.controllList.forEach((control, index) => {
      if (control.command === 'add') {
        minutes += 1;
      } else if (control.command === 'remove') {
        if (minutes >= 1) {
          minutes -= 1;
        }
      }
      this.controllList.splice(index, 1);
      this.deleteControlTime(control.id);
    });
    return minutes;
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

  getControlTime() {
    this.controlService.findByTypeAndParlamentarIdAll(EControlType.TIME, this.townHallId.toString()).subscribe(res => {
      this.controllList = res.sort((a, b) => b.id - a.id);
    });
  }

  deleteControlTime(id: number) {
    this.controlService.delete(id).subscribe({
      next: data => {
        console.log({ deleteControlTime: data })
      }, error: error => {
        console.error({ deleteControlTime: error })
      }
    });
  }

}
