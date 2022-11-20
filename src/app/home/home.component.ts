import { Component, HostListener, OnInit } from '@angular/core';
import { Parlamentar } from '../domain/parlamentar.model';
import { Timer } from '../interfaces/timers';
import { PopoutService } from '../service/popout.service';
import { PopoutModalName, POPOUT_MODALS } from '../service/popout.tokens';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CONST_MIN_TIMER = 5;
  parlamentar: Parlamentar = new Parlamentar();
  timer: number;
  selectedValue: string;
  expediente:string;
  timers: Timer [];
  selectedTimer: Timer;
  flagTransmitir: boolean = false;
  disableInput: boolean = true;

  constructor(public popoutService: PopoutService, private utilService: UtilService) {
    this.timers = [
      {label: "00:30", minutes: 0, seconds:30},
      {label: "01:00", minutes: 1, seconds:0},
      {label: "02:00", minutes: 2, seconds:0},
      {label: "03:00", minutes: 3, seconds:0},
      {label: "05:00", minutes: 5, seconds:0},
      {label: "10:00", minutes: 10, seconds:0},
      {label: "15:00", minutes: 15, seconds:0}
    ];
   }

  ngOnInit(): void {
    
    this.expediente = "Grande Expediente";
    this.utilService.getUtilShowTimer().setTimeDescription(this.expediente);
  }

  openModalWithTime(timer: number){
    
    this.timer = (timer == 1) ? this.CONST_MIN_TIMER: (this.selectedTimer.minutes * 60 + this.selectedTimer.seconds);
    this.utilService.getUtilShowTimer().setTime(this.timer);
    this.utilService.changeTransmitirData(true);
    this.openCustomerPopout('');
  }

  openModalAParte(){
    
    //this.utilService.setTimeToSpeak(this.timer);
    this.openCustomerPopout('');
  }

  updateFlagTransmitir(flag: boolean){
    this.flagTransmitir = flag;
  }

  chooseExpediente(flag: boolean){
    
    this.disableInput = flag;
    this.utilService.getUtilShowTimer().setTimeDescription(this.expediente);
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: Event) {
    this.popoutService.closePopoutModal();
  }

  openCustomerPopout(name: string) {

    let data: { name: ''} = {name:''};
    const customerPopoutDetails = POPOUT_MODALS[PopoutModalName.customerDetail];

    if (!this.popoutService.isPopoutWindowOpen()) {
      this.popoutService.openPopoutModal();
    } else {
      const sameCustomer = POPOUT_MODALS['componentInstance'].name === name;
      // When popout modal is open and there is no change in data, focus on popout modal
      if (sameCustomer) {
        this.popoutService.focusPopoutWindow();
      } else {
        POPOUT_MODALS['outlet'].detach();
        
        const injector = this.popoutService.createInjector(data);
        const componentInstance = this.popoutService.attachCustomerContainer(POPOUT_MODALS['outlet'], injector);
        POPOUT_MODALS['componentInstance'] = componentInstance;
        this.popoutService.focusPopoutWindow();
      }
    }
  }

}
