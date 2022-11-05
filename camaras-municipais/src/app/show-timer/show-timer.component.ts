import { Component, Inject, OnInit } from '@angular/core';
import { Parlamentar } from '../domain/parlamentar.model';
import { TimerControlDTO } from '../domain/timer-control-dto.model';
import { POPOUT_MODAL_DATA, PopoutData } from '../service/popout.tokens';

@Component({
  selector: 'app-show-timer',
  templateUrl: './show-timer.component.html',
  styleUrls: ['./show-timer.component.css']
})
export class ShowTimerComponent implements OnInit {

  name:string = "";
  parlamentar: Parlamentar = new Parlamentar();
  timer: number = 0;

  public timerControlDTO : TimerControlDTO = new TimerControlDTO();
  constructor(@Inject(POPOUT_MODAL_DATA) public data: PopoutData) {
    this.parlamentar = data.parlamentar
  }

  ngOnInit(): void {

  }

}
