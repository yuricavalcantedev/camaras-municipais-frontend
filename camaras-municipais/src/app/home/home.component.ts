import { Component, HostListener, OnInit } from '@angular/core';
import { Parlamentar } from '../domain/parlamentar.model';
import { PopoutService } from '../service/popout.service';
import { PopoutModalName, POPOUT_MODALS } from '../service/popout.tokens';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  parlamentar: Parlamentar = new Parlamentar();
  timer: number;
  constructor(public popoutService: PopoutService) { }

  ngOnInit(): void {
  }

  updateParlamentar(parlamentar: Parlamentar){
    this.parlamentar = parlamentar;
  }

  updateTimer(timer: number){
    this.timer = timer;
    this.openCustomerPopout('meu nome');
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: Event) {
    this.popoutService.closePopoutModal();
  }

  openCustomerPopout(name: string) {
    const modalData = {
      modalName: PopoutModalName.customerDetail,
      name: name,
      parlamentar: this.parlamentar,
      timer: this.timer
    };

    const customerPopoutDetails = POPOUT_MODALS[PopoutModalName.customerDetail];

    if (!this.popoutService.isPopoutWindowOpen()) {
      this.popoutService.openPopoutModal(modalData);
    } else {
      const sameCustomer = POPOUT_MODALS['componentInstance'].name === name;
      // When popout modal is open and there is no change in data, focus on popout modal
      if (sameCustomer) {
        this.popoutService.focusPopoutWindow();
      } else {
        POPOUT_MODALS['outlet'].detach();
        const injector = this.popoutService.createInjector(modalData);
        const componentInstance = this.popoutService.attachCustomerContainer(POPOUT_MODALS['outlet'], injector);
        POPOUT_MODALS['componentInstance'] = componentInstance;
        this.popoutService.focusPopoutWindow();
      }
    }
  }

}
